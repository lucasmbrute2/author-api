import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
    resolve: {
        alias: {
            "@app": path.resolve(__dirname, "./src/application"),
            "@modules": path.resolve(__dirname, "./src/application/modules"),
            "@constraints": path.resolve(
                __dirname,
                "./src/application/constraints"
            ),
            "@helpers": path.resolve(__dirname, "./src/application/helpers"),
        },
    },
});
