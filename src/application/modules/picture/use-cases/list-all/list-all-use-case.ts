import { PictureRepository } from "@app/repositories/picture-repository";
import { BadRequestError } from "@shared/errors/app-error";
import { inject, injectable } from "tsyringe";
import { Picture } from "../../entities/picture";

interface ListAllUseCaseResponse {
    pictures: Picture[];
}

@injectable()
export class ListAllUseCase {
    constructor(
        @inject("PictureRepository")
        private pictureRepository: PictureRepository
    ) {}

    async execute(page: number): Promise<ListAllUseCaseResponse> {
        //should be admin

        if (page < 1 || typeof page !== "number")
            throw new BadRequestError("Inform page in the correct formatt");

        const pictures = await this.pictureRepository.list(page);
        return {
            pictures,
        };
    }
}
