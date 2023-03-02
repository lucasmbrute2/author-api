import dayjs from "dayjs";
import { RefreshToken } from "../entities/refresh-token";
import { randomUUID } from "node:crypto";
import { sign } from "jsonwebtoken";
import { enviromentVariables } from "@app/constraints/enviroment-variables";

type makeRefreshTokenProps = Partial<RefreshToken>;

export function makeRefreshToken(
    userId: string,
    override?: makeRefreshTokenProps
): RefreshToken {
    return new RefreshToken({
        expireIn: dayjs().add(7, "days").unix(),
        id: randomUUID(),
        token: sign({}, enviromentVariables.refreshToken),
        userId,
        ...override,
    });
}
