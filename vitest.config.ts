import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
    resolve: {
        alias: {
            "@app": path.resolve(__dirname, "./src/application"),
            "@shared": path.resolve(__dirname, "./src/shared"),
        },
    },
});
