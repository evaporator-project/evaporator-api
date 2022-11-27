import { Inject } from "@nestjs/common";
import { Model } from "mongoose";
import { FileDocument } from "../schemas/file.schema";
import { RequestDocument } from "../schemas/request.schema";

export class CreateFileService {
  constructor(
    @Inject("MONGODB_CONNECTION_FileRepository")
    private fileModel: Model<FileDocument>,
    @Inject("MONGODB_CONNECTION_RequestRepository")
    private requestModel: Model<RequestDocument>
  ) {}
  async invoke(currentUser, reqBody) {
    console.log(currentUser, "currentUser");
    //判断类型1 2 3

    const { nodeType, name, pid,workspaceId } = reqBody;
    let a: any = {};
    let relationshipRequestId = "";
    // 请求 或者 eg
    if (nodeType === 1 || nodeType === 2) {
      a = await this.requestModel.create({
          preRequestScript: '',
          headers: [],
          name: '',
          body: {
              contentType: '',
              body: '',
          },
          testScript: '',
          method: 'GET',
          auth: {
          },
          endpoint: '',
          params: [],
      });
      console.log(a, "a");
      relationshipRequestId = String(a._id);
      // console.log(a.identifiers[0].id,'a')
    }

    const b = await this.fileModel.create({
        workspaceId:workspaceId,
      name: name,
      nodeType: nodeType,
      pid: pid,
      relationshipRequestId: relationshipRequestId,
      creator: currentUser,
        sortIndex:0
    });

    return { a, b };
  }
}
