import { multerConfigs } from "@app/constraints/upload";
import { DeleteController } from "@app/modules/picture/use-cases/delete/delete-controller";
import { ListAllController } from "@app/modules/picture/use-cases/list-all/list-all-controller";
import { ListByGalleryIdController } from "@app/modules/picture/use-cases/list-by-gallery-id/list-by-gallery-id-controller";
import { SoftDeleteController } from "@app/modules/picture/use-cases/soft-delete/soft-delete-controller";
import { UploadController } from "@app/modules/picture/use-cases/upload/upload-controller";
import { Router } from "express";

import multer from "multer";
import { Authorization } from "../middlewares/ensure-auth";

const pictureRoutes = Router();
const upload = multer(multerConfigs);

const authorization = new Authorization();
const uploadController = new UploadController();
const deleteController = new DeleteController();
const listByGalleryIdController = new ListByGalleryIdController();
const softDeleteController = new SoftDeleteController();
const listAllController = new ListAllController();

pictureRoutes.post(
    "/upload",
    authorization.ensureAuth,
    upload.single("pictures"),
    uploadController.handle
);

pictureRoutes.delete(
    "/delete/:fileName",
    authorization.ensureAuth,
    deleteController.handle
);

pictureRoutes.get(
    "/listByID",
    authorization.ensureAuth,
    listByGalleryIdController.handle
);

pictureRoutes.put(
    "/exclude/:filename",
    authorization.ensureAuth,
    softDeleteController.handle
);

//This route should be accessed only for ADMIN roles, we need to create a middleware to validate it.
pictureRoutes.get("/", listAllController.handle);

export { pictureRoutes };
