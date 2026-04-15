import { AuthContext } from "@/contexts/AuthContext";
import { use, type FC } from "react";
import Landing from "@/components/pages/Landing";
import UserLayout from "@/components/layouts/UserLayout";

const StartLayout: FC = () => {

    const auth = use(AuthContext);

    if(auth.status === "authenticated")
        return <UserLayout />

    return <Landing />
};

export default StartLayout
