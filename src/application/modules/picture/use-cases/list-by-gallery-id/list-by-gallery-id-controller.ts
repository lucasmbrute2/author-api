import { AuthorViewlModel } from "@app/views/author-view-model";
import { PictureViewModel } from "@app/views/picture-view-model";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListByGalleryIdUseCase } from "./list-by-gallery-id-use-case";

export class ListByGalleryIdController {
    async handle(req: Request, res: Response): Promise<Response> {
        const listByGalleryIdUseCase = container.resolve(
            ListByGalleryIdUseCase
        );
        const { page } = req.query;
        const { id } = req.userID;

        const { pictures, author } = await listByGalleryIdUseCase.execute(
            Number(page) || 1,
            id
        );

        const formattedPictures = pictures.map(PictureViewModel.toHTTP);
        return res.status(200).json({
            pictures: formattedPictures,
            author: AuthorViewlModel.toHTTP(author),
            status: "success",
        });
    }
}
