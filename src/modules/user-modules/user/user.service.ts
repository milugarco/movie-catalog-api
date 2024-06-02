import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma-service/prisma.service';
import { UserCreateDto } from './dto/user-create.dto';
import { ValidationUserService } from 'src/services/validation-user-service/validation-user.service';
import { genSaltSync, hash } from 'bcrypt';
import { AuthService } from 'src/modules/auth-modules/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly validationUserService: ValidationUserService,
    private readonly auth: AuthService,
  ) {}

  async create(body: UserCreateDto): Promise<string> {
    try {
      const { email, name, password, passwordConfirmation } = body;

      if (password !== passwordConfirmation) {
        throw new BadRequestException('Passwords do not match');
      }

      await this.validationUserService.emailAlreadyExist(email.toLowerCase());

      const salt = genSaltSync(10);
      const hashedPassword = await hash(password, salt);

      await this.prisma.user.create({
        data: {
          email: email.toLowerCase(),
          name,
          password: hashedPassword,
        },
      });

      const jwt = await this.auth.login(email, password);

      return jwt;
    } catch (error) {
      throw error;
    }
  }
}
