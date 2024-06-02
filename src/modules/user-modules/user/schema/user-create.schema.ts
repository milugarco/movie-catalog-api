import { z } from 'nestjs-zod/z';

export const UserCreateSchema = z.object({
  name: z.string().trim().min(3).max(50).describe('user name'),
  email: z.string().toLowerCase().trim().email().describe('user email'),
  password: z.string().trim().min(8).max(50).describe('user password'),
  passwordConfirmation: z
    .string()
    .trim()
    .min(8)
    .max(50)
    .describe('user password confirmation'),
});
