import { describe, expect, it } from "vitest";
import { makeAuthor } from "@modules/author/factory/makeAuthor";
import { Email, Name, Password } from "@modules/author/entities/validation";

describe("Author entity", () => {
    it("should be able to instace an Author", () => {
        const author = makeAuthor();
        expect(author).toBeTruthy();
    });

    it("should not be able to instace an Author with Name in a wrong format", () => {
        expect(() => {
            return makeAuthor({
                name: new Name("test-wrong-format-name"),
            });
        }).toThrow();
    });

    it("should not be able to instace an Author with Username in a wrong format", () => {
        expect(() => {
            return makeAuthor({
                name: new Email("test-wrong-format-username"),
            });
        }).toThrow();
    });

    it("should not be able to instace an Author with Password in a wrong format", () => {
        expect(() => {
            return makeAuthor({
                name: new Password("test-wrong-format-Password"),
            });
        }).toThrow();
    });
});
