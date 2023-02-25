import { RegisterAuthorController } from "../../../../application/modules/author/use-cases/register/register-controller";
import { Router } from "express";
import { AuthAuthorController } from "../../../../application/modules/author/use-cases/auth/auth-controller";
import { EditProfileController } from "../../../../application/modules/author/use-cases/edit-profile/edit-profile-controller";
import { Authorization } from "../middlewares/ensure-auth";
import { LogoutController } from "../../../../application/modules/author/use-cases/logout/logout-controller";
const authorRouter = Router();

const registerAuthorController = new RegisterAuthorController();
const authAuthorController = new AuthAuthorController();
const authEditProfileController = new EditProfileController();
const authorization = new Authorization();
const logoutController = new LogoutController();

authorRouter.post("/register", registerAuthorController.handle);
authorRouter.post("/auth", authAuthorController.handle);
authorRouter.patch(
    "/edit",
    authorization.ensureAuth,
    authEditProfileController.handle
);

authorRouter.get("/logout", authorization.ensureAuth, logoutController.handle);

export { authorRouter };
