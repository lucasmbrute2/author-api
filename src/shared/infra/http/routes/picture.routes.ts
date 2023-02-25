import { multerConfigs } from "../../../../application/constraints/upload";
import { UploadController } from "../../../../application/modules/picture/use-cases/upload/upload-controller";
import { Router } from "express";

import multer from "multer";
import { Authorization } from "../middlewares/ensure-auth";

const pictureRoutes = Router();
const upload = multer(multerConfigs);

const authorization = new Authorization();
const uploadController = new UploadController();

pictureRoutes.post(
    "/upload",
    authorization.ensureAuth,
    upload.single("pictures"),
    uploadController.handle
);

export { pictureRoutes };
