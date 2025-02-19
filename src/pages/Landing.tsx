import { Suspense, lazy, useEffect, useState } from "react";

import ImagePreview from "@/components/LandingPage/Sections/Hero_Image";
import HeroSection from "@/components/LandingPage/Sections/Hero_Section";
import SuspenseLoader from "@/components/SuspenseLoader";

const LazyLoadedSections = lazy(
  () => import("@/components/LandingPage/Sections/LazyLoadedSections")
);

export default function LandingPage() {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const img = new Image();

    img.src = "/landing/screenshot.png";
    img.decode();

    setTimeout(() => {
      setLoad(true);
    }, 200);

    document.documentElement.style.overflowY = "scroll";

    return () => {
      document.documentElement.style.overflowY = "auto";
    };
  }, []);

  // className = "landing_page relative select-none overflow-y-scroll";
  return (
    // <ScrollArea className="h-fit" type="scroll">
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-b bg-[#000000] z-[-1] top-0 h-screen" />

      <HeroSection />
      <ImagePreview />

      {load && (
        <Suspense fallback={<SuspenseLoader fullHeight />}>
          <LazyLoadedSections />
        </Suspense>
      )}
    </div>
    // {/* </ScrollArea> */}
  );
}
