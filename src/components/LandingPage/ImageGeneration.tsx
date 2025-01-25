"use client";

import { Chip } from "@nextui-org/chip";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    // Preload images
    imageOptions.forEach((option) => {
      const img = new Image();
      img.src = option.src;
    });
  }, []);

  // <div className="h-[80vh] flex flex-col justify-around items-center gap-5 w-full">

  //  <div className="h-[80vh] flex flex-col justify-around items-center gap-5 w-full p-4">
  //     <div className="flex items-start flex-col justify-center gap-5">
  //       <SectionHeading
  //         heading={"Create flowcharts with ease"}
  //         subheading={
  //           "Turn ideas into clear, interactive visuals instantly—using Mermaid"
  //         }
  //         icon={<FlowchartIcon color="#ffffff90" width={45} height={45} />}
  //       />
  //     </div>

  return (
    <div className="sm:h-[80vh] h-screen flex flex-col justify-start items-center gap-16 w-full p-4">
      <div className="flex items-start flex-col justify-start gap-5 relative min-h-32">
        <SectionHeading
          heading={"Image Generation"}
          subheading={
            "Create stunning images for free with cutting-edge AI, powered by Stable Diffusion."
          }
          icon={
            <AiImageIcon
              color="#ffffff90"
              className="sm:size-[45px] size-[35px]"
            />
          }
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

        <div className="w-full sm:justify-start justify-end flex h-full absolute left-10 top-36 pointer-events-none">
          <img
            src="/landing/try_it_out.png"
            alt="Try it out"
            className="size-[100px] object-contain -rotate-12  opacity-90 sm:right-0 right-14 relative sm:top-0 top-7 pointer-events-none"
          />
        </div>
      </div>
      <div className="sm:w-[65%] w-full bg-black sm:p-10 p-3 rounded-3xl">
        <SimpleChatBubbleUser hideMobile={true}>
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
  );
}
