import { Dispatch, lazy, SetStateAction, useEffect } from "react";

import HeroImage from "@/components/Landing/Sections/Hero_Image";
import HeroSection from "@/components/Landing/Sections/Hero_Section";

const LazyLoadedSections = lazy(
  () => import("@/components/Landing/Sections/LazyLoadedSections")
);

export default function LandingPage({
  setLoginModalOpen,
}: {
  setLoginModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  useEffect(() => {
    document.documentElement.style.overflowY = "scroll";

    return () => {
      document.documentElement.style.overflowY = "auto";
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-b bg-[#000000] z-[-1] top-0 h-screen" />

      <HeroSection />
      <HeroImage setLoginModalOpen={setLoginModalOpen} />

      <LazyLoadedSections />
    </div>
  );
}
