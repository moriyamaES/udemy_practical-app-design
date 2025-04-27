import { LoanRepositoryInterface } from '../../../domain/repositories/loanRepositoryInterface';
import { Loan } from '../../../domain/entities/loan';
import { LoanBookRequestDto } from '../../dtos/loan/loanBookRequestDto';
import { LoanBookResponseDto } from '../../dtos/loan/loanBookResponseDto';
import { LoanBookUseCaseInterface } from './loanBookUseCaseInterface';
import { BookRepositoryInterface } from '../../../domain/repositories/bookRepositoryInterface';
import { IdGeneratorInterface } from '../../../domain/utils/idGeneratorInterface';

export class LoanBookUseCase implements LoanBookUseCaseInterface {
  constructor(
    private readonly loanRepository: LoanRepositoryInterface,
    private readonly bookRepository: BookRepositoryInterface,
    private readonly idGenerator: IdGeneratorInterface
  ) {}

  async execute(requestDto: LoanBookRequestDto): Promise<LoanBookResponseDto> {
    const book = await this.bookRepository.findById(requestDto.bookId)
    if (!book)
      throw new Error('書籍が存在しません')
    book.Loan()

    const loans = await this.loanRepository.findByUserId(requestDto.userId)
    if (loans.filter(loan => loan.returnDate === null).length >= 5)
      throw new Error('既に上限まで貸し出されています')
  
    await this.bookRepository.update(book)

    const newLoan = new Loan(
      this.idGenerator.generate(),
      requestDto.bookId,
      requestDto.userId
    );
    const createdLoan = await this.loanRepository.create(newLoan);

    return {
      id: createdLoan.id,
      bookId: createdLoan.bookId,
      userId: createdLoan.userId,
      loanDate: createdLoan.loanDate,
      returnDate: createdLoan.returnDate,
      createdAt: createdLoan.loanDate,
      updatedAt: createdLoan.loanDate,
    };    
  }
}
