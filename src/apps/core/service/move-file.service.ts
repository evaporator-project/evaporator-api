import { Inject } from "@nestjs/common";
import { Model } from "mongoose";
import { FileDocument } from "../schemas/file.schema";
import { RequestDocument } from "../schemas/request.schema";

export class MoveFileService {
    constructor(
        @Inject("MONGODB_CONNECTION_FileRepository")
        private fileModel: Model<FileDocument>,
        @Inject("MONGODB_CONNECTION_RequestRepository")
        private requestModel: Model<RequestDocument>
    ) {}
    async invoke(currentUser, reqBody):Promise<any> {
        const {
            fromNodePath,
            id,
            toParentPath,
            toIndex,
        } = reqBody


        if (fromNodePath&&toParentPath){


            if (fromNodePath.at(-2) !==toParentPath.at(-1)){
                console.log('111')

                await this.fileModel.updateOne({_id:fromNodePath.at(-1)},{pid:toParentPath.at(-1)})
            }


            const rows = await this.fileModel.find({pid:toParentPath.at(-1)}).then(res=>res.map(i=>String(i._id)))
            const findOldIndex = rows.findIndex(i=>fromNodePath.at(-1) === i)

            function fn(arr,start,end) {
                const cloneArr = JSON.parse(JSON.stringify(arr))
                cloneArr.splice(end, 0, cloneArr[start]);
                cloneArr.splice(start + (start>end?1:0),1)
                return cloneArr
            }


            console.log(rows,fn(rows,findOldIndex,toIndex))

            const tiaozheng = fn(rows,findOldIndex,toIndex)

            for (let i = 0; i < tiaozheng.length; i++) {
                await this.fileModel.updateOne({_id:tiaozheng[i]},{sortIndex:i})
            }


        }



        
        // const arr = rows.map(i=>i._id).

            return {};
    }
}
