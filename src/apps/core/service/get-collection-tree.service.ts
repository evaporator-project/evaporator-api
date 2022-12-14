import { Inject } from "@nestjs/common";
import { Model } from "mongoose";
import { FileDocument } from "../schemas/file.schema";
import { RequestDocument } from "../schemas/request.schema";

export class GetCollectionTreeService {
  constructor(
    @Inject("MONGODB_CONNECTION_FileRepository")
    private fileModel: Model<FileDocument>,
    @Inject("MONGODB_CONNECTION_RequestRepository")
    private requestModel: Model<RequestDocument>
  ) {}
  async invoke(reqBody) {
    // console.log(reqBody,'reqBody',reqBody.workspaceId)
    const files = await this.fileModel.find({workspaceId: reqBody.workspaceId}).then((res) =>
      res.map((r) => ({
        id: String(r._id),
        name: r.name,
        nodeType: r.nodeType,
        pid: r.pid,
        relationshipRequestId: r.relationshipRequestId,
        sortIndex:r.sortIndex
      }))
    );

    // console.log(files.map(i=>i.id))

    const combinationFiles = [];
    for (let i = 0; i < files.length; i++) {
      if (files[i].relationshipRequestId) {
        const request = await this.requestModel.findOne({
          _id: files[i].relationshipRequestId,
        });
        combinationFiles.push({
          ...files[i],
          relationshipRequestMethod: request.method,
        });
      } else {
        combinationFiles.push({
          ...files[i],
          relationshipRequestMethod: "",
        });
      }
    }

    function arrToTree(arr: any, pid = "") {
      const newArr: any = [];
      arr.forEach((item: any) => {
        if (item.pid === pid) {
          newArr.push({
            ...item,
            key: String(item.id),
            title: item.name,
            children: arrToTree(arr, item.id),
          });
          newArr.sort((a,b)=>a.sortIndex - b.sortIndex)
        }
      });
      return newArr;
    }

    return arrToTree(combinationFiles);
  }
}
