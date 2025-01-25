import { Suspense, lazy, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import SuspenseLoader from "@/components/SuspenseLoader";
import ImagePreview from "@/components/LandingPage/ImagePreview";
import HeroSection from "@/components/LandingPage/MainInfo";

const FeatureList = lazy(() => import("@/components/LandingPage/FeatureList"));
const FlowchartDemo = lazy(
  () => import("@/components/LandingPage/FlowchartCreator")
);
const Footer = lazy(() => import("@/components/LandingPage/Footer"));
const GoalSection = lazy(() => import("@/components/LandingPage/GoalSection"));
const ImageGeneration = lazy(
  () => import("@/components/LandingPage/ImageGeneration")
);
const Internet = lazy(() => import("@/components/LandingPage/Internet"));
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
        <div className="fixed inset-0 bg-gradient-to-b from-[#00bbff30] to-black z-[-1] top-0 h-screen" />

        <HeroSection />

        <ImagePreview />

        <Suspense fallback={<SuspenseLoader />}>
          <Internet />
        </Suspense>

        <Suspense fallback={<SuspenseLoader />}>
          <GoalSection />
        </Suspense>

        <div className="w-screen flex justify-center min-h-screen items-center h-fit sm:pt-0 pt-[10vh]">
          <div className="flex sm:w-[80vw] w-screen sm:flex-row flex-col">
            <Suspense fallback={<SuspenseLoader />}>
              <ImageGeneration />
            </Suspense>

            <Suspense fallback={<SuspenseLoader />}>
              <FlowchartDemo />
            </Suspense>
          </div>
        </div>
        <Suspense fallback={<SuspenseLoader />}>
          <FeatureList />
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
