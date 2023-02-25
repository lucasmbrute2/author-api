import dotenv from "dotenv";
dotenv.config();

export const enviromentVariables = {
    jwtTokenHash: process.env.TOKEN_MD5_HASH,
    storage: process.env.STORAGE,
};
