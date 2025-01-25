import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import SuspenseLoader from "./components/SuspenseLoader";
import Landing from "./layouts/Landing";
import NotLoggedIn from "@/components/NotLoggedInDialog";
const MainInterface = lazy(() => import("./pages/MainInterface"));

function App() {
  return (
    <UserProvider>
      <NotLoggedIn />
      <Routes>
        <Route
          path="/try/*"
          element={
            <Suspense fallback={<SuspenseLoader fullHeight={true} />}>
              <MainInterface />
            </Suspense>
          }
        />
        <Route path="/*" element={<Landing />} />
        {/* <Route path="/record" element={<Record />} /> */}
      </Routes>
    </UserProvider>
  );
}

export default App;
