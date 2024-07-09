import { ScrollArea } from "../components/Shadcn/ScrollArea";
import MainInfo from "../components/LandingPage/MainInfo";
import IntegrationCircles from "../components/LandingPage/IntegrationCircles";
import ImagePreview from "../components/LandingPage/ImagePreview";
import ScrollingText from "../components/LandingPage/ScrollingText";
import TextInformation from "../components/LandingPage/TextInformation";
import WaitListButton from "../components/LandingPage/WaitlistModal";
import MadeBy from "../components/LandingPage/MadeBy";
import FeedbackFormBtn from "../components/FeedbackForm/FeedbackFormBtn";
import FeatureList from "../components/LandingPage/FeatureList";

export default function LandingPage() {
  return (
    <>
      <ScrollArea>
        <div className="landing_page">
          <MainInfo />
          <ImagePreview />
          {/* <ScrollingText /> */}
          <TextInformation
            title={"We're Looking for Feedback!"}
            description={[
              "Help us create the perfect AI assistant for you!",
              "Your feedback will be invaluable towards creating an assistant tailored to your needs.!",
            ]}
            button={
              <FeedbackFormBtn
                props={{ size: "lg", color: "primary", variant: "shadow" }}
              />
            }
          />

          <FeatureList />

          <TextInformation
            alignleft={false}
            title={"Signup for our Waitlist!"}
            description={[
              "We'll be sending you an email once we launch.",
              "With exclusive perks such as a Pro subscription for free!",
            ]}
            button={
              <WaitListButton props={{ size: "lg", variant: "shadow" }} />
            }
          />
          <IntegrationCircles />
          <MadeBy />
        </div>
      </ScrollArea>
    </>
  );
}
