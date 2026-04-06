import { createContext, useEffect, useState, type FC, type PropsWithChildren } from "react"
import type { UserModel } from "../models/UserModel"
import { useAuth } from "@/hooks/AuthHook";

const UserContext = createContext({})

const UserProvider: FC<PropsWithChildren> = ({ children }) => {

    const auth = useAuth();

    const [user, setUser] = useState<UserModel | null>(null)

    useEffect(() => {
        if (auth.status === "unauthenticated" || auth.status === "loading") {
            return;
        }

    }, [auth.status]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext };
export default UserProvider;
