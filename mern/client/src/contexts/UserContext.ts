import type { UserModel } from "@/models/UserModel";
import { createContext } from "react";

type UserContextType = {
    user: UserModel | null;
    setters: {
        setEmail: (email: string) => void;
        setPassword: (password: string) => void;
        setName: (name: string) => void;
        setBeers: (beers: string[]) => void;
    }
}

export const UserContext = createContext<UserContextType>({} as UserContextType)
