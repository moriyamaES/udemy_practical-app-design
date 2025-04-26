import { FindBookByIdRequestDto } from '../../dtos/book/findBookByIdRequestDto';
import { FindByIdResponseDto } from '../../dtos/book/findBookByIdResponseDto';

export interface FindBookByIdUseCaseInterface {
  execute(requestDto: FindBookByIdRequestDto): Promise<FindByIdResponseDto | null>;
}
