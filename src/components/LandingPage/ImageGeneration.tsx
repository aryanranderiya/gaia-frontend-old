"use client";

import { useState } from "react";
import { Chip } from "@nextui-org/chip";

const imageOptions = [
  {
    prompt: "breathtaking, mountains, lake, realistic",
    src: "/generated/landscape.png",
  },
  {
    prompt: "black porsche, sunset",
    src: "/generated/car.png",
  },
  {
    prompt: "abstract, vibrant colors, geometric shapes",
    src: "/generated/abstract.png",
  },
  {
    prompt: "cute, golden retriever",
    src: "/generated/golden_retriever.png",
  },
  {
    prompt: "cute, husky",
    src: "/generated/husky.png",
  },
];

export default function ImageGeneration() {
  const [selectedOption, setSelectedOption] = useState<
    (typeof imageOptions)[0] | null
  >({
    prompt: "breathtaking, mountains, lake, realistic",
    src: "/generated/landscape.png",
  });

  const handleOptionClick = (option: (typeof imageOptions)[0]) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex items-center justify-center w-screen">
      <div className="flex flex-col items-start justify-center min-h-screen p-4 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Image Generation</h1>
          <div className="text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem,
            molestiae!
          </div>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {imageOptions.map((option, index) => (
            <Chip
              key={index}
              onClick={() => handleOptionClick(option)}
              variant={
                selectedOption?.src === option.src ? "solid" : "bordered"
              }
              color="primary"
              className="cursor-pointer"
            >
              {`Option ${index + 1}`}
            </Chip>
          ))}
        </div>

        <div className="chat_bubble bg-zinc-800 mt-4 ">
          <div className="text-sm font-medium w-full flex justify-start items-flex-start flex-col gap-2 flex-wrap max-w-[400px] my-1">
            <span>{"Generated Image:"}</span>

            {selectedOption && (
              <img
                src={selectedOption?.src}
                width={400}
                height={400}
                alt={selectedOption?.prompt || "Generated image"}
                className="rounded-3xl my-2"
              />
            )}
            {selectedOption && (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
