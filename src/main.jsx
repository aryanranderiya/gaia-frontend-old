import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { Provider } from "./provider.jsx";
import "./index.css";
import { Toaster } from "./components/Sonner";

ReactDOM.createRoot(document.getElementById("root")).render(
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
