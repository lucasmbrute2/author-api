import { allowedOrigins } from "@app/constraints/allowed-origins";
import { NextFunction, Request, Response } from "express";

export function credentials(req: Request, res: Response, next: NextFunction) {
    const origin = req?.headers?.origin;
    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Credentials", "true");
    }

    next();
}
