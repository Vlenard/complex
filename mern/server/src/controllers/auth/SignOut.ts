import type { Request, Response } from "express";

const SignOut = (_req: Request, res: Response): void => {
    res.clearCookie("auth_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    });

    res.status(200).json({ message: "Sign out successful" });
};

export default SignOut;
