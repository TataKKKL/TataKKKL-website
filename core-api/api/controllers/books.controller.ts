import { Request, Response } from 'express';
import { fetchBooks } from '../services/books.service';

// Controller function to handle GET request for books
export const getBooksController = async (req: Request, res: Response) => {
  try {
    const books = await fetchBooks();
    return res.status(200).json(books);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};