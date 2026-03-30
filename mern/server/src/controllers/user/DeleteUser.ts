import type { Response } from "express";
import type { AuthorizedRequest } from "../../interfaces/AuthorizedRequest";
import { User} from "../../models/User.ts";

/*
 * Delete a user by their ID
 * Path(DELETE: api/user/)
 */
const DeleteUser = async (req: AuthorizedRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user.id;
        await User.findByIdAndDelete(userId);

        res.status(200)
            .json({ message: "User deleted successfully" })
            .end();
    } catch (error) {
        res.status(500)
            .json({ message: "Error deleting user", error })
            .end();
    }
};

export default DeleteUser;
