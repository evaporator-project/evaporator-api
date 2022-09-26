import { Controller, Get, Req,Request } from '@nestjs/common';
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
}
