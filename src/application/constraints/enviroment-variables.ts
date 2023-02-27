import dotenv from "dotenv";
dotenv.config();

export const enviromentVariables = {
    jwtTokenHash: process.env.TOKEN_MD5_HASH,
    storage: process.env.STORAGE,
    port: process.env.PORT,
    aws: {
        bucketName: process.env.AWS_BUCKET,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        region: process.env.AWS_DEFAULT_REGION,
    },
};
