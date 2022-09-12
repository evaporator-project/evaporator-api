import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type RequestDocument = Request & Document

@Schema()
export class Request {
    @Prop()
    endpoint: string
    @Prop()
    method: string
    @Prop()
    body: string
    @Prop({
        default:()=>new Date()
    })
    createdAt: Date
}

export const RequestSchema = SchemaFactory.createForClass(Request)