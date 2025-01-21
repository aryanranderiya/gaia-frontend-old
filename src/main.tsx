import { Toaster } from "@/components/ui/sonner";
import { NextUIProvider } from "@nextui-org/system";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, useNavigate } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary.tsx";

export function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  return <NextUIProvider navigate={navigate}>{children}</NextUIProvider>;
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <ErrorBoundary>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Provider>
          <Toaster richColors position="top-center" />
          <main className="dark text-foreground flex bg-background">
            <App />
          </main>
        </Provider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </ErrorBoundary>
  // {/* </React.StrictMode> */}
);
