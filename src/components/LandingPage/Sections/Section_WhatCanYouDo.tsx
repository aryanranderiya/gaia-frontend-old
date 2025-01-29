import {
  BlushBrush02Icon,
  BubbleConversationChatIcon,
  Calendar01Icon,
  DocumentAttachmentIcon,
  GlobalSearchIcon,
  StickyNote01Icon,
  Target02Icon,
} from "@/components/icons";
import { MagicCard } from "@/components/ui/magic-card";

function FeatureCard({
  feature,
}: {
  feature: { icon: JSX.Element; title: string; description: string };
}) {
  return (
    <MagicCard
      gradientFrom="#00bbff"
      gradientTo="#00bbff10"
      gradientColor="#00bbff30"
      className="p-5 !rounded-none bg-transparent !w-full"
      noRadius={true}
    >
      <div className=" items-center flex justify-center flex-col min-w-full w-full">
        <div className="py-5 bg-transparent !rounded-none">{feature.icon}</div>
        <div className="font-medium text-md">{feature.title}</div>
        <div className="text-foreground-400 font-medium">
          {feature.description}
        </div>
      </div>
    </MagicCard>
  );
}

export default function WhatCanYouDo() {
  const features = [
    {
      icon: <BubbleConversationChatIcon />,
      title: "Smart Conversations",
      description: "test",
    },
    {
      icon: <BlushBrush02Icon />,
      title: "Generate Images",
      description: "test",
    },
    {
      icon: <Calendar01Icon />,
      title: "Calendar Management",
      description: "test",
    },
    {
      icon: <Calendar01Icon />,
      title: "Store Memories",
      description: "test",
    },
    {
      icon: <StickyNote01Icon />,
      title: "Take Notes",
      description: "test",
    },
    {
      icon: <Target02Icon />,
      title: "Manage Goals",
      description: "test",
    },
    {
      icon: <DocumentAttachmentIcon />,
      title: "Understand Documents",
      description: "test",
    },
    {
      icon: <GlobalSearchIcon />,
      title: "Use the Internet",
      description: "test",
    },
  ];

  return (
    <div className="w-screen flex items-center min-h-screen mt-[20vh] justify-center flex-col">
      <div className="font-medium text-xl">What can GAIA do for you?</div>
      <div className="max-w-screen-lg w-full min-h-fit rounded-3xl p-10 items-center grid grid-cols-4 relative">
        <div className="h-full w-full absolute top-0 flex justify-start flex-col items-center pointer-events-none">
          <div className="size-[250px] blur-[100px] bg-[#00bbff] z-[-1] relative top-[40px]"></div>
        </div>

        {/* <div className="absolute inset-0">
          <img src="landing/sphere.png" />
        </div> */}
        {features.map((feature) => (
          <FeatureCard feature={feature} />
        ))}
      </div>
      <div className="text-md text-foreground-500">and much more...</div>
    </div>
  );
}
