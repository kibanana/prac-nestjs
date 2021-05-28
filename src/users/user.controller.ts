import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Redirect,
} from '@nestjs/common';
import { User } from './domain/User';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {
    // 의존성(Dependency) 주입
    this.userService = userService;
  }

  @Get()
  // eslint-disable-next-line @typescript-eslint/ban-types
  async findAll(): Promise<object> {
    const list = await this.userService.findAll();
    return {
      message: 'success',
      data: list,
    };
  }

  @Get(':id')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async findOne(@Param('id') id: string): Promise<object> {
    const item = await this.userService.findOne(id);
    return item
      ? {
          message: 'success',
          data: item,
        }
      : {
          message: 'fail',
        };
  }

  @Post()
  @HttpCode(201)
  @Header('Cache-Control', 'none')
  @Redirect('<https://www.naver.com>', 301)
  // eslint-disable-next-line @typescript-eslint/ban-types
  async save(@Body() user: User): Promise<object> {
    await this.userService.save(user);
    return {
      message: 'success',
      data: user,
    };
  }

  @Delete(':id')
  // eslint-disable-next-line @typescript-eslint/ban-types
  async delete(@Param('id') id: string): Promise<object> {
    await this.userService.delete(id);
    return {
      message: 'success',
      data: { userId: id },
    };
  }
}
