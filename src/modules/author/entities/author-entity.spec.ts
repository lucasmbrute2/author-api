import { describe, expect, it } from "vitest";
import { makeAuthor } from "../factory/makeAuthor";
import { Name } from "./validation";

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
});
