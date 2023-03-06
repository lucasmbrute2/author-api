import { PictureViewModel } from "@app/views/picture-view-model";
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
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        res.setHeader("Access-Control-Allow-Credentials", "true");

        const uploadPictureUseCase = container.resolve(UploadPictureUseCase);
        const { file } = req;
        const { id } = req.userID;

        const picture = await uploadPictureUseCase.execute(file, id);

        const pictureToClient = PictureViewModel.toHTTP(picture);
        return res
            .status(201)
            .json({ picture: pictureToClient, status: "success" });
    }
}
