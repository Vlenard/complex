import type { Request, Response } from "express";
import { User } from "../../models/User.ts";
import Bearer from "../../services/Bearer.ts";

const SignUp = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        const newUser = new User({ name, email, password });
        await newUser.save();

        const token = Bearer.sign({ id: newUser._id, name: newUser.name, email: newUser.email });

        res.status(201).json({
            token
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export default SignUp;
