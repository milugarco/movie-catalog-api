import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { PrismaClient } from '@prisma/client';
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod';
import { UserModule } from './modules/user-modules/user/user.module';
import { AuthModule } from './modules/auth-modules/auth/auth.module';

@Module({
  imports: [AuthModule, UserModule],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor },
    { provide: APP_PIPE, useClass: ZodValidationPipe },
    PrismaClient,
  ],
})
export class AppModule {}
