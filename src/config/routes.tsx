import { lazy, Suspense } from "react";

import SuspenseLoader from "@/components/SuspenseLoader";

const MainInterface = lazy(() => import("@/pages/MainInterface"));
const LandingLayout = lazy(() => import("@/layouts/LandingLayout"));

const routes = [
  {
    path: "/try/*",
    element: (
      <Suspense fallback={<SuspenseLoader fullHeight />}>
        <MainInterface />
      </Suspense>
    ),
  },
  {
    path: "/*",
    element: (
      <Suspense fallback={<SuspenseLoader fullHeight fullWidth />}>
        <LandingLayout />
      </Suspense>
    ),
  },
];

export default routes;
