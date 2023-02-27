import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import { AppError } from "./shared/errors/app-error";
import "express-async-errors";
import { route } from "./shared/infra/http/routes";
import "./shared/container/index";
import path from "path";
import { enviromentVariables } from "@app/constraints/enviroment-variables";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(route);
app.use(
    "/picture/upload",
    express.static(path.resolve(__dirname, "..", "tmp"))
);

app.use(cors());
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
