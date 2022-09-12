import { Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import {Model} from "mongoose";
import {UserDocument} from "./schemas/user.schema";

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
    // 3.登陆逻辑
    const zaicha = await this.userModel.findOne({ username: 'zt' })
    console.log(zaicha,'zaicha')
    return this.login({
      username: zaicha.username,
      id: String(zaicha._id),
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
}
