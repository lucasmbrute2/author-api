import { RefreshToken } from "@app/modules/refresh-token/entities/refresh-token";

export interface RefreshTokenRepository {
    save(refreshToken: RefreshToken): Promise<RefreshToken>;
    delete(refreshToken: string, userId: string): Promise<void>;
}
