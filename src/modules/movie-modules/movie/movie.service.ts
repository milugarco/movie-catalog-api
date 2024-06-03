import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/services/prisma-service/prisma.service';
import { MovieResponseDto, MoviesResponse } from './dto/movie-response.dto';
import { MovieCreateDto } from './dto/movie-create.dto';
import { generateSlug } from 'src/utils/generate-slug';
import { dateValidator } from 'src/utils/date-validator';

@Injectable()
export class MovieService {
  constructor(private readonly prisma: PrismaService) {}

  async createMovie(body: MovieCreateDto): Promise<MovieResponseDto> {
    try {
      const { ageRating, categories, debut, director, duration, plot, title } =
        body;

      dateValidator(debut);

      const slug = generateSlug(title);

      const movieAlreadyExists = await this.prisma.movieFully.findFirst({
        where: {
          text: {
            contains: `${slug}`,
            mode: 'insensitive',
          },
        },
      });

      if (movieAlreadyExists) {
        throw new ConflictException('Movie already exists');
      }

      const categoriesFormatted = categories.map((category) => {
        return {
          category: category,
        };
      });

      const fully = `${title},${director},${debut},${slug}`;

      const movieCreated = await this.prisma.movie.create({
        data: {
          ageRating,
          debut,
          director,
          duration,
          plot,
          title,
          slug,
          movieCategories: {
            createMany: {
              data: categoriesFormatted,
            },
          },
          movieFully: {
            create: {
              text: fully,
            },
          },
        },
      });

      return movieCreated;
    } catch (error) {
      throw error;
    }
  }

  async findOne(slug: string): Promise<MovieResponseDto> {
    try {
      const movie = await this.prisma.movie.findUnique({
        where: {
          slug,
          deletedAt: null,
        },
        include: {
          movieCategories: true,
        },
      });

      if (!movie) {
        throw new NotFoundException(`Movie not found`);
      }

      const response: MovieResponseDto = {
        id: movie.id,
        slug: movie.slug,
        title: movie.title,
        ageRating: movie.ageRating,
        categories: movie.movieCategories.map((category) => {
          return category.category;
        }),
        debut: movie.debut,
        director: movie.director,
        duration: movie.duration,
        plot: movie.plot,
      };

      return response;
    } catch (error) {
      throw error;
    }
  }

  async findAll(
    term: string,
    page: number,
    perPage: number,
  ): Promise<MoviesResponse> {
    try {
      return;
    } catch (error) {
      throw error;
    }
  }

  async delete(slug: string): Promise<string> {
    try {
      const movie = await this.findOne(slug);

      await this.prisma.movie.update({
        where: { id: movie.id },
        data: {
          deletedAt: new Date(),
        },
      });

      return `Movie ${slug} deleted`;
    } catch (error) {
      throw error;
    }
  }
}
