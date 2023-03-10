import { EditProfileProps } from "@app/repositories/author-repository";
import { AuthorViewlModel } from "@app/views/author-view-model";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { EditProfileUseCase } from "./edit-profile-use-case";

export class EditProfileController {
    async handle(
        req: Request<nonValuable, nonValuable, EditProfileProps>,
        res: Response
    ): Promise<Response> {
        const editProfileUseCase = container.resolve(EditProfileUseCase);
        const { id } = req.userID;
        const { bio, name, profile_picture } = req.body;

        const { author } = await editProfileUseCase.execute(
            {
                bio,
                name,
                profile_picture,
            },
            id
        );

        return res.status(201).json({
            autor: AuthorViewlModel.toHTTP(author),
            status: "success",
        });
    }
}
