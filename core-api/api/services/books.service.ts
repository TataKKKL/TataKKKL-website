import { getBooks } from '../db/books';
import { Book } from '../models/book';

// Service function to fetch books
export const fetchBooks = async (): Promise<Book[]> => {
  return await getBooks();
};