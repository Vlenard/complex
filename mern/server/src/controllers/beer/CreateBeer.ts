import type { Response } from "express";
import type { BeerRequest } from "../../interfaces/BeerRequest";
import { Beer } from "../../models/Beer.ts";
import { User } from "../../models/User.ts";

const CreateBeer = async (req: BeerRequest, res: Response): Promise<void> => {
    try {
        if (!req.file) {
             res.status(400).json({ message: "Image is required!" }).end();
             return;
        }

        const newBeer = await Beer.create({
            ...req.body,
            url: req.file.path,
            owner: req.user.id,
        });

        await User.findByIdAndUpdate(req.user.id, {
            $push: { beers: newBeer._id }
        });

        res.status(201).json(newBeer).end();
    } catch (error: any) {
        res.status(400).json({ message: error.message }).end();
    }
};

export default CreateBeer;
