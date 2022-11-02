import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './guards/jwt-auth.guard'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('/oauth/token')
  async oauthToken(
    @Body() params: any,
  ) {
    return this.authService.oauthToken(params)
  }

  @Post('/passwordlogin')
  async passwordLogin(
      @Body() reqBody: any,
  ) {
    return this.authService.passwordLogin(reqBody)
  }

  // user
  @UseGuards(JwtAuthGuard)
  @Get('/user')
  async getUserinfo(@Request() request: { user: { id: number } }) {
    console.log(request.user.id)

    return this.authService.getUserinfo({ userId: request.user.id })
  }
}
