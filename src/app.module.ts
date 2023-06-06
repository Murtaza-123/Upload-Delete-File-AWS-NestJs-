import { Module } from '@nestjs/common';
import {S3Module} from "./s3/s3.module";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";

@Module({
  imports: [S3Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
