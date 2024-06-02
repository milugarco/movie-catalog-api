import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma-service/prisma.service';

@Injectable()
export class MovieService {
  constructor(private readonly prisma: PrismaService) {}

  async createMovie() {}
}
