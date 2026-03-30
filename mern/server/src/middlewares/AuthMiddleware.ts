import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../interfaces/AuthRequest";
import Bearer from "../services/Bearer.ts";

const AuthMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    try {
        // Verify the bearer token from the request
        const user = Bearer.verify(req);

        // If the user is not authenticated, return a 401 response
        if (!user) {
            res.status(401).json({ message: "Access denied. No token provided." });
            return;
        }

        // If the user is authenticated, attach the user object to the request
        req.user = user;
        next();
    } catch (error) {
        // If the token is invalid or expired, return a 403 response
        res.status(403).json({ message: "Invalid or expired token." });
    }
};

export default AuthMiddleware;
