import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import { User } from "../../models/User.ts";
import Bearer from "../../services/Bearer.ts";

const BCRYPT_HASH_PATTERN = /^\$2[aby]\$\d{2}\$/;

const SignIn = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({ message: "Invalid email" });
            return;
        }

        const isHashed = BCRYPT_HASH_PATTERN.test(user.password);
        const passwordMatches = isHashed
            ? await bcrypt.compare(password, user.password)
            : password === user.password;

        if (!passwordMatches) {
            res.status(400).json({ message: "Invalid password" });
            return;
        }

        if (!isHashed) {
            user.password = await bcrypt.hash(password, 10);
            await user.save();
        }

        const token = Bearer.sign({ id: user._id, name: user.name, email: user.email });

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000,
            path: "/",
        });

        res.status(200).json({
            message: "Sign in successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export default SignIn;
