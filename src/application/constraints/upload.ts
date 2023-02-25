import multer, { diskStorage } from "multer";
import { resolve } from "node:path";
import { randomBytes } from "node:crypto";
import { AppError } from "../../shared/errors/app-error";

const destination = resolve(__dirname, "..", "..", "..", "tmp");

export const multerConfigs: multer.Options = {
    storage: diskStorage({
        destination,
        filename: (req, file, cb) => {
            randomBytes(16, (err, hash) => {
                if (err) throw new AppError("Fail to hash image", 500);

                const fileName = `${hash.toString("hex")}-${file.originalname}`;
                cb(null, fileName);
            });
        },
    }),
    limits: {
        fileSize: 4 * 1024 * 1024,
    },

    fileFilter: (req, file, cb) => {
        const allowedMimes = ["image/jpeg", "image/png", "image/pjpeg"];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new AppError("Wrong image format", 400));
        }
    },
};
