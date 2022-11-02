// 1. 获取目录tree
// 2. 根据fileId获取eg或request的详情
// 3
// Get directory tree

import { Inject, Injectable } from "@nestjs/common";
import {Model} from "mongoose";
import {RequestDocument} from "../schemas/request.schema";


export class UpdateRequestService {
    constructor(
        @Inject('MONGODB_CONNECTION_RequestRepository')
        private requestModel: Model<RequestDocument>,
    ) {
    }
    async invoke(params):Promise<any>{
        const s = JSON.parse(JSON.stringify(params))
        delete s.id
        // console.log(s,params)
        return this.requestModel.updateOne({_id:params.id},s)
    }
}
