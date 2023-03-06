import { RefreshToken } from "@app/modules/refresh-token/entities/refresh-token";

export interface RefreshTokenRepository {
    save(refreshToken: RefreshToken): Promise<RefreshToken>;
    delete(authodId: string): Promise<void>;
    findByAuthorId(authorId: string): Promise<RefreshToken | null>;
}
