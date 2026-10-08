import type { Request } from "express";
import type { UserRequestData } from "../interfaces/User";
import jwt from "jsonwebtoken";

const secret = process.env.AUTH_SECRET || "AJvw41oSr7egeiPskljadflaGBF5BBlU";

const getCookie = (req: Request, name: string): string | undefined => {
    const cookieHeader = req.headers.cookie;
    if (!cookieHeader) return undefined;
    const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
    return match ? decodeURIComponent(match[1]) : undefined;
};

const Bearer = {
    verify: (req: Request): UserRequestData | undefined => {
        let token = getCookie(req, "auth_token");

        if (!token) {
            const authHeader = req.headers.authorization;
            token = authHeader && authHeader.split(" ")[1];
        }

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
