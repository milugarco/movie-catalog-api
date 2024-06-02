import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('v1/auth/login')
  @ApiOperation({
    summary: 'Login',
  })
  @ApiResponse({
    description: 'the auth has been successfully',
    type: String,
  })
  @ApiQuery({
    name: 'userEmail',
    required: true,
    type: String,
  })
  @ApiQuery({
    name: 'userPassword',
    required: true,
    type: String,
  })
  async login(
    @Query('userEmail') userEmail: string,
    @Query('userPassword') userPassword: string,
  ): Promise<string> {
    return await this.authService.login(userEmail, userPassword);
  }
}
