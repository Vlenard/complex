import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../interfaces/AuthRequest";
import Bearer from "../services/Bearer.ts";

type Middleware = (req: AuthRequest, res: Response, next: NextFunction) => void;
type WebAuthMiddlewareArgs = {
    excludedPaths: string[];
};

const WebAuthMiddleware = (options: WebAuthMiddlewareArgs): Middleware => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {

        // Check if the current path is in the excluded paths list
        if (options.excludedPaths.includes(req.path)) {
            next();
            return;
        }

        try {
            // Decode the bearer token from the request
            const user = Bearer.verify(req);

            // If the user is not authenticated, redirect to the sign-in page
            if (!user) {
                res.redirect("/sign-in");
                return;
            }

            next();
        } catch (error) {
            // If an error occurs during token decoding, redirect to the sign-in page
            res.redirect("/sign-in");
        }
    };
};

export default WebAuthMiddleware;
