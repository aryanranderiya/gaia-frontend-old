import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import ErrorBoundary from "./components/Misc/ErrorBoundary.tsx";
import "./index.css";
import ProvidersLayout from "./layouts/ProvidersLayout.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ProvidersLayout>
          <main className="dark text-foreground flex bg-background">
            <App />
          </main>
        </ProvidersLayout>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
