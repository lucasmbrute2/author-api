import { enviromentVariables } from "../../../../application/constraints/enviroment-variables";
import { StorageProvider } from "@app/repositories/storage-repository";
import { container } from "tsyringe";
import { LocalStorageProvider } from "./implementations/local-storage-provider";

const storage = {
    local: LocalStorageProvider,
};

container.registerSingleton<StorageProvider>(
    "StorageProvider",
    storage[enviromentVariables.storage]
);
