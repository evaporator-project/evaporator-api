// 1. 获取目录tree
// 2. 根据fileId获取eg或request的详情
// 3
// Get directory tree

import { Inject, Injectable } from "@nestjs/common";
import {Model} from "mongoose";
import {RequestDocument} from "../schemas/request.schema";


export class RetrieveRequestService {
    constructor(
        @Inject('MONGODB_CONNECTION_RequestRepository')
        private requestModel: Model<RequestDocument>,
    ) {
    }
    invoke(params){
        return this.requestModel.findOne({_id:params.id})
    }
}
