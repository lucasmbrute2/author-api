import "reflect-metadata";
import {
    AppError,
    BadRequestError,
    Unauthorized,
} from "@shared/errors/app-error";
import { beforeEach, describe, expect, it, test } from "vitest";
import { makeAuthor } from "../../factory/makeAuthor";
import { InMemoryRepository } from "../../repository/in-memory-author-repository";
import { ResetPasswordUseCase } from "./reset-password-use-case";

let authorRepository: InMemoryRepository;
let resetPasswordUseCase: ResetPasswordUseCase;

describe("Reset password", () => {
    beforeEach(() => {
        authorRepository = new InMemoryRepository();
        resetPasswordUseCase = new ResetPasswordUseCase(authorRepository);
    });

    it("should not be able to reset a password from no found author", () => {
        expect(async () => {
            await resetPasswordUseCase.execute({
                id: "fake-user",
                confirmNewPassword: "wrong-password",
                newPassword: "wrong-new-password",
                oldPassword: "worng-old-password",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to change incorrect password", () => {
        expect(async () => {
            const author = makeAuthor();
            await authorRepository.create(author);
            const { id } = author;

            await resetPasswordUseCase.execute({
                id,
                oldPassword: "Wrong-password123",
                newPassword: "Ttest!123",
                confirmNewPassword: "Ttest!123",
            });
        }).rejects.toBeInstanceOf(Unauthorized);
    });

    test("password and confirm password should be equal", () => {
        expect(async () => {
            const author = makeAuthor();
            await authorRepository.create(author);
            const { id, password } = author;

            await resetPasswordUseCase.execute({
                oldPassword: password.value,
                id,
                newPassword: "Equal!123",
                confirmNewPassword: "Different!123",
            });
        }).rejects.toBeInstanceOf(BadRequestError);
    });
});
