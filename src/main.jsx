import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { Provider } from "./provider.jsx";
import "./index.css";
import { Toaster } from "@/components/Shadcn/Sonner";
import { NotLoggedDialogOpenProvider } from "@/contexts/NotLoggedDialogOpen";
import { ClerkProvider } from '@clerk/clerk-react'
import { dark } from '@clerk/themes';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) throw new Error("Missing Publishable Key")

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}
      appearance={{
        baseTheme: dark
      }}
      afterSignOutUrl="/"
      signInForceRedirectUrl="try/chat"
    >
      <BrowserRouter>
        <Provider>
          <Toaster />
          <main className="dark text-foreground flex">
            <NotLoggedDialogOpenProvider>
              <App />
            </NotLoggedDialogOpenProvider>
          </main>
        </Provider>
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode >
);
