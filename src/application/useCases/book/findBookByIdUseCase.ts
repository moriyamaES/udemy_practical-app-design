import { isNull } from "util";
import { BookRepositoryInterface } from "../../../domain/repositories/bookRepositoryInterface";
import { FindBookByIdRequestDto } from "../../dtos/book/findBookByIdRequestDto";
import { FindByIdResponseDto } from "../../dtos/book/findBookByIdResponseDto";
import { FindBookByIdUseCaseInterface } from "./findBookByIdUseCaseInterface";
import { title } from "process";

export class FindBookByIdUseCase implements FindBookByIdUseCaseInterface {
  constructor(private readonly bookRepository: BookRepositoryInterface) {}

  async execute(requestDto: FindBookByIdRequestDto): Promise<FindByIdResponseDto | null> {
    const foundBook = await this.bookRepository.findById(requestDto.id)
    if (!foundBook){
      return null
    }
    return {
      id: foundBook.id,
      title: foundBook.title,
      isAvailable: foundBook.isAvailable,
      createAt: foundBook.createdAt,
      updateAt: foundBook.updatedAt,
    }
  }
}
