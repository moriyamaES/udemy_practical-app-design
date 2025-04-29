import { PrismaClient } from '@prisma/client';
import { Loan } from '../../domain/entities/loan';
import { LoanRepositoryInterface } from '../../domain/repositories/loanRepositoryInterface';

export class PrismaLoanRepository implements LoanRepositoryInterface {
  constructor(private readonly prisma: PrismaClient) {}

  async create(loan: Loan): Promise<Loan> {
    const createdLoan = await this.prisma.loan.create({
      data: {
        id: loan.id,
        bookId: loan.bookId, 
        userId: loan.userId,
        loanDate: loan.loanDate,
        returnDate: loan.returnDate,
        createAt: loan.createdAt,
        updateAt: loan.updatedAt,
      },
    });

    return new Loan(
      createdLoan.id,
      createdLoan.bookId,
      createdLoan.userId,
      createdLoan.loanDate,
      createdLoan.returnDate,
      createdLoan.createAt,
      createdLoan.updateAt,
    );
  }
  
  async findById(id: string): Promise<Loan | null> {
    const foundLoan = await this.prisma.loan.findUnique({
      where: { id },
    });

    if (!foundLoan) return null;

    return new Loan(
      foundLoan.id,
      foundLoan.bookId,
      foundLoan.userId,
      foundLoan.loanDate,
      foundLoan.returnDate,
      foundLoan.createAt,
      foundLoan.updateAt,
    );
  }

  async findByUserId(userId: string): Promise<Loan[]> {
    const foundLoans = await this.prisma.loan.findMany({
      where: { userId },
    });

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
    );
  }

}
