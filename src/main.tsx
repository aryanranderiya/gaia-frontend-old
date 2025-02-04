import ErrorBoundary from "@/components/ErrorBoundary.tsx";
import { HeroUIProvider } from "@heroui/system";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { lazy, ReactNode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, useNavigate } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
// const ErrorBoundary = lazy(() => import("@/components/ErrorBoundary.tsx"));

export function Provider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  return <HeroUIProvider navigate={navigate}>{children}</HeroUIProvider>;
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <ErrorBoundary>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Provider>
          <main className="dark text-foreground flex bg-background">
            <App />
          </main>
        </Provider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </ErrorBoundary>
  // {/* </React.StrictMode> */}
);
