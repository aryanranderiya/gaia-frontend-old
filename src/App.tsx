import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import SuspenseLoader from "./components/SuspenseLoader";

// Lazy load components
const MainInterface = lazy(() => import("./pages/MainInterface"));
const Landing = lazy(() => import("./layouts/Landing"));
const NotLoggedIn = lazy(() => import("@/components/NotLoggedInDialog"));

function App() {
  return (
    <UserProvider>
      <Suspense fallback={<SuspenseLoader />}>
        <NotLoggedIn />
        <Routes>
          <Route path="/try/*" element={<MainInterface />} />
          <Route path="/*" element={<Landing />} />
        </Routes>
      </Suspense>
    </UserProvider>
  );
}

export default App;
