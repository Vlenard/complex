import { createBrowserRouter } from "react-router";
import Home from "@/components/pages/Home";
import Landing from "./components/pages/Landing";
import UserLayout from "./components/layouts/UserLayout";

const Router = createBrowserRouter([
    {
        path: "/",
        Component: Landing
    },
    {
        path: "/app",
        Component: UserLayout,
        children: [
            { index: true, Component: Home },
        ]
    },
    {
        path: "/sign-in",
        lazy: async () => {
            const Component = (await import("./components/pages/SignIn")).default;
            return { Component };
        }
    },
    {
        path: "/sign-up",
        lazy: async () => {
            const Component = (await import("./components/pages/SignUp")).default;
            return { Component };
        }
    }
]);

export default Router;
