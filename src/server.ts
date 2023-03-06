import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import { AppError } from "./shared/errors/app-error";
import "express-async-errors";
import { route } from "./shared/infra/http/routes";
import "./shared/container/index";
import path from "path";
import { enviromentVariables } from "@app/constraints/enviroment-variables";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
    cors({
        credentials: true,
        allowedHeaders: [
            "Origin",
            "X-Requested-With",
            "Content-Type",
            "Accept",
            "Authorization",
        ],
        origin: [
            enviromentVariables.origin,
            "localhost:3000",
            "http://127.0.0.1:5173",
        ],
    })
);

app.use(express.json());
app.use(cookieParser());
app.use(
    "/picture/upload",
    express.static(path.resolve(__dirname, "..", "tmp"))
);

app.use(route);
app.use(
    (
        error: Error,
        req: Request,
        res: Response,
        next: NextFunction
    ): Response => {
        if (error instanceof AppError) {
            const { message, statusCode } = error;
            return res.status(statusCode).json({
                message: message,
            });
        }

        return res.status(500).json({
            status: error,
            message: `Internal server error ${error.message}`,
        });
    }
);
app.listen(enviromentVariables.port, () => console.log("im running"));
