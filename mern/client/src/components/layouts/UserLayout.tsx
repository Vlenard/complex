import { AuthContext } from "@/contexts/AuthContext";
import UserProvider from "@/providers/UserProvider";
import { use, useEffect, type FC } from "react";
import { Outlet, useNavigate } from "react-router";

const UserLayout: FC = () => {

    const auth = use(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.status === "unauthenticated") {
            navigate("/sign-in");
        }
    }, [auth.status, navigate]);

    return (
        auth.status === "authenticated" ? (
            <UserProvider>
                <Outlet />
            </UserProvider>
        ) : (
            null
        )
    );
};

export default UserLayout;
