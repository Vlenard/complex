import type { Response } from "express";
import type { BeerRequest } from "../../interfaces/BeerRequest";
import { Beer } from "../../models/Beer.ts";

/*
 * Update a beer by its ID
 * Path(PUT: api/beer/:id)
 */
const UpdateBeer = async (req: BeerRequest, res: Response): Promise<void> => {
    try {
        const updateData: any = { ...req.body };
        if (req.file) {
            updateData.url = req.file.path;
        }

        const updatedBeer = await Beer.findOneAndUpdate(
            { _id: req.params.id, owner: req.user.id },
            { $set: updateData },
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
