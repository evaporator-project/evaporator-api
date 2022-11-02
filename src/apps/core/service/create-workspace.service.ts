import { Inject } from "@nestjs/common";
import { Model } from "mongoose";
import { FileDocument } from "../schemas/file.schema";
import { RequestDocument } from "../schemas/request.schema";
import {WorkspaceDocument} from "../schemas/workspace.schema";

export class CreateWorkspaceService {
    constructor(
        @Inject("MONGODB_CONNECTION_WorkspaceRepository")
        private workspaceModel: Model<WorkspaceDocument>
    ) {}
    async invoke(currentUser, reqBody) {
        return  await this.workspaceModel.create({
            creator:currentUser,
            ...reqBody
        })
    }
}
