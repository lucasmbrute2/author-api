import { RefreshTokenRepository } from "@app/repositories/refresh-token-repository";
import { RefreshToken } from "../entities/refresh-token";

export class InMemoryRefreshTokenRepository implements RefreshTokenRepository {
    public refreshToken: RefreshToken[] = [];

    async save(refreshToken: RefreshToken): Promise<RefreshToken> {
        this.refreshToken.push(refreshToken);
        return refreshToken;
    }

    async delete(token: string, userId: string): Promise<void> {
        this.refreshToken = this.refreshToken.filter(
            (refreshToken) =>
                refreshToken.userId !== userId && refreshToken.token !== token
        );
    }
}
