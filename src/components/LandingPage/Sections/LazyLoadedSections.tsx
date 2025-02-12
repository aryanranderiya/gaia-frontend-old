import SuspenseLoader from "@/components/SuspenseLoader";
import { lazy, Suspense } from "react";
import Section_Calendar from "./Section_Calendar";
import Section_Memories from "./Section_Memories";

const Section_Grid = lazy(
  () => import("@/components/LandingPage/Sections/Section_Grid")
);

const FreePricing = lazy(
  () => import("@/components/LandingPage/Sections/Free_Pricing")
);

const WhatCanYouDo = lazy(
  () => import("@/components/LandingPage/Sections/Section_WhatCanYouDo")
);

const TargetAudience = lazy(
  () => import("@/components/LandingPage/Sections/Section_TargetAudience")
);

const ComingSoon = lazy(
  () => import("@/components/LandingPage/Sections/Section_ComingSoon")
);

const Footer = lazy(() => import("@/components/LandingPage/misc/Footer"));

const GoalSection = lazy(
  () => import("@/components/LandingPage/Sections/Section_Goal")
);

const Internet = lazy(
  () => import("@/components/LandingPage/Sections/Section_Internet")
);

const FinalSection = lazy(
  () => import("@components/LandingPage/Sections/FinalSection")
);

export default function LazyLoadedSections() {
  return (
    <>
      <Suspense fallback={<SuspenseLoader />}>
        <WhatCanYouDo />
      </Suspense>

      <Section_Calendar />

      <Section_Memories />

      <Suspense fallback={<SuspenseLoader />}>
        <Internet />
      </Suspense>

      <Suspense fallback={<SuspenseLoader />}>
        <GoalSection />
      </Suspense>

      <Suspense fallback={<SuspenseLoader />}>
        <Section_Grid />
      </Suspense>
      {/* 
      <Suspense fallback={<SuspenseLoader />}>
        <AllFeatures />
      </Suspense> */}
      {/* 
      <Suspense fallback={<SuspenseLoader />}>
        <TargetAudience />
      </Suspense> */}

      <FreePricing />

      <Suspense fallback={<SuspenseLoader />}>
        <ComingSoon />
      </Suspense>

      <Suspense fallback={<SuspenseLoader />}>
        <FinalSection />
      </Suspense>

      <Suspense fallback={<SuspenseLoader />}>
        <Footer />
      </Suspense>
    </>
  );
}
