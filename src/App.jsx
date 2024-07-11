import * as React from "react";
import MainInterface from "./pages/MainInterface";
import Landing from "./layouts/Landing";
import { Route, Routes } from "react-router-dom";
import api from "./apiaxios";

function App() {
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/refreshToken", {
          withCredentials: true,
        });
        console.log(response);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
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
