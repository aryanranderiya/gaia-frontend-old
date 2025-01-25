import HeroSection from "@/components/LandingPage/MainInfo";
import { ScrollArea } from "@/components/ui/scroll-area";
// import IntegrationCircles from "@/components/LandingPage/IntegrationCircles";
import ImagePreview from "@/components/LandingPage/ImagePreview";
// import TextInformation from "@/components/LandingPage/TextInformation";
// import WaitListButton from "@/components/LandingPage/WaitlistModal";
// import FeatureList from "@/components/LandingPage/FeatureList";
import FlowchartDemo from "@/components/LandingPage/FlowchartCreater";
import ImageGeneration from "@/components/LandingPage/ImageGeneration";
import MadeBy from "@/components/LandingPage/MadeBy";
import Internet from "@/components/LandingPage/Internet";

export default function LandingPage() {
  return (
    <>
      <ScrollArea>
        <div className="landing_page relative">
          <div className="fixed inset-0 bg-gradient-to-b from-[#00bbff30] to-black z-[-1] top-0 h-screen"></div>
          <HeroSection />
          <ImagePreview />
          <ImageGeneration />
          <Internet />
          {/* <FeatureList /> */}
          <FlowchartDemo />

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
          <MadeBy />
        </div>
      </ScrollArea>
    </>
  );
}
