import * as React from "react";
import MainInterface from "./pages/MainInterface";
import Landing from "./layouts/Landing";
import { Route, Routes } from "react-router-dom";
import { apiauth } from "./apiaxios";

function App() {
  React.useEffect(() => {
    apiauth
      .get("http://127.0.0.1:8000/refreshToken")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/try/*" element={<MainInterface />} />
        <Route path="/*" element={<Landing />} />
      </Routes>
    </>
  );
}

export default App;
