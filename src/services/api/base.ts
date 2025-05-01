import { instance } from '../instance';
import type { HTTPError } from 'ky';

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
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
        throw new ApiError(
          httpError.response?.status || 500,
          httpError.message,
          await httpError.response?.json()
        );
      }
      throw error;
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