import { Inject } from "@nestjs/common";
import { Model } from "mongoose";
import { FileDocument } from "../schemas/file.schema";
import { RequestDocument } from "../schemas/request.schema";
import { WorkspaceDocument } from "../schemas/workspace.schema";

export class UpdateWorkspaceService {
  constructor(
    @Inject("MONGODB_CONNECTION_WorkspaceRepository")
    private workspaceModel: Model<WorkspaceDocument>
  ) {}
  async invoke(currentUser, reqBody):Promise<any> {
    const cloneReqBody = JSON.parse(JSON.stringify(reqBody));
    delete cloneReqBody.id;
    console.log(cloneReqBody)
    return this.workspaceModel.updateOne({ _id: reqBody.id }, reqBody);
  }
}
