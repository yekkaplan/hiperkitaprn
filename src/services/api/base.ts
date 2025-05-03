import { instance } from '../instance';
import type { HTTPError } from 'ky';

export enum ErrorType {
  NETWORK = 'NETWORK_ERROR',
  AUTHENTICATION = 'AUTHENTICATION_ERROR',
  VALIDATION = 'VALIDATION_ERROR',
  SERVER = 'SERVER_ERROR',
  UNKNOWN = 'UNKNOWN_ERROR'
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public type: ErrorType = ErrorType.UNKNOWN,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
    // Error.stack'i düzgün çalışması için
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export class BaseService {
  protected async handleRequest<T>(request: Promise<T>): Promise<T> {
    try {
      const response = await request;
      console.log('BaseService handleRequest - Success Response:', response);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        const httpError = error as HTTPError;
        const status = httpError.response?.status || 500;
        let type = ErrorType.UNKNOWN;
        let message = 'Beklenmeyen bir hata oluştu';

        // Hata verisini al
        let errorData: unknown;
        try {
          if (httpError.response) {
            const responseText = await httpError.response.text();
            console.log('BaseService handleRequest - Error Response Text:', responseText);
            if (responseText && responseText.trim() !== '') {
              try {
                errorData = JSON.parse(responseText);
                console.log('BaseService handleRequest - Parsed Error Data:', errorData);
                
                // Eğer response'da message varsa onu kullan
                if (errorData && typeof errorData === 'object' && 'message' in errorData) {
                  message = (errorData as { message: string }).message;
                }
              } catch (parseError) {
                console.log('BaseService handleRequest - Parse Error:', parseError);
                errorData = responseText;
              }
            }
          }
        } catch (e) {
          console.warn('Failed to parse error response:', e);
        }

        // Hata tipini belirle
        if (status === 401 || status === 403) {
          type = ErrorType.AUTHENTICATION;
          if (!message) message = 'Oturum süreniz doldu, lütfen tekrar giriş yapın';
        } else if (status === 422) {
          type = ErrorType.VALIDATION;
          if (!message) message = 'Girdiğiniz bilgiler hatalı';
        } else if (status >= 500) {
          type = ErrorType.SERVER;
          if (!message) message = 'Sunucu hatası oluştu, lütfen daha sonra tekrar deneyin';
        } else if (httpError.message.includes('Network request failed')) {
          type = ErrorType.NETWORK;
          if (!message) message = 'İnternet bağlantınızı kontrol edin';
        }

        // Hata verisini dön
        return Promise.reject(new ApiError(status, message, type, errorData));
      }

      // Bilinmeyen hata
      return Promise.reject(new ApiError(500, 'Beklenmeyen bir hata oluştu'));
    }
  }

  protected get<T>(url: string, params?: Record<string, string | number | boolean>): Promise<T> {
    return this.handleRequest(
      instance.get(url, { searchParams: params }).json()
    );
  }

  protected post<T>(url: string, data?: unknown): Promise<T> {
    console.log('BaseService post - URL:', url);
    console.log('BaseService post - Data:', JSON.stringify(data, null, 2));
    
    const options = {
      json: data,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    console.log('BaseService post - Options:', JSON.stringify(options, null, 2));
    
    return this.handleRequest(
      instance.post(url, options).json()
    );
  }

  protected patch<T>(url: string, data?: unknown): Promise<T> {
    return this.handleRequest(
      instance.patch(url, { json: data }).json()
    );
  }

  protected delete(url: string): Promise<void> {
    return this.handleRequest(
      instance.delete(url).then(() => undefined)
    );
  }
} 