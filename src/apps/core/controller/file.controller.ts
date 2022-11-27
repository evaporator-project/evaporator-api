import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from "@nestjs/common";
import { CreateFileService } from "../service/create-file.service";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { GetCollectionTreeService } from "../service/get-collection-tree.service";
import { RetrieveRequestService } from "../service/retrieve-request.service";
import { UpdateRequestService } from "../service/update-request.service";
import { DeleteFileService } from "../service/delete-file.service";
import { UpdateFileService } from "../service/update-file.service";
import { MoveFileService } from "../service/move-file.service";
// import {RetrieveRequestService} from "../../request/service/retrieve-request.service";

@Controller()
export class FileController {
  constructor(
    private createFileService: CreateFileService,
    private getCollectionTreeService: GetCollectionTreeService,
    private retrieveRequestService: RetrieveRequestService,
    private updateRequestService: UpdateRequestService,
    private deleteFileService: DeleteFileService,
    private updateFileService: UpdateFileService,
    private moveFileService: MoveFileService
  ) {}
  @UseGuards(JwtAuthGuard)
  @Post("createfile")
  createFile(@Body() reqBody, @Request() req) {
    console.log(req.user);
    return this.createFileService.invoke(req.user.id, reqBody);
  }

  @Post("getcollectiontree")
  getCollectionTree(@Body() reqBody, @Request() req) {
    return this.getCollectionTreeService.invoke(reqBody);
  }

  @Post("retrieverequest")
  retrieveRequest(@Body() reqBody, @Request() req) {
    return this.retrieveRequestService.invoke(reqBody);
  }

  @Post("updaterequest")
  updateRequest(@Body() reqBody, @Request() req) {
    return this.updateRequestService.invoke(reqBody);
  }

  @Post("deleteFileService")
  deleteFile(@Body() reqBody, @Request() req) {
    return this.deleteFileService.invoke(reqBody);
  }

  @UseGuards(JwtAuthGuard)
  @Post("updatefile")
  updateFile(@Body() reqBody, @Request() req):Promise<any> {
    return this.updateFileService.invoke(req.user.id, reqBody);
  }


  @UseGuards(JwtAuthGuard)
  @Post("movefile")
  moveFile(@Body() reqBody, @Request() req):Promise<any> {
    return this.moveFileService.invoke(req.user.id, reqBody);
  }
}
