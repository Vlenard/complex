import type { Express } from "express";
import express from "express";
import Env, { loadEnv } from "./Env.ts";
import Db from "./Db.ts";

type AppInitializer = (app: Express) => void;

const BootstrapAndStart = (initializer: AppInitializer): void => {
    loadEnv();
    Db()
        .then(() => {
            const app = express();
            initializer(app);
            app.listen(Env().PORT, () => {
                console.log("Server runs on http://localhost:" + Env().PORT);
            });
        })
        .catch((error) => {
            console.error("Failed to connect to DB:", error);
            process.exit(1);
        });
};

export default BootstrapAndStart;
