import { container } from "tsyringe";
import "../container/providers/redis-provider/index";
import { PrismaClient } from "@prisma/client";
import { AuthorRepository } from "@app/repositories/author-repository";
import { PrismaRepositoryAuthor } from "../infra/database/prisma/repository/prisma-repository";

container.register<PrismaClient>(PrismaClient, {
    useValue: new PrismaClient(),
});

container.registerSingleton<AuthorRepository>(
    "AuthorRepository",
    PrismaRepositoryAuthor
);
