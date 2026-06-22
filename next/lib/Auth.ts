import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

type TokenPayload = {
  id: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
};

const getPayload = async (): Promise<TokenPayload | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) return null;

  try {
    return jwt.verify(
      token.value,
      process.env.SECRET as string,
    ) as TokenPayload;
  } catch {
    return null;
  }
};

const isAuthenticated = async (): Promise<boolean> => {
  const payload = await getPayload();
  return payload !== null;
};

const getUser = async (): Promise<Omit<TokenPayload, "iat" | "exp"> | null> => {
  const payload = await getPayload();
  if (!payload) return null;

  const { id, name, email } = payload;
  return { id, name, email };
};

const Auth = {
  isAuthenticated,
  getUser,
};

export default Auth;
