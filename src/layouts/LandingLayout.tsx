import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import SuspenseLoader from "@/components/SuspenseLoader";

// Lazy-loaded components
const LandingPage = lazy(() => import("@/pages/Landing"));
const Navbar = lazy(() => import("@/components/LandingPage/misc/Navbar"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const TermsOfService = lazy(() => import("@/pages/PrivacyPolicy"));
const PrivacyPolicy = lazy(() => import("@/pages/TermsOfService"));
const PageNotFound = lazy(() => import("@/pages/PageNotFound"));
const LoginSignup = lazy(() => import("@/pages/LoginSignup"));

const routesConfig = [
  {
    path: "/",
    element: (
      <Suspense fallback={<SuspenseLoader fullHeight={true} />}>
        <LandingPage />
      </Suspense>
    ),
    index: true,
  },
  {
    path: "login",
    element: (
      <Suspense fallback={<SuspenseLoader fullHeight={true} />}>
        <LoginSignup isLogin={true} />
      </Suspense>
    ),
  },
  {
    path: "signup",
    element: (
      <Suspense fallback={<SuspenseLoader fullHeight={true} />}>
        <LoginSignup />
      </Suspense>
    ),
  },
  {
    path: "privacy",
    element: (
      <Suspense fallback={<SuspenseLoader fullHeight={true} />}>
        <PrivacyPolicy />
      </Suspense>
    ),
  },
  {
    path: "terms",
    element: (
      <Suspense fallback={<SuspenseLoader fullHeight={true} />}>
        <TermsOfService />
      </Suspense>
    ),
  },
  {
    path: "pricing",
    element: (
      <Suspense fallback={<SuspenseLoader fullHeight={true} />}>
        <Pricing />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<SuspenseLoader fullHeight={true} />}>
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
