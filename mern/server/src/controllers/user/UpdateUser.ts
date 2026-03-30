import type { Response } from "express";
import type { AuthorizedRequest } from "../../interfaces/AuthorizedRequest";
import { User } from "../../models/User.ts";

/*
 * Patch a user by their ID
 * Path(PUT: api/user/)
 */
const UpdateUser = async (req: AuthorizedRequest, res: Response): Promise<void> => {
    try {
        const updates = req.body;

        delete updates.password;

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { $set: updates },
            { new: true, runValidators: true },
        ).select("-password");

        res.status(200)
            .json(updatedUser)
            .end();
    } catch (error) {
        res.status(400)
            .json({ message: "Error updating user", error })
            .end();
    }
};

export default UpdateUser;
