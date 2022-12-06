import {Inject, Injectable, UnauthorizedException} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import {Model} from "mongoose";
import {UserDocument} from "./schemas/user.schema";
import axios from "axios";

@Injectable()
export class UserService {
    constructor(
        @Inject('MONGODB_CONNECTION_UserRepository')
        private userModel: Model<UserDocument>,
    ) {}
    async userSettings(currentUser, reqBody):Promise<any> {
        return this.userModel.updateOne({ _id: currentUser },reqBody)
    }
}
