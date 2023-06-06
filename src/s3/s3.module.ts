import {Module} from '@nestjs/common';
import {S3Service} from "./s3.service";
import {S3Controller} from "./s3.controller";
import DeleteFileService from "./delete-file.service";

@Module({
    providers: [S3Service , DeleteFileService],
    controllers: [S3Controller]
})
export class S3Module {
}
