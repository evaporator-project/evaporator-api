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

@Module({
    imports: [DatabaseModule],
    controllers: [FileController],
    providers: [
        CreateFileService,
        GetCollectionTreeService,
        RetrieveRequestService,
        UpdateRequestService,
        ...fileProviders,
    ],
})
export class CoreModule {}