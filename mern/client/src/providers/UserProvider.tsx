import { use, useEffect, useMemo, useState, type FC, type PropsWithChildren } from "react"
import type { UserModel } from "@/models/UserModel"
import { AuthContext } from "@/contexts/AuthContext";
import { UserContext } from "@/contexts/UserContext";
import { HttpContext } from "@/contexts/HttpContext";

const UserProvider: FC<PropsWithChildren> = ({ children }) => {

    const auth = use(AuthContext);
    const http = use(HttpContext);

    const [user, setUser] = useState<UserModel | null>(null);

    const fetchUser = async (controller: AbortController) => {
        try {
            const response = await http.fetch("/user", {
                method: "GET",
                signal: controller.signal
            });

            setUser(await response.json());
        } catch (error: any) {
            if (error.name === "AbortError") {
                return;
            }
            console.error("Failed to fetch user:", error);
        }
    };

    const clearUser = () => {
        setUser(null);
    };

    useEffect(() => {
        const controller = new AbortController();

        if (auth.status === "authenticated") {
            if (user === null) {
                fetchUser(controller);
            }
        } else {
            if (user !== null) {
                clearUser();
            }
        }

        return () => {
            // This cancels the request if the component unmounts
            // or if auth.status changes before the fetch finishes.
            controller.abort();
        };
    }, [auth.status, http]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
