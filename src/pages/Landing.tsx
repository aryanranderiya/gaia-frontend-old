import ImagePreview from "@/components/LandingPage/Sections/Hero_Image";
import HeroSection from "@/components/LandingPage/Sections/Hero_Section";
import SuspenseLoader from "@/components/SuspenseLoader";
import { Suspense, lazy, useEffect, useState } from "react";

const LazyLoadedSections = lazy(
  () => import("@/components/LandingPage/Sections/Sections_Lazy")
);

export default function LandingPage() {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/landing/screenshot.png";
    img.decode();

    setTimeout(() => {
      setLoad(true);
    }, 300);
  }, []);

  return (
    <div className="landing_page relative select-none overflow-y-scroll">
      <div className="fixed inset-0 bg-gradient-to-b bg-[#000000] z-[-1] top-0 h-screen" />

      <HeroSection />
      <ImagePreview />

      {load && (
        <Suspense fallback={<SuspenseLoader fullHeight />}>
          <LazyLoadedSections />
        </Suspense>
      )}
    </div>
  );
}
