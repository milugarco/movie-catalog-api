import { Category } from '@prisma/client';
import { z } from 'nestjs-zod/z';

export const MovieResponseSchema = z.object({
  title: z.string().default('Star Wars: Episode I').describe('Movie title'),
  plot: z
    .string()
    .default(
      `When the Trade Federation organize a blockade around the planet Naboo, the Supreme Chancellor Valorum sends the Jedi Qui-Gon Jinn and Obi-Wan Kenobi to negotiate the end of the blockade. However the evil Viceroy Nute Gunray is ordered to kill the Jedi and invade Naboo. However the Jedi escape and Qui-Gon saves the life of the clumsy Gungan Jar Jar Binks. The outcast native takes the Jedi to his submerged city and the Gungan leader gives transportation to them. The Jedi head to the capital to warn Queen Amidala about the invasion. However she has been captured by the Federation droids but the Jedi rescue the queen and her court and they flee in a spacecraft that is damaged when they cross the blockade. They land on a desert planet and Qui-Gon Jinn goes to the town with Jar Jar, the droid R2-D2 and the queen's assistant Padmé to seek the necessary part for the spacecraft. When they find the component, they do not have money to buy it. But the slave boy Anakin Skywalker offers to dispute a race with his pod to raise the necessary money. Qui-Gon feels the Force in the boy and accepts his offer. Will the boy win the race? What will happen to Naboo? Will Queen Amidala be capable to convince the politicians to release her planet from the Trade Federation?`,
    )
    .describe('Movie plot'),
  director: z.string().default('George Lucas').describe('Movie director'),
  debut: z.string().default('1999/06/24').describe('Movie year'),
  ageRating: z.number().default(0).describe('Movie year rating'),
  duration: z.number().default(136).describe('Movie duration in minutes'),

  categories: z.array(z.nativeEnum(Category)).describe('Movie categories'),
});

export const MoviesResponseSchema = z.array(
  z.object({
    title: z.string().describe('Movie title'),
    director: z.string().describe('Movie director'),
    debut: z.string().describe('Movie year'),
    ageRating: z.number().describe('Movie year rating'),
  }),
);
