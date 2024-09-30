import MainInterface from "./pages/MainInterface";
import Landing from "./layouts/Landing";
import { Route, Routes } from "react-router-dom";
import NotLoggedIn from "@/components/NotLoggedInDialog";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <UserProvider>
      <NotLoggedIn />
      <Routes>
        <Route path="/try/*" element={<MainInterface />} />
        <Route path="/*" element={<Landing />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
