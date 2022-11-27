import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type FileDocument = File & Document

@Schema()
export class File {
    @Prop()
    name: string
    @Prop()
    pid: string
    @Prop()
    nodeType: number
    @Prop()
    sortIndex: number
    @Prop()
    relationshipRequestId: string
    @Prop()
    workspaceId: string
    @Prop()
    creator: string
    @Prop({
        default:()=>new Date()
    })
    createdAt: Date
}

export const FileSchema = SchemaFactory.createForClass(File)