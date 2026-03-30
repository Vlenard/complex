/// <reference types="../utils/Env.d.ts" />
import dotenv from "dotenv";

let env: NodeJS.ProcessEnv;

export const loadEnv = (): void => {
    const result = dotenv.config();

    if (result.error) {
        console.warn("Failed to load .env file: ", result.error);
        return;
    }

    const envData: NodeJS.ProcessEnv = process.env;

    if (!envData.AUTH_SECRET) {
        console.warn("AUTH_SECRET is not defined in the environment.")
    }

    if (!envData.MONGO_URI) {
        console.warn("MONGO_URI is not defined in the environment.")
    }

    if (!envData.PORT) {
        console.warn("PORT is not defined in the environment.")
    }

    if (!envData.FRONTEND_PORT) {
        console.warn("FRONTEND_PORT is not defined in the environment.")
    }

    if (!envData.NODE_ENV) {
        console.warn("NODE_ENV is not defined in the environment.")
    }

    env = envData;
};

const Env = (): NodeJS.ProcessEnv => {
    return env;
};

export default Env;
