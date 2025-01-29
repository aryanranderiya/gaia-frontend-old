import { MagicCard } from "@/components/ui/magic-card";
import { FileUp } from "lucide-react";

function FeatureCard() {
  return (
    <MagicCard
      gradientFrom="#00bbff"
      gradientTo="#00bbff10"
      gradientColor="#00bbff30"
      className="p-5 !rounded-none bg-transparent"
      noRadius={true}
    >
      <div className="py-5 bg-transparent !rounded-none">
        <FileUp />
      </div>
      <div className="font-medium text-xl">Title</div>
      <div className="text-foreground-400 font-medium">Description</div>
      {/* </div> */}
    </MagicCard>
  );
}

export default function AllFeatures() {
  return (
    <div className="w-screen flex items-center min-h-screen justify-center my-20 flex-col">
      <div className="max-w-screen-xl w-full min-h-fit rounded-3xl p-10 overflow-hidden items-center grid grid-cols-4">
        <FeatureCard />
        <FeatureCard />
        <FeatureCard />
        <FeatureCard />
        <FeatureCard />
        <FeatureCard />
        <FeatureCard />
        <FeatureCard />
      </div>
    </div>
  );
}
