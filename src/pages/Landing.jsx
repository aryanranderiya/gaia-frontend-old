import { ScrollArea } from "../components/ScrollArea";
import { ReactLenis } from "@studio-freight/react-lenis";
import Navbar from "../components/LandingPage/Navbar";
import MainInfo from "../components/LandingPage/MainInfo";
import IntegrationCircles from "../components/LandingPage/IntegrationCircles";
import ImagePreview from "../components/LandingPage/ImagePreview";
import ScrollingText from "../components/LandingPage/ScrollingText";
import { Route, Routes } from "react-router-dom";
import FeedbackForm from "./FeedbackForm";
import PageNotFound from "./PageNotFound";

export default function Landing() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          index
          element={
            <>
              <ReactLenis root>
                <ScrollArea>
                  <div className="landing_page">
                    <MainInfo />
                    <ImagePreview />
                    <ScrollingText />
                    <IntegrationCircles />
                  </div>
                </ScrollArea>
              </ReactLenis>
            </>
          }
        />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}
