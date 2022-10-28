import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type RequestDocument = Request & Document

export const knownContentTypes = {
    "application/json": "json",
    "application/ld+json": "json",
    "application/hal+json": "json",
    "application/vnd.api+json": "json",
    "application/xml": "xml",
    "application/x-www-form-urlencoded": "multipart",
    "multipart/form-data": "multipart",
    "text/html": "html",
    "text/plain": "plain",
}

export type FormDataKeyValue = {
    key: string;
    active: boolean;
} & ({ isFile: true; value: Blob[] } | { isFile: false; value: string });

export type ValidContentTypes = keyof typeof knownContentTypes
export type HoppRESTReqBodyFormData = {
    contentType: 'multipart/form-data';
    body: FormDataKeyValue[];
};

export type HoppRESTReqBody =
    | {
    contentType: Exclude<ValidContentTypes, 'multipart/form-data'>;
    body: string;
}
    | HoppRESTReqBodyFormData
    | {
    contentType: null;
    body: null;
};

@Schema()
export class Request {
    @Prop()
    endpoint: string
    @Prop()
    method: string
    @Prop()
    testScript: string
    @Prop()
    params: {
        key: string;
        value: string;
        active: boolean;
    }[]
    @Prop()
    headers: {
        key: string;
        value: string;
        active: boolean;
    }[]
    @Prop({
        type:{
            body:String,
            contentType:String
        }
    })
    body: {
        body:string
        contentType:string
    }
    @Prop({
        default:()=>new Date()
    })
    createdAt: Date
}

export const RequestSchema = SchemaFactory.createForClass(Request)