import { Router } from 'express';
import { getBooksController } from '../controllers/books.controller';

const router = Router();

// Define the route for getting books
router.get('/', getBooksController);

export default router;