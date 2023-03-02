import { RefreshTokenRepository } from "@app/repositories/refresh-token-repository";
import { RefreshToken } from "../entities/refresh-token";

export class InMemoryRefreshTokenRepository implements RefreshTokenRepository {
    public refreshToken: RefreshToken[] = [];

    async save(refreshToken: RefreshToken): Promise<RefreshToken> {
        this.refreshToken.push(refreshToken);
        return refreshToken;
    }

    async delete(userId: string): Promise<void> {
        this.refreshToken = this.refreshToken.filter(
            (refreshToken) => refreshToken.userId !== userId
        );
    }

    async findByAuthorId(authorId: string): Promise<RefreshToken> {
        return this.refreshToken.find(
            (refreshToken) => refreshToken.userId === authorId
        );
    }
}
