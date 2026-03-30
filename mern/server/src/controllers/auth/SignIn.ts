import type { Request, Response } from "express";
import { User } from "../../models/User.ts";
import Bearer from "../../services/Bearer.ts";

const SignIn = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({ message: "Invalid email" });
            return;
        }
        if (password !== user.password) {
            res.status(400).json({ message: "Invalid password" });
            return;
        }

        const token = Bearer.sign({ id: user._id, name: user.name, email: user.email });

        res.status(200).json({
            token,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export default SignIn;
