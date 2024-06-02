import { createZodDto } from 'nestjs-zod';
import { MovieUpdateSchema } from '../schema/movie-update.schema';

export class MovieUpdateDto extends createZodDto(MovieUpdateSchema) {}
