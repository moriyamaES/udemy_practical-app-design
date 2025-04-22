import { AddBookUseCaseInterface } from "./addBookUseCaseInterface";
import { BookRepositoryInterface } from "../../../domain/repositories/bookRepositoryInterface";
import { privateDecrypt } from "crypto";
import { IdGeneratorInterface } from "../../../domain/utils/idGeneratorInterface";

export class AddBookUseCase implements AddBookUseCaseInterface {
  constructor(
    private readonly bookRepository: BookRepositoryInterface,
    private readonly idGenerator: IdGeneratorInterface
  ) {}
}