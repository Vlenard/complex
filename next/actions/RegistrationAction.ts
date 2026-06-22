"use server";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import { redirect } from "next/navigation";
import { User } from "../models/User";

export default async function RegistrationAction(
  formData: FormData,
): Promise<{ error?: string }> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const existingUser = await User.findOne({ email: email.toLowerCase() });

  if (existingUser) {
    return { error: "User already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
  });
  await newUser.save();

  const token = jwt.sign(
    { id: newUser._id, name: newUser.name, email: newUser.email },
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
