import express from "express";
import AuthRoutes from "./AuthRoutes.ts";
import BeerRoutes from "./BeerRoutes.ts";
import UserRoutes from "./UserRoutes.ts";
import AuthMiddleware from "../middlewares/AuthMiddleware.ts";

const NodeRouter = express.Router();

NodeRouter.use("/auth", AuthRoutes);
NodeRouter.use("/beer", AuthMiddleware, BeerRoutes);
NodeRouter.use("/user", AuthMiddleware, UserRoutes);

export default NodeRouter;
