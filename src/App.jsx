import { Route, Routes } from "react-router-dom";
import Sidebar from "./layouts/Sidebar";
import MainChat from "./layouts/MainChat";

function App() {
  return (
    <>
      <Sidebar />
      <MainChat />
    </>
  );
}

export default App;
