import HeroSection from "@/components/LandingPage/MainInfo";
import { ScrollArea } from "@/components/ui/scroll-area";
// import IntegrationCircles from "@/components/LandingPage/IntegrationCircles";
import ImagePreview from "@/components/LandingPage/ImagePreview";
// import TextInformation from "@/components/LandingPage/TextInformation";
// import WaitListButton from "@/components/LandingPage/WaitlistModal";
// import FeatureList from "@/components/LandingPage/FeatureList";
import FlowchartDemo from "@/components/LandingPage/FlowchartCreator";
import ImageGeneration from "@/components/LandingPage/ImageGeneration";
import Internet from "@/components/LandingPage/Internet";
import GoalSection from "@/components/LandingPage/GoalSection";
// import FeatureList from "@/components/LandingPage/FeatureList";
import FinalSection from "./FinalSection";
import Footer from "@/components/LandingPage/Footer";

export default function LandingPage() {
  return (
    <>
      <ScrollArea>
        <div className="landing_page relative select-none">
          <div className="fixed inset-0 bg-gradient-to-b from-[#00bbff30] to-black z-[-1] top-0 h-screen" />
          <HeroSection />
          <ImagePreview />
          <Internet />
          <GoalSection />
          <div className="w-screen flex justify-center min-h-screen items-center h-fit sm:pt-0 pt-[10vh]">
            <div className="flex sm:w-[80vw] w-screen sm:flex-row flex-col">
              <ImageGeneration />
              <FlowchartDemo />
            </div>
          </div>
          {/* <FeatureList /> */}

          {/* 
          <TextInformation
            alignleft={false}
            title={"Signup for our Waitlist!"}
            description={[
              "We'll be sending you an email once we launch.",
              "With exclusive perks such as a Pro subscription for free!",
            ]}
            button={
              <WaitListButton
                props={{ size: "lg", variant: "shadow", radius: "md" }}
                iconsize={21}
              />
            }
          />
          <IntegrationCircles /> */}
          <FinalSection />
          {/* <MadeBy /> */}
          <Footer />
        </div>
      </ScrollArea>
    </>
  );
}
