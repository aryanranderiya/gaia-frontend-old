import SuspenseLoader from "@/components/Misc/SuspenseLoader";
import { lazy, Suspense } from "react";
const Footer = lazy(() => import("@/components/Landing/Footer"));

const sections = [
  { name: "GoalSection", path: "GoalSection" },
  { name: "CalendarSection", path: "CalendarSection" },
  { name: "MemoriesSection", path: "MemoriesSection" },
  { name: "InternetSection", path: "InternetSection" },
  { name: "GridSection", path: "GridSection" },
  { name: "CapabilitiesSection", path: "CapabilitiesSection" },
  { name: "ComingSoonSection", path: "ComingSoonSection" },
  { name: "FinalSection", path: "ClosingSection" },
];

export default function LazyLoadedSections() {
  return (
    <div className="sm:space-y-[15rem] space-y-[5rem] sm:mt-[18rem] mt-[12rem]">
      {sections.map(({ name, path }) => {
        const SectionComponent = lazy(
          () => import(`@/components/Landing/Sections/${path}`)
        );

        return (
          <Suspense key={name} fallback={<SuspenseLoader />}>
            <SectionComponent />
          </Suspense>
        );
      })}

      <Suspense fallback={<SuspenseLoader />}>
        <Footer />
      </Suspense>
    </div>
  );
}
