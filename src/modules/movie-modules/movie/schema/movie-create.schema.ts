import { Category } from '@prisma/client';
import { z } from 'nestjs-zod/z';

export const MovieCreateSchema = z.object({
  title: z.string().trim().min(3).max(75).describe('Movie title'),
  plot: z.string().trim().describe('Movie plot'),
  director: z.string().trim().describe('Movie director'),
  debut: z.string().trim().describe('Movie year'),
  ageRating: z.number().min(0).max(18).describe('Movie year rating'),
  duration: z.number().min(1).describe('Movie duration in minutes'),

  categories: z
    .array(z.nativeEnum(Category))
    .min(1)
    .describe('Movie categories'),
});
