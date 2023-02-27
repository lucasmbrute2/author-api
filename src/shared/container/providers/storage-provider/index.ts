import { enviromentVariables } from "@app/constraints/enviroment-variables";
import { StorageProvider } from "@app/repositories/storage-repository";
import { container } from "tsyringe";
import { LocalStorageProvider } from "./implementations/local-storage-provider";
import { S3StorageProvider } from "./implementations/S3-storage-provider";

const storage = {
    local: LocalStorageProvider,
    s3: S3StorageProvider,
};

container.registerSingleton<StorageProvider>(
    "StorageProvider",
    storage[enviromentVariables.storage]
);
