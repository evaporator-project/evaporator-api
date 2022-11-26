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
import { UserService } from './user.service'

@Controller()
export class AuthController {
  constructor(
      private readonly authService: AuthService,
      private readonly userService: UserService
  ) {}


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

  @UseGuards(JwtAuthGuard)
  @Post('/usersettings')
  async userSettings(@Body() reqBody,@Request() req: { user: { id: number } }) {
    return this.userService.userSettings(req.user.id, reqBody)
  }
}
