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
  }
}

export class BaseService {
  protected async handleRequest<T>(request: Promise<T>): Promise<T> {
    try {
      return await request;
    } catch (error) {
      if (error instanceof Error) {
        const httpError = error as HTTPError;
        const status = httpError.response?.status || 500;
        let type = ErrorType.UNKNOWN;
        let message = 'Beklenmeyen bir hata oluştu';

        // Hata tipini belirle
        if (status === 401 || status === 403) {
          type = ErrorType.AUTHENTICATION;
          message = 'Oturum süreniz doldu, lütfen tekrar giriş yapın';
        } else if (status === 422) {
          type = ErrorType.VALIDATION;
          message = 'Girdiğiniz bilgiler hatalı';
        } else if (status >= 500) {
          type = ErrorType.SERVER;
          message = 'Sunucu hatası oluştu, lütfen daha sonra tekrar deneyin';
        } else if (httpError.message.includes('Network request failed')) {
          type = ErrorType.NETWORK;
          message = 'İnternet bağlantınızı kontrol edin';
        }

        // Hata verisini al
        let errorData: unknown;
        try {
          if (httpError.response) {
            errorData = await httpError.response.json();
          }
        } catch (e) {
          console.warn('Failed to parse error response:', e);
        }

        throw new ApiError(status, message, type, errorData);
      }

      // Bilinmeyen hata
      throw new ApiError(500, 'Beklenmeyen bir hata oluştu');
    }
  }

  protected get<T>(url: string, params?: Record<string, string | number | boolean>): Promise<T> {
    return this.handleRequest(
      instance.get(url, { searchParams: params }).json()
    );
  }

  protected post<T>(url: string, data?: unknown): Promise<T> {
    return this.handleRequest(
      instance.post(url, { json: data }).json()
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