import * as React from "react";
import MainInterface from "./pages/MainInterface";
import Landing from "./layouts/Landing";
import { Route, Routes } from "react-router-dom";
import NotLoggedIn from "./components/NotLoggedInDialog";

function App() {
  return (
    <>
      <NotLoggedIn />
      <Routes>
        <Route path="/try/*" element={<MainInterface />} />
        <Route path="/*" element={<Landing />} />
      </Routes>
    </>
  );
}

export default App;
