import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma-service/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class ValidationUserService {
  constructor(private readonly prisma: PrismaService) {}

  async emailAlreadyExist(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
        deletedAt: null,
      },
    });

    if (user) {
      throw new ConflictException('the email is already being used');
    }

    return;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
        deletedAt: null,
      },
    });

    return user || null;
  }
}
