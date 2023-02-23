import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
    resolve: {
        alias: {
            "@modules": path.resolve(__dirname, "./src/modules"),
            "@constraints": path.resolve(__dirname, "./src/constraints"),
            "@helpers": path.resolve(__dirname, "./src/helpers"),
        },
    },
});
