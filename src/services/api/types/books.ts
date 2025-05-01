export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  description: string;
  isbn: string;
  publisher: string;
  publishedDate: string;
  pageCount: number;
  language: string;
  categories: string[];
}

export interface BookListResponse {
  books: Book[];
  total: number;
  page: number;
  limit: number;
}

export interface BookDetailResponse {
  book: Book;
}

export interface SearchBooksRequest extends Record<string, string | number | boolean> {
  query: string;
  page: number;
  limit: number;
}

export interface GetBooksByCategoryRequest extends Record<string, string | number | boolean> {
  category: string;
  page: number;
  limit: number;
} 