import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import SuspenseLoader from "@/components/SuspenseLoader";

// import LandingPage from "@/pages/Landing";
const LandingPage = lazy(() => import("@/pages/Landing"));

// import Navbar from "@/components/LandingPage/misc/Navbar";
const Navbar = lazy(() => import("@/components/LandingPage/misc/Navbar"));

const Pricing = lazy(() => import("@/pages/Pricing"));
const TermsOfService = lazy(() => import("@/pages/PrivacyPolicy"));
const PrivacyPolicy = lazy(() => import("@/pages/TermsOfService"));
const PageNotFound = lazy(() => import("@/pages/PageNotFound"));
const LoginSignup = lazy(() => import("@/pages/LoginSignup"));
// import Pricing from "../pages/Pricing";

export default function LandingLayout() {
  return (
    <>
      <title>GAIA</title>

      <Suspense fallback={<></>}>
        <Navbar />
      </Suspense>

      <Routes>
        <Route
          index
          element={
            <Suspense fallback={<SuspenseLoader fullHeight={true} />}>
              <LandingPage />
            </Suspense>
          }
        />

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

        <Route
          path="/pricing"
          element={
            <Suspense fallback={<SuspenseLoader fullHeight={true} />}>
              <Pricing />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}
