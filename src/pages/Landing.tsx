import ImagePreview from "@/components/LandingPage/Sections/Hero_Image";
import HeroSection from "@/components/LandingPage/Sections/Hero_Section";
import SuspenseLoader from "@/components/SuspenseLoader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Suspense, lazy, useEffect } from "react";

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

const FinalSection = lazy(() => import("./FinalSection"));

export default function LandingPage() {
  useEffect(() => {
    const img = new Image();
    img.src = "/landing/screenshot.png";
    img.decode(); // Hint to browser to decode image early
  }, []);

  return (
    <ScrollArea>
      <div className="landing_page relative select-none">
        <div className="fixed inset-0 bg-gradient-to-b bg-[#000000] z-[-1] top-0 h-screen" />

        <HeroSection />
        <ImagePreview />

        {/* <TheSearchForAssistants /> */}
        <Suspense fallback={<SuspenseLoader />}>
          <WhatCanYouDo />
        </Suspense>

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

        <Suspense fallback={<SuspenseLoader />}>
          <TargetAudience />
        </Suspense>

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
      </div>
    </ScrollArea>
  );
}
