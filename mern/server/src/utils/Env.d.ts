declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MONGO_URI: string;
            PORT: string;
            FRONTEND_PORT: string;
            AUTH_SECRET: string;
            NODE_ENV: "development" | "production" | "test";
        }
    }
}

export {};
