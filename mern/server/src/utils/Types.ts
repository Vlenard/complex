import type { Response, Request } from "express";

export type Controller = (req: Request, res: Response) => Promise<void>;
