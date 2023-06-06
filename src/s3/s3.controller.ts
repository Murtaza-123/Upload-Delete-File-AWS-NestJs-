import {Controller, Post, UseInterceptors, UploadedFile, Delete, Param , Get} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import {S3Service} from './s3.service';
import DeleteFileService from "./delete-file.service";

// @ts-ignore
@Controller()
export class S3Controller {
    constructor(private readonly s3Service: S3Service , private readonly deleteFileService:DeleteFileService) {
    }

    @Post('/upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<{ url: string }> {
        const bucketName = "basecamp-group-media";
        const folderName = '/uploads';
        const url = await this.s3Service.uploadFile(file, bucketName, folderName);
        return {url};
       // console.log(url);
    }

    @Delete(':filename')
    async deleteFile(@Param('filename') filename: string): Promise<string> {
        try {
            await this.deleteFileService.deleteFile('test.jpg' , 'test.jpg');
            return `File ${filename} has been deleted`;
        } catch (error) {
            return error.message;
        }
    }
     @Get('/murtaza')
     findAll() {
         return "murtaza";
     };

}
