import SuspenseLoader from "@/components/Misc/SuspenseLoader";
import { lazy, Suspense } from "react";

const sections = {
  GoalSection: lazy(() => import("@/components/Landing/Sections/GoalSection")),
  CalendarSection: lazy(
    () => import("@/components/Landing/Sections/CalendarSection")
  ),
  MemoriesSection: lazy(
    () => import("@/components/Landing/Sections/MemoriesSection")
  ),
  InternetSection: lazy(
    () => import("@/components/Landing/Sections/InternetSection")
  ),
  GridSection: lazy(
    () => import("@/components/Landing/Sections/FeatureGridSection")
  ),
  CapabilitiesSection: lazy(
    () => import("@/components/Landing/Sections/CapabilitiesSection")
  ),
  ComingSoonSection: lazy(
    () => import("@/components/Landing/Sections/ComingSoonSection")
  ),
  FinalSection: lazy(
    () => import("@/components/Landing/Sections/FinalSection")
  ),
  Footer: lazy(() => import("@/components/Landing/Footer")),
};

export default function LazyLoadedSections() {
  return (
    <div className="sm:space-y-[15rem] space-y-[5rem] sm:mt-[18rem] mt-[12rem]">
      {Object.entries(sections).map(([name, Component]) => (
        <Suspense key={name} fallback={<SuspenseLoader />}>
          <Component />
        </Suspense>
      ))}
    </div>
  );
}
