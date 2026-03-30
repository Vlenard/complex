import type { Response } from "express";
import type { BeerRequest } from "../../interfaces/BeerRequest";
import { Beer } from "../../models/Beer.ts";
import { User } from "../../models/User.ts";

/*
 * Delete a beer by its ID
 * Path(DELETE: api/beer/:id)
 */
const DeleteBeer = async (req: BeerRequest, res: Response): Promise<void> => {
    try {
        const deletedBeer = await Beer.findOneAndDelete({
            _id: req.params.id,
            owner: req.user.id,
        });

        if (deletedBeer) {
            await User.findByIdAndUpdate(req.user.id, {
                $pull: { beers: deletedBeer._id }
            });
        }

        if (!deletedBeer) {
            res.status(404)
                .json({ message: "Beer not found or unauthorized" })
                .end();
            return;
        }

        res.status(200).json({ message: "Beer removed successfully" }).end();
    } catch (error: any) {
        res.status(500).json({ message: "Error deleting beer" }).end();
    }
};

export default DeleteBeer;
