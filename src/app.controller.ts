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

  @Get('/base')
  getBaseInfo(): any {
    const {
      clientId: thAppClientId,
      redirectUri: thAppRedirectUri,
      uri: thAppUri,
    } = global.conf.gitlab.application
    return {
      thAppType: 'gitlab',
      thAppClientId,
      thAppRedirectUri,
      thAppUri,
      version:global.version
    }
  }
}
