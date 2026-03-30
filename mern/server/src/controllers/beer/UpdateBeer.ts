import type { Response } from "express";
import type { BeerRequest } from "../../interfaces/BeerRequest";
import { Beer } from "../../models/Beer.ts";

/*
 * Update a beer by its ID
 * Path(PUT: api/beer/:id)
 */
const UpdateBeer = async (req: BeerRequest, res: Response): Promise<void> => {
    try {
        const updatedBeer = await Beer.findOneAndUpdate(
            { _id: req.params.id, owner: req.user.id },
            { $set: req.body },
            { new: true, runValidators: true },
        );

        if (!updatedBeer) {
            res.status(404)
                .json({ message: "Beer not found or unauthorized" })
                .end();
            return;
        }

        res.status(200).json(updatedBeer).end();
    } catch (error: any) {
        res.status(400).json({ message: error.message }).end();
    }
};

export default UpdateBeer;
