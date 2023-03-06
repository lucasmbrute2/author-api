import { enviromentVariables } from "./enviroment-variables";

export const allowedOrigins = [
    enviromentVariables.origin,
    "http://127.0.0.1:3000",
    "http://localhost:3000",
];
