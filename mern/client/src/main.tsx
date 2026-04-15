import "./index.css"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router/dom"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import Router from "@/Router.ts"
import AuthProvider from "@/providers/AuthProvider.tsx"
import HttpProvider from "@/providers/HttpProvider.tsx"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <HttpProvider>
            <AuthProvider>
                <ThemeProvider>
                    <RouterProvider router={Router} />
                </ThemeProvider>
            </AuthProvider>
        </HttpProvider>
    </StrictMode>
)
