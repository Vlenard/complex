import { createBrowserRouter } from "react-router";
import StartLayout from "@/components/layouts/StartLayout";
import Home from "@/components/pages/Home";

const Router = createBrowserRouter([
    {
        path: "/",
        Component: StartLayout,
        children: [
            { index: true, Component: Home }
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
