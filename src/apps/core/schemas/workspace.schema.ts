import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type WorkspaceDocument = Workspace & Document

class WorkspaceMember {
    role:string
    memberId:string
}

class WorkspaceEnvironment {
    name: string
    variables: {
        key: string
        value: string
    }[]
}

@Schema()
export class Workspace {
    @Prop()
    name: string
    @Prop()
    creator: string
    @Prop()
    members: WorkspaceMember[]
    @Prop()
    environments: WorkspaceEnvironment[]
    @Prop({
        default:()=>new Date()
    })
    createdAt: Date
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace)