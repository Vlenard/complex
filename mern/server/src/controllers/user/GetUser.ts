import type { Response } from "express";
import type { AuthorizedRequest } from "../../interfaces/AuthorizedRequest";
import { User} from "../../models/User.ts";

/*
 * Get a user by their ID
 * Path(GET: api/user/)
 */
const GetUser = async ( req: AuthorizedRequest, res: Response): Promise<void> => {
    try {
        const userId = (req as any).user.id;
        const user = await User.findById(userId)
            .select("-password");

        if (!user) {
            res.status(404)
                .json({ message: "User not found" })
                .end();
            return;
        }

        res.status(200)
            .json(user)
            .end();
    } catch (error) {
        res.status(500)
            .json({ message: "Error fetching user", error })
            .end();
    }
};

export default GetUser;
