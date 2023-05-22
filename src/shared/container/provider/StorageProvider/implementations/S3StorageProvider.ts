import { IStorageProvider } from "../IStorageProvider";

import { S3 } from "aws-sdk"
import { resolve } from "path";
import upload from "../../../../../config/upload";
import fs from "fs"
import mime from "mime"

const bucketName = "elint-payroll-images"
const region = "us-east-1"
const accessKeyId = "AKIAXMJ4WMSIWIT56SEL"
const secretAccessKey = "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"

class S3StorageProvider implements IStorageProvider {

    private client: S3;

    constructor() {
        this.client = new S3({
            region: region,
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey
        })
    }

    async save(file: string, folder: string): Promise<string> {
        const originalname = resolve(upload.tmpFolder, file)

        const fileContent = await fs.promises.readFile(originalname)

        const ContentType = mime.getType(originalname) as string

        // await this.client.putObject({
        //     Bucket: `${bucketName}/${folder}`,
        //     Key: file,
        //     ACL: "public-read",
        //     Body: fileContent,
        //     ContentType
        // }).promise()

        const uploadParams = {
          Bucket: `${bucketName}/${folder}`,
          Body: fileContent,
          Key: file
        }

        await this.client.upload(uploadParams).promise()

        await fs.promises.unlink(originalname)

        return file;
    }
    async delete(file: string, folder: string): Promise<void> {
        await this.client.deleteObject({
            Bucket: `${bucketName}/${folder}`,
            Key: file,
        }).promise()
    }

}

export { S3StorageProvider }

//Stmt1683982178051
// {
// 	"Version": "2012-10-17",
// 	"Id": "Policy1683982179485",
// 	"Statement": [
// 		{
// 			"Sid": "AllowAll",
// 			"Effect": "Allow",
// 			"Principal": "*",
// 			"Action": "s3:GetObject",
// 			"Resource": "arn:aws:s3:::elint-payroll-images/* "
// 		}
// 	]
// }