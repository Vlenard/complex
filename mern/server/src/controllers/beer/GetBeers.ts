import type { Response } from "express";
import type { BeerRequest } from "../../interfaces/BeerRequest";
import { Beer } from "../../models/Beer.ts";

/*
 * Get all beers for the authenticated user
 * Path(GET: api/beer/)
 */
const GetBeers = async (req: BeerRequest, res: Response): Promise<void> => {
    try {
        const beers = await Beer.find({ owner: req.user.id }).sort({
            createdAt: -1,
        });

        res.status(200).json(beers).end();
    } catch (error: any) {
        res.status(500).json({ message: "Server error fetching beers" }).end();
    }
};

export default GetBeers;
