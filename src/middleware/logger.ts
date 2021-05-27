import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void): any {
    console.log('클라이언트 요청~');
    console.log(req);
    next();
  }
}
