import type { Response } from "express";
import type { BeerRequest } from "../../interfaces/BeerRequest.d.ts";
import { Beer } from "../../models/Beer.ts";

/*
 * Get a single beer by ID
 * Path(GET: api/beer/:id)
 */
const GetBeer = async (req: BeerRequest, res: Response): Promise<void> => {
    try {
        const beer = await Beer.findOne({ _id: req.params.id, owner: req.user.id });

        if (!beer) {
            res.status(404).json({ message: "Beer not found" }).end();
            return;
        }

        res.status(200).json(beer).end();
    } catch (error: any) {
        res.status(500).json({ message: "Server error fetching beer" }).end();
    }
};

export default GetBeer;
