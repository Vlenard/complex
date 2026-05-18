import { createBrowserRouter } from "react-router";
import Home from "@/components/pages/Home";
import Landing from "@/components/pages/Landing";
import AppLayout from "@/components/layouts/AppLayout";
import Beer from "@/components/pages/Beer";

const Router = createBrowserRouter([
    {
        path: "/",
        Component: Landing
    },
    {
        path: "/app",
        Component: AppLayout,
        children: [
            {
                index: true,
                Component: Home,

            },
            {
                path: "beer/:id",
                Component: Beer
            }
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
