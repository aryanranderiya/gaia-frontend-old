import Navbar from "@/components/LandingPage/Navbar";
import LandingPage from "../pages/LandingPage";
import { Route, Routes } from "react-router-dom";
import FeedbackForm from "../pages/FeedbackForm";
import PageNotFound from "../pages/PageNotFound";
import EarlyAccess from "../pages/EarlyAccess";
import LoginSignup from "../pages/LoginSignup";
import Pricing from "../pages/Pricing";

export default function Landing() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/early-access" element={<EarlyAccess />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/login" element={<LoginSignup isLogin={true} />} />
        <Route path="/signup" element={<LoginSignup />} />
      </Routes>
    </>
  );
}
