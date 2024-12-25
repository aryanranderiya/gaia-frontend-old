import { ScrollArea } from "@/components/Shadcn/ScrollArea";
import MainInfo from "@/components/LandingPage/MainInfo";
import IntegrationCircles from "@/components/LandingPage/IntegrationCircles";
import ImagePreview from "@/components/LandingPage/ImagePreview";
import TextInformation from "@/components/LandingPage/TextInformation";
import WaitListButton from "@/components/LandingPage/WaitlistModal";
import MadeBy from "@/components/LandingPage/MadeBy";
import FeatureList from "@/components/LandingPage/FeatureList";

export default function LandingPage() {
  return (
    <>
      <ScrollArea>
        <div className="landing_page">
          <MainInfo />
          <ImagePreview />

          <FeatureList />

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
          <IntegrationCircles />
          <MadeBy />
        </div>
      </ScrollArea>
    </>
  );
}
