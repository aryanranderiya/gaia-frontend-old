import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";

import SuspenseLoader from "@/components/Misc/SuspenseLoader";

// Lazy-loaded components
const LandingPage = lazy(() => import("@/pages/Landing"));
const Navbar = lazy(() => import("@/components/Landing/Navbar"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const TermsOfService = lazy(() => import("@/pages/PrivacyPolicy"));
const PrivacyPolicy = lazy(() => import("@/pages/TermsOfService"));
const PageNotFound = lazy(() => import("@/pages/PageNotFound"));
const LoginSignup = lazy(() => import("@/pages/LoginSignup"));

const routesConfig = [
  {
    path: "/",
    element: (
      <Suspense fallback={<SuspenseLoader fullHeight fullWidth />}>
        <LandingPage />
      </Suspense>
    ),
    index: true,
  },
  {
    path: "signup",
    element: (
      <Suspense fallback={<SuspenseLoader fullHeight fullWidth />}>
        <LoginSignup />
      </Suspense>
    ),
  },
  {
    path: "login",
    element: (
      <Suspense fallback={<SuspenseLoader fullHeight fullWidth />}>
        <LoginSignup isLogin />
      </Suspense>
    ),
  },
  {
    path: "get-started",
    element: (
      <Suspense fallback={<SuspenseLoader fullHeight fullWidth />}>
        <LoginSignup />
      </Suspense>
    ),
  },
  {
    path: "privacy",
    element: (
      <Suspense fallback={<SuspenseLoader fullHeight />}>
        <PrivacyPolicy />
      </Suspense>
    ),
  },
  {
    path: "terms",
    element: (
      <Suspense fallback={<SuspenseLoader fullHeight />}>
        <TermsOfService />
      </Suspense>
    ),
  },
  {
    path: "pricing",
    element: (
      <Suspense fallback={<SuspenseLoader fullHeight />}>
        <Pricing />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<SuspenseLoader fullHeight />}>
        <PageNotFound />
      </Suspense>
    ),
  },
];

export default function LandingLayout() {
  const routesElement = useRoutes(routesConfig);

  return (
    <>
      <title>GAIA</title>
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      {routesElement}
    </>
  );
}
