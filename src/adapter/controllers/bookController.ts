import { Request, Response } from "express";
import { AddBookUseCaseInterface } from "../../application/useCases/book/addBookUseCaseInterface";
import { AddBookRequestDto } from "../../application/dtos/book/addBookRequestDto";

export class BookController {
  constructor(private readonly addBookUseCase: AddBookUseCaseInterface) {}
  
  async add(req: Request, res: Response): Promise<void> {
    try {
      const requestDto: AddBookRequestDto = {
        title: req.body.title,
      }
      const title = req.body.title as string;
      const book = await this.addBookUseCase.execute(requestDto);
      res.status(201).json(book);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: '書籍の登録に失敗しました' });
    }
  }

  // async findById(req: Request, res: Response): Promise<void> {
  //   try {
  //     const id = req.params.id as string;
  //     const book = await this.bookService.findById(id);
  //     if (book) {
  //       res.status(200).json(book);
  //     } else {
  //       res.status(404).json({ error: '書籍が見つかりません' });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ error: '書籍の取得に失敗しました' });
  //   }
  // }
}