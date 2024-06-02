import { createZodDto } from 'nestjs-zod';
import { MovieCreateSchema } from '../schema/movie-create.schema';

export class MovieCreateDto extends createZodDto(MovieCreateSchema) {}
