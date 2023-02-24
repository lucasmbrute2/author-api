import { RegisterAuthorController } from "../../../../application/modules/author/use-cases/register-author-controller";
import { Router } from "express";
const authorRouter = Router();

const registerAuthorController = new RegisterAuthorController();

authorRouter.post("/register", registerAuthorController.handle);

export { authorRouter };
