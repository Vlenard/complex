"use server";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { connectDB } from "../lib/db";
import { User } from "../models/User";

const BCRYPT_HASH_PATTERN = /^\$2[aby]\$\d{2}\$/;

export default async function LoginAction(
  _: { error?: string },
  formData: FormData,
): Promise<{ error?: string }> {
  await connectDB();

  const email = (formData.get("email") as string).toLowerCase();
  const password = formData.get("password") as string;

  const user = await User.findOne({ email });

  if (!user) {
    return { error: "Invalid email" };
  }

  const isHashed = BCRYPT_HASH_PATTERN.test(user.password);
  const passwordMatches = isHashed
    ? await bcrypt.compare(password, user.password)
    : password === user.password;

  if (!passwordMatches) {
    return { error: "Invalid password" };
  }

  if (!isHashed) {
    user.password = await bcrypt.hash(password, 10);
    await user.save();
  }

  const token = jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    process.env.SECRET as string,
    { expiresIn: "1d" },
  );

  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  redirect("/");
}
