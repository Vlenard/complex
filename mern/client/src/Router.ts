import { createBrowserRouter } from "react-router";
import Landing from "@/components/pages/Landing";
import AppLayout from "@/components/layouts/AppLayout";

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
                lazy: async () => {
                    const Component = (await import("./components/pages/Home")).default;
                    return { Component };
                },

            },
            {
                path: "beer/:id",
                lazy: async () => {
                    const Component = (await import("./components/pages/Beer")).default;
                    return { Component };
                }
            },
            {
                path: "beer/create",
                lazy: async () => {
                    const Component = (await import("./components/pages/CreateBeer")).default;
                    return { Component };
                }
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
