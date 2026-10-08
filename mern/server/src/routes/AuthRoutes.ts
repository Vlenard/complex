import express from "express";
import SignUp from "../controllers/auth/SignUp.ts";
import SignIn from "../controllers/auth/SignIn.ts";
import SignOut from "../controllers/auth/SignOut.ts";

const AuthRoutes = express.Router();

AuthRoutes.post("/sign-up", SignUp);

AuthRoutes.post("/sign-in", SignIn);

AuthRoutes.post("/sign-out", SignOut);

export default AuthRoutes;
