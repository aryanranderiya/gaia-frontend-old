import { Dispatch, lazy, SetStateAction, Suspense } from "react";
import { useRoutes } from "react-router-dom";

import SuspenseLoader from "@/components/Misc/SuspenseLoader";
import LandingPage from "@/pages/Landing";

const Navbar = lazy(() => import("@/components/Landing/Navbar"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("@/pages/TermsOfService"));
const Contact = lazy(() => import("@/pages/Contact"));
const PageNotFound = lazy(() => import("@/pages/PageNotFound"));
const LoginSignup = lazy(() => import("@/pages/LoginSignup"));

export default function LandingLayout({
  setLoginModalOpen,
}: {
  setLoginModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  // Move routesConfig inside so we can pass the prop
  const routesConfig = [
    {
      path: "/",
      element: <LandingPage setLoginModalOpen={setLoginModalOpen} />,
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
        <Suspense fallback={<SuspenseLoader fullHeight fullWidth />}>
          <PrivacyPolicy />
        </Suspense>
      ),
    },
    {
      path: "terms",
      element: (
        <Suspense fallback={<SuspenseLoader fullHeight fullWidth />}>
          <TermsOfService />
        </Suspense>
      ),
    },
    {
      path: "pricing",
      element: (
        <Suspense fallback={<SuspenseLoader fullHeight fullWidth />}>
          <Pricing />
        </Suspense>
      ),
    },
    {
      path: "contact",
      element: (
        <Suspense fallback={<SuspenseLoader fullHeight fullWidth />}>
          <Contact />
        </Suspense>
      ),
    },
    {
      path: "*",
      element: (
        <Suspense fallback={<SuspenseLoader fullHeight fullWidth />}>
          <PageNotFound />
        </Suspense>
      ),
    },
  ];

  const routesElement = useRoutes(routesConfig);

  return (
    <>
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      {routesElement}
    </>
  );
}
