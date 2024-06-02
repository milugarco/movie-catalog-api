import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user-create.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({ description: 'Created successfully' })
  @ApiBody({
    type: UserCreateDto,
  })
  async create(@Body() body: UserCreateDto): Promise<string> {
    return await this.userService.create(body);
  }
}
