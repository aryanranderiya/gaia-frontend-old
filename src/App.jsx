import * as React from "react";
import MainInterface from "./pages/MainInterface";
import Landing from "./layouts/Landing";
import { Route, Routes } from "react-router-dom";
import NotLoggedIn from "@/components/NotLoggedInDialog";
import { UserInfoProvider } from "@/contexts/UserInfo";

function App() {
  return (
    <UserInfoProvider>
      <NotLoggedIn />
      <Routes>
        <Route path="/try/*" element={<MainInterface />} />
        <Route path="/*" element={<Landing />} />

        
      </Routes>
    </UserInfoProvider>
  );
}

export default App;
