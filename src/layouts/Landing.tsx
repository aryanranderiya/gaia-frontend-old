import Navbar from "@/components/LandingPage/Navbar";
import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LoginSignup from "../pages/LoginSignup";
import PageNotFound from "../pages/PageNotFound";
// import Pricing from "../pages/Pricing";

export default function Landing() {
  return (
    <>
      {/* <ReactLenis root> */}
      <Navbar />
      <Routes>
        <Route index element={<LandingPage />} />
        {/* <Route path="/pricing" element={<Pricing />} /> */}
        <Route path="*" element={<PageNotFound />} />
        <Route path="/login" element={<LoginSignup isLogin={true} />} />
        <Route path="/signup" element={<LoginSignup />} />
      </Routes>
      {/* </ReactLenis> */}
    </>
  );
}
