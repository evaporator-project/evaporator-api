import {Inject} from "@nestjs/common";
import {Model} from "mongoose";
import {FileDocument} from "../schemas/file.schema";
import {RequestDocument} from "../schemas/request.schema";
import { WorkspaceDocument } from "../schemas/workspace.schema";

export class ListWorkspaceService {
    constructor(
        @Inject("MONGODB_CONNECTION_WorkspaceRepository")
        private workspaceModel: Model<WorkspaceDocument>,
    ) {}
    async invoke(currentUser,reqBody) {
        const membersWorkspaces = await this.workspaceModel.find({members:{$elemMatch:{role:"admin",memberId:currentUser}}})
        const selfWorkspaces = await this.workspaceModel.find({creator:currentUser})
        return [
            ...membersWorkspaces,
            ...selfWorkspaces
        ]
    }
}