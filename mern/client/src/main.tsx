import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import Router from "./Router.ts"
import { RouterProvider } from "react-router/dom"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
        <RouterProvider router={Router} />
    </ThemeProvider>
  </StrictMode>
)
