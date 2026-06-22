"use server";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { User } from "../models/User";

export default async function LoginAction(
  _: { error?: string },
  formData: FormData,
): Promise<{ error?: string }> {
  const email = (formData.get("email") as string).toLowerCase();
  const password = formData.get("password") as string;

  const user = await User.findOne({ email });

  if (!user) {
    return { error: "Invalid email" };
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return { error: "Invalid password" };
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
