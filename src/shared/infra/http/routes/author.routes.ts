import { RegisterAuthorController } from "../../../../application/modules/author/use-cases/register-controller";
import { Router } from "express";
import { AuthAuthorController } from "../../../../application/modules/author/use-cases/auth-controller";
import { EditProfileController } from "../../../../application/modules/author/use-cases/edit-profile-controller";
import { Authorization } from "../middlewares/ensure-auth";
const authorRouter = Router();

const registerAuthorController = new RegisterAuthorController();
const authAuthorController = new AuthAuthorController();
const authEditProfileController = new EditProfileController();
const authorization = new Authorization();

authorRouter.post("/register", registerAuthorController.handle);
authorRouter.post("/auth", authAuthorController.handle);
authorRouter.patch(
    "/edit/:id",
    authorization.ensureAuth,
    authEditProfileController.handle
);

export { authorRouter };
