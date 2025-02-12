import { StickyNote01Icon } from "@/components/icons";
import LandingPage1Layout from "@/layouts/LandingPage1";

export default function Section_Notes() {
  return (
    <LandingPage1Layout
      heading="Your AI Assistant that remembers"
      subheading="Take Notes & Memories for the assistant to remember important details"
      icon={
        <StickyNote01Icon
          color="#9b9b9b"
          className="sm:size-[30px] size-[30px]"
        />
      }
      className="col-span-2"
    >
      hey there
    </LandingPage1Layout>
  );
}
