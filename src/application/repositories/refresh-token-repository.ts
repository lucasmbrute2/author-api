import { RefreshToken } from "@app/modules/refresh-token/entities/refresh-token";

export interface RefreshTokenRepository {
    save(refreshToken: RefreshToken): Promise<RefreshToken>;
    delete(refreshTokenId: string): Promise<void>;
    findByAuthorId(authorId: string): Promise<RefreshToken | null>;
}
