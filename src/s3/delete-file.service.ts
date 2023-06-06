import { Injectable } from '@nestjs/common';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import {Credentials} from "@aws-sdk/types";
const KEY_ID = "AKIASAEM7RK3KALRSB53"
const SECRET_KEY = "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"


@Injectable()
export class DeleteFileService {
    private readonly s3: S3Client;

    constructor() {
        const credentials: Credentials = {
            accessKeyId: KEY_ID,
            secretAccessKey: SECRET_KEY,
        };
        this.s3 = new S3Client({region: 'us-east-2', credentials});
    }

    async deleteFile(fileName: string, objectKey: string): Promise<boolean> {
        try {
            const deleteParams = {
                Bucket: 'basecamp-group-media',
                Key: 'test.jpg'
            };
            const deleteCommand = new DeleteObjectCommand(deleteParams);

            const data = await this.s3.send(deleteCommand);
            console.log(`Successfully deleted ${fileName}`);

            return true;
        } catch (err) {
            console.log(`Error deleting ${fileName}: ${err}`);
            return false;
        }
    }
}
export default DeleteFileService
