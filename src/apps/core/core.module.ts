import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
// import {CatsService} from "./cats.service";
// import {catsProviders} from "./providers/cats.providers";
// import {MockController} from "./mock.controller";
import {fileProviders} from "./core.providers";
import {CreateFileService} from "./service/create-file.service";
import {FileController} from "./controller/file.controller";
import {GetCollectionTreeService} from "./service/get-collection-tree.service";
import {RetrieveRequestService} from "./service/retrieve-request.service";
import {UpdateRequestService} from "./service/update-request.service";
import {DeleteFileService} from "./service/delete-file.service";
import {UpdateFileService} from "./service/update-file.service";
import {WorkspaceController} from "./controller/workspace.controller";
import {ListWorkspaceService} from "./service/list-workspace.service";
import {CreateWorkspaceService} from "./service/create-workspace.service";
import {UpdateWorkspaceService} from "./service/update-workspace.service";
import {MoveFileService} from "./service/move-file.service";

@Module({
    imports: [DatabaseModule],
    controllers: [FileController,WorkspaceController],
    providers: [
        CreateFileService,
        GetCollectionTreeService,
        RetrieveRequestService,
        UpdateRequestService,
        DeleteFileService,
        UpdateFileService,
        ListWorkspaceService,
        CreateWorkspaceService,
        UpdateWorkspaceService,
        MoveFileService,
        ...fileProviders,
    ],
})
export class CoreModule {}