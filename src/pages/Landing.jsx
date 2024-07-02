import Navbar from "../components/LandingPage/Navbar";
import MainInfo from "../components/LandingPage/MainInfo";
import IntegrationCircles from "../components/LandingPage/IntegrationCircles";
import { ScrollArea } from "../components/ScrollArea";

export default function Landing() {
  return (
    <ScrollArea>
      <div className="landing_page">
        <Navbar />
        <MainInfo />
        <IntegrationCircles />
      </div>
    </ScrollArea>
  );
}
