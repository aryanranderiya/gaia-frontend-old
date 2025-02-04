"use client";

import LandingPage1Layout from "@/layouts/LandingPage1";
import { Chip } from "@heroui/chip";
import { useEffect, useState } from "react";
import { SimpleChatBubbleUser } from "../../Chat/ChatBubbles/SimpleChatBubbles";
import { AiImageIcon } from "../../icons";

const imageOptions = [
  {
    title: "Golden Retriever",
    prompt: "cute, golden retriever",
    src: "/generated/golden_retriever.webp",
  },
  {
    title: "Mountains",
    prompt: "breathtaking, mountains, lake, realistic",
    src: "/generated/landscape.webp",
  },
  { title: "Car", prompt: "black porsche, sunset", src: "/generated/car.webp" },
  {
    title: "Abstract",
    prompt: "abstract, vibrant colors, geometric shapes",
    src: "/generated/abstract.webp",
  },
  // { title: "Husky", prompt: "cute, husky", src: "/generated/husky.webp" },
];

export default function ImageGeneration() {
  const [selectedOption, setSelectedOption] = useState(imageOptions[0]);

  useEffect(() => {
    imageOptions.forEach((option, index) => {
      setTimeout(() => {
        const img = new Image();
        img.src = option.src;
      }, 1000 * (index + 1));
    });
  }, []);

  return (
    <LandingPage1Layout
      heading="Generate Images"
      subheading="Create stunning & realistic images for free"
      icon={
        <AiImageIcon color="#ffffff90" className="sm:size-[30px] size-[30px]" />
      }
      extraHeading={
        <div className="flex flex-wrap gap-2">
          {imageOptions.map((option, index) => (
            <Chip
              key={index}
              onClick={() => setSelectedOption(option)}
              variant={selectedOption?.src === option.src ? "solid" : "flat"}
              color="primary"
              className="cursor-pointer"
            >
              {option.title}
            </Chip>
          ))}
        </div>
      }
    >
      <div className="w-full rounded-3xl">
        <SimpleChatBubbleUser hideMobile={true}>
          Generate Image: {selectedOption?.prompt}
        </SimpleChatBubbleUser>
        <div className="chat_bubble bg-zinc-800 !rounded-2xl !w-full">
          <div className="text-sm font-medium flex flex-col gap-2 min-w-full">
            <span>Generated Image:</span>
            <img
              src={selectedOption?.src}
              width={400}
              height={400}
              alt={selectedOption?.prompt || "Generated image"}
              className="rounded-3xl my-2 w-full"
            />
            <div className="flex gap-1 flex-wrap">
              {selectedOption.prompt.split(",").map((keyword, index) => (
                <Chip key={index} color="default" size="sm" radius="md">
                  {keyword.trim()}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      </div>
    </LandingPage1Layout>
  );
}
