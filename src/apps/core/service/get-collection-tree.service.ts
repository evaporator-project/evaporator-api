import {Inject} from "@nestjs/common";
import {Model} from "mongoose";
import {FileDocument} from "../schemas/file.schema";

export class GetCollectionTreeService {
    constructor(
        @Inject('MONGODB_CONNECTION_FileRepository')
        private fileModel: Model<FileDocument>,
    ) {}
    async invoke(reqBody){
        const a = await this.fileModel.find({}).then(res=>res.map(r=>({
            id:String(r._id),
            name:r.name,
            nodeType:r.nodeType,
            pid:r.pid,
            relationshipRequestId:r.relationshipRequestId
        })))

        function arrToTree(arr: any, pid = '') {
            const newArr: any = [];
            arr.forEach((item: any) => {
                if (item.pid === pid) {
                    newArr.push({
                        ...item,
                        key:String(item.id),
                        title:item.name,
                        children: arrToTree(arr, item.id)
                    });
                }
            });
            return newArr;
        }

        return arrToTree(a)
    }
}