import {Inject, Injectable, UnauthorizedException} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import {Model} from "mongoose";
import {UserDocument} from "./schemas/user.schema";
import axios from "axios";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('MONGODB_CONNECTION_UserRepository')
    private userModel: Model<UserDocument>,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    console.log(
      'AuthService.validateUser 第二步：拿到数据去user服务里校验信息',
      username,
      password,
    )
    const user = await this.userModel.findOne({ username, password })
    if (user) {
      return user
    } else {
      return null
    }
  }

  async login(user: any) {
    console.log(user,'user')
    const payload = {
      username: user.username,
      id: user.id,
      roles: user.role,
    }
    console.log('AuthService.login 第三步：存储信息', payload)
    return {
      token: this.jwtService.sign(payload),
    }
  }

  async oauthToken(params) {
    // 1.拿前端传来的code兑换access_token，refresh_token

    const redirect_uri = global.conf.gitlab.application.redirectUri
    const ClientId = global.conf.gitlab.application.clientId
    const clientSecret = global.conf.gitlab.application.clientSecret

    const { refresh_token: thRefreshToken, access_token: thAccessToken } =
        await axios
            .post(
                `${global.conf.gitlab.application.uri}/oauth/token?client_id=${ClientId}&client_secret=${clientSecret}&code=${params.code}&grant_type=authorization_code&redirect_uri=${redirect_uri}`,
            )
            .then((res) => {
              console.log(res.data)
              return res.data
            })
            .catch((err) => {
              // 如果没兑换到就抛异常
              throw new UnauthorizedException()
            })

    // 2.如果成功拿到token，先去gitlab那边校验一下，拿到用户信息
    let {
      username,
      name: nickname,
      avatar_url: avatar,
      email,
      id: thId,
    } = await axios
        .get(`${global.conf.gitlab.application.uri}/api/v4/user`, {
          headers: {
            Authorization: `Bearer ${thAccessToken}`,
          },
        })
        .then((resxx) => {
          return resxx.data
        })
    // 3.通过gitlab userId到db中查找
    const u = await this.userModel.findOne({ thId })
    avatar = avatar || 'https://joeschmoe.io/api/v1/random'
    if (u) {
      await this.userModel.updateOne(
          { _id: u.id },
          {
            thRefreshToken,
            thAccessToken,
            username,
            nickname,
            avatar,
            email,
            password: '123456',
          },
      )
    } else {
      await this.userModel.create({
        thRefreshToken,
        thAccessToken,
        username,
        nickname,
        avatar,
        email,
        thId,
        password: '123456',
      })
    }
    // 3.登陆逻辑
    const zaicha = await this.userModel.findOne({ thId })
    return this.login({
      username: zaicha.username,
      id: zaicha._id,
      role: zaicha.role,
    })
  }
  async passwordLogin(params){
    // 3.登陆逻辑
    const zaicha = await this.userModel.findOne({ username: params.username,password:params.password })
    console.log(zaicha,'zaicha')
    return this.login({
      username: zaicha.username,
      id: String(zaicha._id),
      role: zaicha.role,
    })
  }
  async getUserinfo({ userId }) {
    return this.userModel.findOne({ id: userId })
  }
}
