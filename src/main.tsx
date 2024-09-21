import { Toaster } from "@/components/Shadcn/Sonner";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/system";
import { useNavigate } from "react-router-dom";

export function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  return <NextUIProvider navigate={navigate}>{children}</NextUIProvider>;
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <Toaster />
        <main className="dark text-foreground flex">
          <App />
        </main>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
