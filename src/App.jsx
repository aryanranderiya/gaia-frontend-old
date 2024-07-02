import * as React from "react";
import MainInterface from "./pages/MainInterface";
import Landing from "./pages/Landing";
import { Route, Routes, Navigate } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/try/*" element={<MainInterface />} />
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
