import { AuthorRepository } from "@app/repositories/author-repository";
import { RedisRepository } from "@app/repositories/redis-repository";
import { NotFoundError } from "@shared/errors/app-error";
import { inject, injectable } from "tsyringe";

@injectable()
export class LogoutUseCase {
    constructor(
        @inject("RedisRepository")
        private redisClient: RedisRepository,
        @inject("AuthorRepository")
        private authorRepository: AuthorRepository
    ) {}

    async execute(id: string): Promise<void> {
        const isAuthorValid = await this.authorRepository.findByID(id);
        if (!isAuthorValid) throw new NotFoundError("Author not found.");

        await this.redisClient.disconnect();
        await this.redisClient.connect();

        await this.redisClient.delete(id);
    }
}
