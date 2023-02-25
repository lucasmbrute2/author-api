import { PictureViewModel } from "../../../../views/picture-view-model";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadPictureUseCase } from "./upload-use-case";

interface UploadControllerProps {
    file: Express.Multer.File;
}

export class UploadController {
    async handle(
        req: Request<nonValuable, nonValuable, UploadControllerProps>,
        res: Response
    ): Promise<Response> {
        const uploadPictureUseCase = container.resolve(UploadPictureUseCase);
        const { file } = req;
        const { id } = req.userID;

        const picture = await uploadPictureUseCase.execute(file, id);

        const pictureToClient = PictureViewModel.toHTTP(picture);
        return res.status(201).json(pictureToClient);
    }
}
