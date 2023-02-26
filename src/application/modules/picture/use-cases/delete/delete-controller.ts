import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteUseCase } from "./delete-use-case";

export class DeleteController {
    async handle(req: Request, res: Response): Promise<Response> {
        const deleteUseCase = container.resolve(DeleteUseCase);
        const { fileName } = req.params;
        const { id } = req.userID;

        await deleteUseCase.execute(fileName, id);

        return res.status(200).send();
    }
}
