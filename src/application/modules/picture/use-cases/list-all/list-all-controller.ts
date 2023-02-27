import { PictureViewModel } from "@app/views/picture-view-model";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAllUseCase } from "./list-all-use-case";

export class ListAllController {
    async handle(req: Request, res: Response): Promise<Response> {
        const listAllUseCase = container.resolve(ListAllUseCase);
        const { page } = req.query;
        const { pictures } = await listAllUseCase.execute(Number(page) || 1);

        const formatPictes = pictures.map(PictureViewModel.toHTTP);
        return res.status(200).json({
            pictures: formatPictes,
        });
    }
}
