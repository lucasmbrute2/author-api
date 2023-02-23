import { describe, expect, it } from "vitest";
import { Author } from "./author-entity";
import { Email, Name, Password } from "./validation";

describe("Author entity", () => {
    it("should be able to instace an Author", () => {
        const author = new Author({
            name: new Name("test name"),
            password: new Password("Test-password!2"),
            bio: "test bio",
            username: new Email("testemail@gnmail.com"),
        });
        expect(author).toBeTruthy();
    });

    it("should not be able to instace an Author with Name in a wrong format", () => {
        expect(() => {
            new Author({
                name: new Name("test-name"),
                password: new Password("Test-password!2"),
                bio: "test bio",
                username: new Email("testemail@gnmail.com"),
            });
        }).toThrow();
    });
});
