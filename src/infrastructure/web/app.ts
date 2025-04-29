import express from 'express';
import { BookController } from '../../adapter/controllers/bookController';
import { PrismaClient } from '@prisma/client';
import { PrismaBookRepository } from '../../adapter/repositories/prismaBookRepository';
import { UuidGenerator } from '../../adapter/utils/uuidGenerator';
import { AddBookUseCase } from '../../application/useCases/book/addBookUseCase';
import { bookRoutes } from './routers/bookRouter';
import { FindBookByIdUseCase } from '../../application/useCases/book/findBookByIdUseCase';
import { PrismaUserRepository } from '../../adapter/repositories/prismaUserRepository';
import { CreateUserUseCase } from '../../application/useCases/user/createUserUseCase';
import { UserController } from '../../adapter/controllers/userController';
import { userRoutes } from './routers/userRouter';
import { loanRoutes } from './routers/loanRouter';
import { LoanController } from '../../adapter/controllers/loanController';
import { PrismaLoanRepository } from '../../adapter/repositories/prismaLoanRepository';
import { LoanBookUseCase } from '../../application/useCases/loan/loanBookUseCase';
import { PrismaTransactionManager } from '../../adapter/utils/prismaTransactionManager';


const app = express();
app.use(express.json());

const prisma = new PrismaClient()
const uuidGenerator = new UuidGenerator()
const transactionManager = new PrismaTransactionManager(prisma)

const bookRepository = new PrismaBookRepository(prisma)
const addBookUseCase = new AddBookUseCase(bookRepository, uuidGenerator)
const findBookByIdUseCase = new FindBookByIdUseCase(bookRepository)
const bookController = new BookController(addBookUseCase, findBookByIdUseCase)

const userRepository = new PrismaUserRepository(prisma)
const createUserUseCase = new CreateUserUseCase(userRepository, uuidGenerator)
const userController = new UserController(createUserUseCase)

const loanRepository = new PrismaLoanRepository(prisma)
const loanBookUseCase = new LoanBookUseCase(
  loanRepository,
  bookRepository,
  uuidGenerator,
  transactionManager,
)
const loanController = new LoanController(loanBookUseCase)

app.use('/books', bookRoutes(bookController))
app.use('/users', userRoutes(userController))
app.use('/loans', loanRoutes(loanController))
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

