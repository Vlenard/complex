import type { Request } from "express";
import type { UserRequestData } from "../interfaces/User";
import jwt from "jsonwebtoken";

const secret = process.env.AUTH_SECRET || "AJvw41oSr7egeiPskljadflaGBF5BBlU";

const Bearer = {
    verify: (req: Request): UserRequestData | undefined => {

        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return;
        }

        const decoded = jwt.verify(token, secret);

        return decoded as UserRequestData;
    },

    sign: (data: any): string => {
        return jwt.sign(data, secret, { expiresIn: "1d" });
    },
}

export default Bearer;
