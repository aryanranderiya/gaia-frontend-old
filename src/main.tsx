import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import "./index.css";
import ErrorBoundary from "./components/Misc/ErrorBoundary.tsx";

import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <ErrorBoundary>
    <BrowserRouter>
      <main className="dark text-foreground flex bg-background">
        <App />
      </main>
    </BrowserRouter>
  </ErrorBoundary>,
  // {/* </React.StrictMode> */}
);
