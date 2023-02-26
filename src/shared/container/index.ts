import { container } from "tsyringe";
import "../container/providers/redis-provider/index";
import "./providers/storage-provider/index";
import { PrismaClient } from "@prisma/client";
import { AuthorRepository } from "@app/repositories/author-repository";
import { PrismaRepositoryAuthor } from "../infra/database/prisma/repository/prisma-author-repository";
import { PictureRepository } from "@app/repositories/picture-repository";
import { PrismaRepositoryPicture } from "../infra/database/prisma/repository/prisma-picture-repository";

container.register<PrismaClient>(PrismaClient, {
    useValue: new PrismaClient(),
});

container.registerSingleton<AuthorRepository>(
    "AuthorRepository",
    PrismaRepositoryAuthor
);

container.registerSingleton<PictureRepository>(
    "PictureRepository",
    PrismaRepositoryPicture
);
