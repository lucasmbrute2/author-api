import { enviromentVariables } from "@app/constraints/enviroment-variables";
import { RedisProvider } from "@shared/container/providers/redis-provider/implementations/redis-provider";
import { AppError, Unauthorized } from "@shared/errors/app-error";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { container } from "tsyringe";

export class Authorization {
    async ensureAuth(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;
        const redisClient = container.resolve(RedisProvider);

        try {
            const [_, token] = authHeader.split(" ");

            const { sub: user_id } = verify(
                token,
                enviromentVariables.jwtTokenHash
            );

            const isTokenAvailable = await redisClient.getValue(
                user_id as string
            );

            req.userID = {
                id: user_id as string,
            };
            if (!isTokenAvailable) {
                throw new AppError("Missing token", 403);
            }
        } catch (error) {
            throw new AppError("Missing token", 403);
        }

        return next();
    }
}
