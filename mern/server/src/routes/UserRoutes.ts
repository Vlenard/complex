import type { Controller } from "../utils/Types.ts";
import express from "express";
import DeleteUser from "../controllers/user/DeleteUser.ts";
import GetUser from "../controllers/user/GetUser.ts";
import UpdateUser from "../controllers/user/UpdateUser.ts";

const UserRoutes = express.Router();

UserRoutes.get("/", GetUser as Controller);

UserRoutes.put("/", UpdateUser as Controller);

UserRoutes.delete("/", DeleteUser as Controller);

export default UserRoutes;
