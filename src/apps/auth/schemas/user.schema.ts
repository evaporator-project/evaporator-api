import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document

class UserSettings {
    accentColor: string
    colorMode: string
    language: string
}

@Schema()
export class User {
    @Prop()
    username: string
    @Prop()
    password: string

    @Prop()
    nickname: string
    @Prop()
    avatar: string

    @Prop()
    thRefreshToken: string
    @Prop()
    thAccessToken: string

    @Prop()
    email: string
    @Prop()
    thId: string

    @Prop()
    role: string[]
    
    @Prop()
    settings:UserSettings

    @Prop({
        default:()=>new Date()
    })
    createdAt: Date
}

export const UserSchema = SchemaFactory.createForClass(User)