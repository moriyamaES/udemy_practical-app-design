import { AddBookRequestDto } from "../../application/dtos/book/addBookRequestDto";
import { AddBookUseCase } from "../../application/useCases/book/addBookUseCase";

export class BookCommand {
  constructor(
    private readonly addBookUseCase: AddBookUseCase
  ) {}

  async addBook(title: string) {
    try {
      const requestDto: AddBookRequestDto = { title }
      const book = await this.addBookUseCase.execute(requestDto)
      console.log('書籍を登録しました')
      console.log(book)
    } catch (error) {
      console.log(error)
      console.log('書籍の登録に失敗しました')
    }
  }
}