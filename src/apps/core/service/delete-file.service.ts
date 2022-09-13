import {Inject} from "@nestjs/common";
import {Model} from "mongoose";
import {FileDocument} from "../schemas/file.schema";
import {RequestDocument} from "../schemas/request.schema";

export class DeleteFileService {
    constructor(
        @Inject('MONGODB_CONNECTION_FileRepository')
        private fileModel: Model<FileDocument>,
        @Inject('MONGODB_CONNECTION_RequestRepository')
        private requestModel: Model<RequestDocument>,
    ) {}
    async invoke(reqBody){
        // return this.requestModel
        console.log(reqBody,'reqBody')
        return this.fileModel.remove({_id:reqBody.id})
    }
}