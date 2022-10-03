import {Body, Controller, Get, Post, Query, Req, Request} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/vi/health')
  getHello(@Req() request: Request): string {
    // @ts-ignore
    console.log(request.cookies,new Date())
    return this.appService.getHello();
  }

  @Get('/test')
  test(@Query() q): any {
    console.log(q,'q')
    return q
  }

  @Post('/test')
  testtest(@Req() request: Request,@Body() body): any {
    return body
  }
}
