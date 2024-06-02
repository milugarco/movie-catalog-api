import { createZodDto } from 'nestjs-zod';
import {
  MovieResponseSchema,
  MoviesResponseSchema,
} from '../schema/movie-response.schema';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationResponse } from 'src/services/pagination-service/dto/pagination.dto';

export class MovieResponseDto extends createZodDto(MovieResponseSchema) {}

export class MoviesResponseDto extends createZodDto(MoviesResponseSchema) {}

export class MoviesResponse {
  @ApiProperty({
    type: () => MoviesResponseDto,
  })
  data: MoviesResponseDto;

  @ApiProperty({
    type: () => PaginationResponse,
  })
  pageInfo: PaginationResponse;
}
