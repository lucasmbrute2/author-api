import { AuthorViewlModel } from "@app/views/author-view-model";
import { PictureViewModel } from "@app/views/picture-view-model";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { SoftDeleteUseCase } from "./soft-delete-use-case";

export class SoftDeleteController {
    async handle(req: Request, res: Response): Promise<Response> {
        const softDeleteUseCase = container.resolve(SoftDeleteUseCase);
        const { filename } = req.params;
        const { id } = req.userID;

        const picture = await softDeleteUseCase.execute(filename, id);

        return res.status(200).json({
            status: "success",
            picture: PictureViewModel.toHTTP(picture),
            author: AuthorViewlModel.toHTTP(picture.author),
        });
    }
}
