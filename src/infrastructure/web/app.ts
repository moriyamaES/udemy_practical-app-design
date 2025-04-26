import express from 'express';
import { BookController } from '../../adapter/controllers/bookController';
import { PrismaClient } from '@prisma/client';
import { PrismaBookRepository } from '../../adapter/repositories/prismaBookRepository';
import { UuidGenerator } from '../../adapter/utils/uuidGenerator';
import { AddBookUseCase } from '../../application/useCases/book/addBookUseCase';
import { bookRoutes } from './routers/bookRouters';

const app = express();
app.use(express.json());

const prisma = new PrismaClient()
const uuidGenerator = new UuidGenerator()

const bookRepository = new PrismaBookRepository(prisma)
const addBookUseCase = new AddBookUseCase(bookRepository, uuidGenerator)
const bookController = new BookController(addBookUseCase)

app.use('/books', bookRoutes(bookController))

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

