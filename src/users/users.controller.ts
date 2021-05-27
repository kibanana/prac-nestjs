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

@Controller('users')
export class UserController {
  @Get()
  findAll(): Promise<any[]> {
    return new Promise((resolve) => {
      return setTimeout(
        () => resolve([{ userName: '김예원1' }, { userName: '김예원2' }]),
        100,
      );
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return Object.assign({ id, userName: '김예원' });
  }

  @Post()
  @HttpCode(201)
  @Header('Cache-Control', 'none')
  @Redirect('<https://www.naver.com>', 301)
  save(@Body() payload): string {
    return Object.assign({
      statusCode: 201,
      data: payload,
      message: 'Created successfully',
    });
  }
}
