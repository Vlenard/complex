import { createContext } from "react";

export type AuthStatus = "authenticated" | "unauthenticated" | "loading";
export type SignInPayload = { email: string; password: string };
export type SignUpPayload = { name: string; email: string; password: string };
export type AuthContextType = {
    status: AuthStatus;
    token: string | null;
    signIn: (payload: SignInPayload) => Promise<void>;
    signUp: (payload: SignUpPayload) => Promise<void>;
    signOut: () => Promise<void> | void;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)
