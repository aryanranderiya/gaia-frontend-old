// src/routes/mainRoutes.tsx
import { Suspense, lazy } from "react";

import SuspenseLoader from "@/components/Misc/SuspenseLoader";
import Emails from "@/pages/Email";

const MainChat = lazy(() => import("@/pages/MainChat"));
const Explore = lazy(() => import("@/pages/Explore"));
const Calendar = lazy(() => import("@/components/Calendar/Calendar"));
const Pins = lazy(() => import("@/pages/Pins"));
const Notes = lazy(() => import("@/pages/Notes"));
const NotesAdd = lazy(() => import("@/pages/NotePage"));
const Goals = lazy(() => import("@/pages/Goals"));
const GoalPage = lazy(() => import("@/pages/GoalPage"));
const Search = lazy(() => import("@/components/Search/Search"));
// const LandingLayout = lazy(() => import("@/layouts/LandingLayout"));

export const mainRoutes = [
  { path: "c/:convoIdParam", element: <MainChat /> },
  { path: "c", element: <MainChat /> },
  {
    path: "explore",
    element: (
      <Suspense fallback={<SuspenseLoader fullHeight />}>
        <Explore />
      </Suspense>
    ),
  },
  {
    path: "calendar",
    element: (
      <Suspense fallback={<SuspenseLoader fullHeight />}>
        <Calendar />
      </Suspense>
    ),
  },
  {
    path: "email",
    element: (
      <Suspense fallback={<SuspenseLoader fullHeight />}>
        <Emails />
      </Suspense>
    ),
  },
  {
    path: "pins",
    element: (
      <Suspense fallback={<SuspenseLoader fullHeight />}>
        <Pins />
      </Suspense>
    ),
  },
  {
    path: "notes",
    element: (
      <Suspense fallback={<SuspenseLoader fullHeight />}>
        <Notes />
      </Suspense>
    ),
  },
  {
    path: "notes/add",
    element: (
      <Suspense fallback={<SuspenseLoader fullHeight />}>
        <NotesAdd />
      </Suspense>
    ),
  },
  {
    path: "notes/:id",
    element: (
      <Suspense fallback={<SuspenseLoader fullHeight />}>
        <NotesAdd />
      </Suspense>
    ),
  },
  {
    path: "goals",
    element: (
      <Suspense fallback={<SuspenseLoader fullHeight />}>
        <Goals />
      </Suspense>
    ),
  },
  {
    path: "goals/:goalId",
    element: (
      <Suspense fallback={<SuspenseLoader fullHeight />}>
        <GoalPage />
      </Suspense>
    ),
  },
  {
    path: "search",
    element: (
      <Suspense fallback={<SuspenseLoader fullHeight />}>
        <Search />
      </Suspense>
    ),
  },
  // {
  //   path: "*",
  //   element: (
  //     <Suspense fallback={<SuspenseLoader fullHeight />}>
  //       <LandingLayout />
  //     </Suspense>
  //   ),
  // },
];
