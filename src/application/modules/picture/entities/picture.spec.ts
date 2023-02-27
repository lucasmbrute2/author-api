import { beforeEach, describe, expect, it } from "vitest";
import { makePicture } from "../factory/make-picture";
import { Picture } from "./picture";

let picture: Picture;
describe("Picture entity", () => {
    beforeEach(() => {
        picture = makePicture();
    });

    it("should not be able to reasign picture's deletedAt", () => {
        const deletedAt = picture.deletedAt;
        picture.deletedAt = new Date();

        expect(deletedAt).toEqual(picture.deletedAt);
    });

    it("should not be able to reasign picture's galleryID", () => {
        const deletedAt = picture.galleryId;
        picture._galleryId();

        expect(deletedAt).toEqual(picture.galleryId);
    });
});
