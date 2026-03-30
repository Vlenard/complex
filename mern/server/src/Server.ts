import express from "express";
import corsMiddleware from "./middlewares/CorsMiddleware.ts";
import NodeRouter from "./routes/NodeRouter.ts";
import WebFallback from "./routes/WebFallback.ts";
import BootstrapAndStart from "./core/Bootstrap.ts";

BootstrapAndStart(app => {
    // Configure CORS middleware
    app.use(corsMiddleware());

    // Parse JSON bodies
    app.use(express.json());

    //Nodes of api routes
    app.use("/api", NodeRouter);

    // SPA fallback (for client-side routing)
    app.use(WebFallback);
});
