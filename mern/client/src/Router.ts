import { createBrowserRouter } from "react-router";
import Landing from "./components/pages/Landing";

const Router = createBrowserRouter([
    {
        path: "/",
        Component: Landing,
    },
    {
        path: "/sign-in",
        lazy: async () => {
            const Component = (await import("./components/pages/SignIn")).default;
            return { Component };
        },
    },
]);

export default Router;
