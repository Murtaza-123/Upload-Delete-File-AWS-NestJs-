import {Injectable} from '@nestjs/common';
import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3';
import {Credentials} from '@aws-sdk/types';
const KEY_ID = "AKIASAEM7RK3KALRSB53"
const SECRET_KEY = "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"


@Injectable()
export class S3Service {
    private s3: S3Client;

    constructor() {
        const credentials: Credentials = {
            accessKeyId: KEY_ID,
            secretAccessKey: SECRET_KEY,
        };
        this.s3 = new S3Client({region: 'us-east-2', credentials});
    }

    generateRandomString = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return result;
    }

    uploadFile = async (file: Express.Multer.File, bucketName: string, folderName: string) => {
        const uploadParams = {
            Bucket: "basecamp-group-media",
            Key: 'test.jpg',
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read',
        };
       // console.log(uploadParams)

        try {
            const command = new PutObjectCommand(uploadParams);
            const result = await this.s3.send(command);
            const url = `https://s3.${'us-east-2'}.amazonaws.com/${'basecamp-group-media'}/${'test.jpg'}`;
            console.log(`File URL: ${url}`);
           // console.log(`File URL: ${(result as any).Location}`);

            console.log(`File uploaded successfully. ETag: ${result.ETag}`);
            return  (result as any).Location;
        } catch (err) {
            console.error(err);
            throw new Error(`Failed to upload file to S3 bucket: ${err.message}`);
        }
    }
}
