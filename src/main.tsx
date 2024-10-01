import { Toaster } from "@/components/Shadcn/Sonner";
import { NextUIProvider } from "@nextui-org/system";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, useNavigate } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

export function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  return <NextUIProvider navigate={navigate}>{children}</NextUIProvider>;
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Provider>
          <Toaster />
          <main className="dark text-foreground flex">
            <App />
          </main>
        </Provider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
