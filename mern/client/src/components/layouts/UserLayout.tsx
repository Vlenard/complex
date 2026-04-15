import UserProvider from "@/providers/UserProvider";
import type { FC } from "react";
import { Outlet } from "react-router";

const UserLayout: FC = () => {
    return (
        <UserProvider>
            <Outlet />
        </UserProvider>
    );
};

export default UserLayout;
