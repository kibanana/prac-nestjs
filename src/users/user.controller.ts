import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Redirect,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {
    // 의존성(Dependency) 주입
    this.userService = userService;
  }

  @Get()
  findAll(): Promise<any[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  // eslint-disable-next-line @typescript-eslint/ban-types
  findOne(@Param('id') id: string): UserDto | object {
    const repsonse = this.userService.findOne(id) || { message: 'fail' };
    return repsonse;
  }

  @Post()
  @HttpCode(201)
  @Header('Cache-Control', 'none')
  @Redirect('<https://www.naver.com>', 301)
  save(@Body() user: UserDto): string {
    this.userService.save(user);
    return Object.assign({
      statusCode: 201,
      data: user,
      message: 'Created successfully',
    });
  }
}
