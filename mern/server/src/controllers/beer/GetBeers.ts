import type { Response } from "express";
import type { BeerRequest } from "../../interfaces/BeerRequest";
import { Beer } from "../../models/Beer.ts";

/*
 * Get all beers for the authenticated user filtered by name
 * Path(GET: api/beer/?name=...)
 */
const GetBeers = async (req: BeerRequest, res: Response): Promise<void> => {
    try {
        const { name } = req.query;

        const query: any = { owner: req.user.id };

        if (name) {
            query.name = { $regex: name, $options: "i" };
        }

        const beers = await Beer.find(query).sort({
            createdAt: -1,
        });

        res.status(200).json(beers).end();
    } catch (error: any) {
        res.status(500).json({ message: "Server error fetching beers" }).end();
    }
};

export default GetBeers;
