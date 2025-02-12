import { FileUploadIcon } from "@/components/icons";
// import { MagicCard } from "@/components/ui/magic-card";
import LandingPage1Layout from "@/layouts/LandingPage1";

export default function Section_Document() {
  return (
    // <MagicCard
    //   gradientFrom="#00bbff"
    //   gradientTo="#00bbff70"
    //   gradientColor="#00bbff40"
    // >
    <LandingPage1Layout
      heading={"Chat with Documents"}
      subheading={"..."}
      icon={
        <FileUploadIcon
          color="#9b9b9b"
          className="sm:size-[30px] size-[30px]"
        />
      }
    >
      update this
    </LandingPage1Layout>
    // </MagicCard>
  );
}
