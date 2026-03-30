import express from "express";
import SignUp from "../controllers/auth/SignUp.ts";
import SignIn from "../controllers/auth/SignIn.ts";

const AuthRoutes = express.Router();

AuthRoutes.post("/sign-up", SignUp);

AuthRoutes.post("/sign-in", SignIn);

export default AuthRoutes;
