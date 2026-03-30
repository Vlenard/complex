import { Request } from "express";
import type { UserRequestData } from "./User.d.ts";

export interface AuthorizedRequest extends Request {
    user: UserRequestData;
}
