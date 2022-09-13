import {Inject} from "@nestjs/common";
import {Model} from "mongoose";
import {FileDocument} from "../schemas/file.schema";
import {RequestDocument} from "../schemas/request.schema";

export class CreateFileService {
    constructor(
        @Inject('MONGODB_CONNECTION_FileRepository')
        private coverageModel: Model<FileDocument>,
        @Inject('MONGODB_CONNECTION_RequestRepository')
        private requestModel: Model<RequestDocument>,
    ) {}
    async invoke(currentUser,reqBody){
        console.log(currentUser,'currentUser')
        //判断类型1 2 3

        const { nodeType,name,pid } = reqBody;
        let a: any = {};
        let relationshipRequestId = ''
        // 请求 或者 eg
        if (nodeType === 1 || nodeType === 2) {
            a = await this.requestModel.create({ endpoint: "123",method:'GET',body:'' });
            console.log(a,'a')
            relationshipRequestId = String(a._id)
            // console.log(a.identifiers[0].id,'a')
        }

        const b = await this.coverageModel.create({ name: name,nodeType:nodeType,pid:pid,relationshipRequestId:relationshipRequestId,creator: currentUser });

        return { a, b };
    }
}