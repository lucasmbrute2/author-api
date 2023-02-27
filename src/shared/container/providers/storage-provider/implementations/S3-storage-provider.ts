import { Picture } from "@app/modules/picture/entities/picture";
import { StorageProvider } from "@app/repositories/storage-repository";
import { S3 } from "aws-sdk";
import mime from "mime";
import fs from "fs";
import { resolve } from "path";
import { enviromentVariables } from "@app/constraints/enviroment-variables";

export class S3StorageProvider implements StorageProvider {
    private client: S3;

    constructor() {
        const { accessKeyId, secretAccessKey, region } =
            enviromentVariables.aws;

        this.client = new S3({
            region,
            credentials: {
                secretAccessKey,
                accessKeyId,
            },
        });
    }

    async save(file: Picture): Promise<void> {
        const originalName = resolve(file.htmlUrl);
        const fileContent = await fs.promises.readFile(originalName);

        await this.client
            .putObject({
                Bucket: `${enviromentVariables.aws.bucketName}/test`,
                Key: file.aliasKey,
                ContentType: mime.getType(originalName),
                ACL: "public-read",
                Body: fileContent,
            })
            .promise();

        await fs.promises.unlink(originalName);
    }

    async delete(fileKey: string): Promise<void> {
        await this.client
            .deleteObject({
                Bucket: `${enviromentVariables.aws.bucketName}/test`,
                Key: fileKey,
            })
            .promise();
    }
}
