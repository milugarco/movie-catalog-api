import { Category } from '@prisma/client';
import { z } from 'nestjs-zod/z';

export const MovieUpdateSchema = z.object({
  title: z.string().trim().min(3).max(75).optional().describe('Movie title'),
  plot: z.string().trim().optional().describe('Movie plot'),
  director: z.string().trim().optional().describe('Movie director'),
  debut: z.string().trim().optional().describe('Movie year'),
  ageRating: z.number().min(0).max(18).optional().describe('Movie year rating'),
  duration: z.number().min(1).optional().describe('Movie duration in minutes'),

  categories: z
    .array(z.nativeEnum(Category))
    .optional()
    .describe('Movie categories'),
});
