import { PrismaClient } from '@prisma/client';
import { Loan } from '../../domain/entities/loan';
import { LoanRepositoryInterface } from '../../domain/repositories/loanRepositoryInterface';
import { TransactionContextInterface } from '../../domain/utils/transactionContextInterface';

export class PrismaLoanRepository implements LoanRepositoryInterface {
  constructor(private readonly prisma: PrismaClient) {}

  async create(
    loan: Loan,
    ctx?: TransactionContextInterface
  ): Promise<Loan> {
    const prisma = ctx ? (ctx as PrismaClient) : this.prisma
    const createdLoan = await prisma.loan.create({
      data: {
        id: loan.id,  
        bookId: loan.bookId, 
        userId: loan.userId,
        loanDate: loan.loanDate,
        returnDate: loan.returnDate,
        createAt: loan.createdAt,
        updateAt: loan.updatedAt,
      },
    })

    return new Loan(
      createdLoan.id,
      createdLoan.bookId,
      createdLoan.userId,
      createdLoan.loanDate,
      createdLoan.returnDate,
      createdLoan.createAt,
      createdLoan.updateAt,
    )
  }
  
  async findById(
    id: string,
    ctx?: TransactionContextInterface
  ): Promise<Loan | null> {
    const prisma = ctx ? (ctx as PrismaClient) : this.prisma;
    const foundLoan = await prisma.loan.findUnique({
      where: { id },
    })
    if (!foundLoan) return null
    return new Loan(
      foundLoan.id,
      foundLoan.bookId,
      foundLoan.userId,
      foundLoan.loanDate,
      foundLoan.returnDate,
      foundLoan.createAt,
      foundLoan.updateAt,
    )
  }

  async findByUserId(
    userId: string,
    ctx?: TransactionContextInterface
  ): Promise<Loan[]> {
    const prisma = ctx ? (ctx as PrismaClient) : this.prisma;
    const foundLoans = await prisma.loan.findMany({
      where: { userId },
    })
    return foundLoans.map(
      (foundLoan) =>
        new Loan(
          foundLoan.id,
          foundLoan.bookId,
          foundLoan.userId,
          foundLoan.loanDate,
          foundLoan.returnDate,
          foundLoan.createAt,
          foundLoan.updateAt,
        ),
    )
  }

  async update(
    loan: Loan,
    ctx?: TransactionContextInterface
  ): Promise<Loan> {
    const prisma = ctx ? (ctx as PrismaClient) : this.prisma;
    const updatedLoan = await prisma.loan.update({
      where: { id: loan.id },
      data: { returnDate: loan.returnDate },
    })
    return new Loan(
      updatedLoan.id,
      updatedLoan.bookId,
      updatedLoan.userId,
      updatedLoan.loanDate,
      updatedLoan.returnDate,
      updatedLoan.createAt,
      updatedLoan.updateAt,
    )
  }
}

  
