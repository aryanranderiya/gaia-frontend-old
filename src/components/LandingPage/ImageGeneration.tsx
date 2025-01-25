"use client";

import { Chip } from "@nextui-org/chip";
import { useState } from "react";
import { SimpleChatBubbleUser } from "../Chat/ChatBubbles/SimpleChatBubbles";
import { AiImageIcon } from "../icons";
import { SectionHeading } from "./SectionHeading";

const imageOptions = [
  {
    title: "Golden Retriever",
    prompt: "cute, golden retriever",
    src: "/generated/golden_retriever.png",
  },
  {
    title: "Mountains",
    prompt: "breathtaking, mountains, lake, realistic",
    src: "/generated/landscape.png",
  },
  {
    title: "Car",
    prompt: "black porsche, sunset",
    src: "/generated/car.png",
  },
  {
    title: "Abstract",
    prompt: "abstract, vibrant colors, geometric shapes",
    src: "/generated/abstract.png",
  },

  {
    title: "Husky",
    prompt: "cute, husky",
    src: "/generated/husky.png",
  },
];

export default function ImageGeneration() {
  const [selectedOption, setSelectedOption] = useState<
    (typeof imageOptions)[0] | null
  >(imageOptions[0]);

  const handleOptionClick = (option: (typeof imageOptions)[0]) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex items-center justify-center w-screen">
      <div className="flex flex-row justify-center items-center min-h-screen p-4 gap-16">
        <div className="flex items-start flex-col justify-center h-full gap-5">
          <SectionHeading
            heading={"Image Generation"}
            subheading={
              "Create stunning images for free with cutting-edge AI, powered by Stable Diffusion."
            }
            icon={<AiImageIcon color="#ffffff90" width={45} height={45} />}
          />
          <div className="flex flex-wrap gap-2 justify-start">
            {imageOptions.map((option, index) => (
              <Chip
                key={index}
                onClick={() => handleOptionClick(option)}
                variant={selectedOption?.src === option.src ? "solid" : "flat"}
                color="primary"
                size="lg"
                className="cursor-pointer"
              >
                {option.title}
              </Chip>
            ))}
          </div>

          <div className="w-full justify-center flex h-full">
            <img
              src="/landing/try_it_out.png"
              alt="Try it out"
              className="size-[100px] object-contain -rotate-12 relative right-7 top-7 opacity-90"
            />
          </div>
        </div>

        <div className="w-[30vw] bg-black p-10 rounded-3xl">
          <SimpleChatBubbleUser>
            Generate Image: {selectedOption?.prompt}
          </SimpleChatBubbleUser>
          <div className="chat_bubble bg-zinc-800 mt-4 !rounded-2xl">
            <div className="text-sm font-medium w-full flex justify-start items-flex-start flex-col gap-2 flex-wrap max-w-[400px] my-1">
              <span>{"Generated Image:"}</span>

              {selectedOption && (
                <>
                  <img
                    src={selectedOption?.src}
                    width={400}
                    height={400}
                    alt={selectedOption?.prompt || "Generated image"}
                    className="rounded-3xl my-2"
                  />
                  <div className="flex gap-1 justify-start flex-wrap max-w-[400px]">
                    {selectedOption.prompt.split(",").map((keyword, index) => (
                      <Chip
                        key={index}
                        color="default"
                        size="sm"
                        radius="md"
                        className="text-wrap min-h-fit py-1"
                      >
                        {keyword.trim()}
                      </Chip>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
