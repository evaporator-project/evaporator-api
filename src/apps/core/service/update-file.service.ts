import { Inject } from "@nestjs/common";
import { Model } from "mongoose";
import { FileDocument } from "../schemas/file.schema";
import { RequestDocument } from "../schemas/request.schema";

export class UpdateFileService {
  constructor(
    @Inject("MONGODB_CONNECTION_FileRepository")
    private fileModel: Model<FileDocument>,
    @Inject("MONGODB_CONNECTION_RequestRepository")
    private requestModel: Model<RequestDocument>
  ) {}
  async invoke(currentUser, reqBody):Promise<any> {
    const cloneReqBody = JSON.parse(JSON.stringify(reqBody));
    delete cloneReqBody.id;
    return this.fileModel.updateOne({ _id: reqBody.id }, cloneReqBody);
  }
}
