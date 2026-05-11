import "./index.css"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router/dom"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import Router from "@/Router.ts"
import AuthProvider from "@/providers/AuthProvider.tsx"
import HttpProvider from "@/providers/HttpProvider.tsx"
import I18nProvider from "./providers/I18nProvider"
import { Toaster } from "./components/ui/sonner"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <HttpProvider>
            <AuthProvider>
                <I18nProvider>
                    <ThemeProvider>
                        <RouterProvider router={Router} />
                    </ThemeProvider>
                </I18nProvider>
            </AuthProvider>
        </HttpProvider>
        <Toaster />
    </StrictMode>
)
