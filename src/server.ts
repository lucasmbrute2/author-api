import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "./shared/container/index";
import { AppError } from "./shared/errors/app-error";
import "express-async-errors";

const app = express();

app.use(express.json());

// app.get("/host/:id", (req, res) => {
//     console.log(req.originalUrl);

//     return res.json({
//         message: "Hello world",
//     });
// });

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

app.listen(3000, () => console.log("im running"));
