import type { Express } from "express";
import express from "express";
import Env, { loadEnv } from "./Env.ts";
import Db from "./Db.ts";

type AppInitializer = (app: Express) => void;

import readline from 'readline';
import { Server } from 'http';

const BootstrapAndStart = (initializer: AppInitializer): void => {
    loadEnv();
    let currentServer: Server | null = null;

    const startServer = async (): Promise<void> => {
        if (currentServer) {
            console.log("Shutting down existing server...");
            await new Promise<void>((resolve) => currentServer!.close(() => resolve()));
        }

        do {
            try {
                await Db();
                const app = express();
                initializer(app);

                currentServer = app.listen(Env().PORT, () => {
                    console.log("Server runs on http://localhost:" + Env().PORT);
                    console.log("Press 'r' to reload the server");
                });
                return;
            } catch (error) {
                console.error("Failed to connect to DB, retrying...", error);
                await new Promise(resolve => setTimeout(resolve, 3000));
            }
        } while (true);
    };

    const setupTerminalInput = () => {
        readline.emitKeypressEvents(process.stdin);
        if (process.stdin.isTTY) {
            process.stdin.setRawMode(true);
        }

        process.stdin.on('keypress', (str, key) => {
            if (key.ctrl && key.name === 'c') {
                process.exit();
            }

            if (key.name === 'r') {
                console.log("\n--- Reloading Server ---");
                startServer();
            }
        });
    };

    setupTerminalInput();
    startServer();
};

export default BootstrapAndStart;
