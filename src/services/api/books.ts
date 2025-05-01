import { BaseService } from './base';
import type {
  BookListResponse,
  BookDetailResponse,
  SearchBooksRequest,
  GetBooksByCategoryRequest,
} from './types/books';

class BooksService extends BaseService {
  async getBooks(page = 1, limit = 10): Promise<BookListResponse> {
    return this.get<BookListResponse>('books', { page, limit });
  }

  async getBookById(id: string): Promise<BookDetailResponse> {
    return this.get<BookDetailResponse>(`books/${id}`);
  }

  async searchBooks(params: SearchBooksRequest): Promise<BookListResponse> {
    return this.get<BookListResponse>('books/search', params);
  }

  async getBooksByCategory(params: GetBooksByCategoryRequest): Promise<BookListResponse> {
    return this.get<BookListResponse>('books/category', params);
  }

  async getFeaturedBooks(): Promise<BookListResponse> {
    return this.get<BookListResponse>('books/featured');
  }

  async getNewReleases(): Promise<BookListResponse> {
    return this.get<BookListResponse>('books/new-releases');
  }
}

export const booksService = new BooksService(); 