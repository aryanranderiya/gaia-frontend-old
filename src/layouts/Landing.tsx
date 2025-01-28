import Navbar from "@/components/LandingPage/Navbar";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import SuspenseLoader from "@/components/SuspenseLoader";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
const PageNotFound = lazy(() => import("../pages/PageNotFound"));
const LoginSignup = lazy(() => import("../pages/LoginSignup"));
// import Pricing from "../pages/Pricing";

export default function Landing() {
  return (
    <>
      <title>GAIA</title>

      <Navbar />
      <Routes>
        <Route index element={<LandingPage />} />
        <Route
          path="*"
          element={
            <Suspense fallback={<SuspenseLoader fullHeight={true} />}>
              <PageNotFound />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<SuspenseLoader fullHeight={true} />}>
              <LoginSignup isLogin={true} />
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<SuspenseLoader fullHeight={true} />}>
              <LoginSignup />
            </Suspense>
          }
        />

        <Route
          path="/privacy"
          element={
            <Suspense fallback={<SuspenseLoader fullHeight={true} />}>
              <PrivacyPolicy />
            </Suspense>
          }
        />

        <Route
          path="/terms"
          element={
            <Suspense fallback={<SuspenseLoader fullHeight={true} />}>
              <TermsOfService />
            </Suspense>
          }
        />

        {/* <Route path="/pricing" element={<Pricing />} /> */}
      </Routes>
    </>
  );
}
