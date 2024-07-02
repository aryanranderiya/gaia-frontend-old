import { ScrollArea } from "../components/ScrollArea";
import { ReactLenis } from "@studio-freight/react-lenis";
import Navbar from "../components/LandingPage/Navbar";
import MainInfo from "../components/LandingPage/MainInfo";
import IntegrationCircles from "../components/LandingPage/IntegrationCircles";
import ImagePreview from "../components/LandingPage/ImagePreview";
import ScrollingText from "../components/LandingPage/ScrollingText";
import ReviewForm from "../components/LandingPage/ReviewForm";

export default function Landing() {
  return (
    <ReactLenis root>
      <ScrollArea>
        <div className="landing_page">
          <Navbar />
          <MainInfo />
          <ImagePreview />
          <ScrollingText />
          <IntegrationCircles />
          <ReviewForm />
        </div>
      </ScrollArea>
    </ReactLenis>
  );
}
