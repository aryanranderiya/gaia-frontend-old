import { useState } from "react";
import {
  SimpleChatBubbleBot,
  SimpleChatBubbleUser,
} from "../Chat/ChatBubbles/SimpleChatBubbles";
import { InternetIcon } from "../icons";

function SearchWeb() {
  return (
    <>
      <SimpleChatBubbleUser>
        <div className="relative max-w-fit min-w-min inline-flex items-center justify-between box-border whitespace-nowrap px-1 h-7 text-small rounded-full bg-default/40 text-default-700 mb-2">
          <span className="flex-1 text-inherit font-normal px-2 pr-1">
            <div className="flex items-center gap-1 font-medium text-white">
              Searching the Web
            </div>
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="22"
            fill="white"
            color="transparent"
            className="max-h-[80%] mr-1"
          >
            <path
              d="M3 12C7.5 12 12 7.5 12 3C12 7.5 16.5 12 21 12C16.5 12 12 16.5 12 21C12 16.5 7.5 12 3 12Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linejoin="round"
            ></path>
            <path
              d="M2 19.5C2.83333 19.5 4.5 17.8333 4.5 17C4.5 17.8333 6.16667 19.5 7 19.5C6.16667 19.5 4.5 21.1667 4.5 22C4.5 21.1667 2.83333 19.5 2 19.5Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linejoin="round"
            ></path>
            <path
              d="M16 5C17 5 19 3 19 2C19 3 21 5 22 5C21 5 19 7 19 8C19 7 17 5 16 5Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linejoin="round"
            ></path>
          </svg>
        </div>
        <div className="flex text-wrap max-w-[30vw]">What is Deep Seek?</div>
      </SimpleChatBubbleUser>

      <SimpleChatBubbleBot>
        <div className="flex flex-col gap-3">
          <div className="relative max-w-fit min-w-min inline-flex items-center justify-between box-border whitespace-nowrap px-1 h-7 text-small rounded-full bg-primary/20 text-primary-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="20"
              color="#00bbff"
              fill="none"
              className="max-h-[80%]"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="1.5"
              ></circle>
              <ellipse
                cx="12"
                cy="12"
                rx="4"
                ry="10"
                stroke="currentColor"
                stroke-width="1.5"
              ></ellipse>
              <path
                d="M2 12H22"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            <span className="flex-1 text-inherit font-normal px-2 pl-1">
              <div className="font-medium flex items-center gap-1 text-primary">
                Live Search Results from the Web
              </div>
            </span>
          </div>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              DeepSeek is a Chinese AI start-up that has developed a new AI
              system that can match the capabilities of cutting-edge chatbots
              from companies like OpenAI and Google. DeepSeek-V3 is an
              open-weight large language model that leverages a Mixture of
              Experts (MoE) architecture, designed to enhance efficiency and
              performance. It has achieved a significant breakthrough in ...
            </p>
          </div>
        </div>
      </SimpleChatBubbleBot>
      <span className="text-xs text-white text-opacity-40 flex flex-col p-1 relative bottom-2">
        10:37 PM 25th Jan 2025
      </span>
    </>
  );
}

function FetchWebpage() {
  return (
    <>
      <SimpleChatBubbleUser>
        <div className="relative max-w-fit min-w-min inline-flex items-center justify-between box-border whitespace-nowrap px-1 h-7 text-small rounded-full bg-default/40 text-default-700 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-arrow-up-right max-h-[80%]"
          >
            <path d="M7 7h10v10"></path>
            <path d="M7 17 17 7"></path>
          </svg>
          <span className="flex-1 text-inherit font-normal px-2 pl-1">
            <div className="flex items-center gap-1 text-white ">
              Fetching
              <a
                href="https://www.heroui.com/docs/components/modal"
                className="!text-white font-medium hover:!text-black transition-colors"
                target="_blank"
              >
                www.heroui.com/docs/components/modal{" "}
              </a>
            </div>
          </span>
        </div>
        What is on this webpage? How can I create a Modal using HeroUI?
      </SimpleChatBubbleUser>

      <SimpleChatBubbleBot>
        <div className="relative max-w-fit min-w-min inline-flex items-center justify-between box-border whitespace-nowrap px-1 h-7 text-small rounded-full bg-primary/20 text-primary-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#00bbff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-arrow-up-right max-h-[80%]"
          >
            <path d="M7 7h10v10"></path>
            <path d="M7 17 17 7"></path>
          </svg>
          <span className="flex-1 text-inherit font-normal px-2 pl-1">
            <div className="font-medium flex items-center gap-1 text-primary">
              Fetched
              <a
                href="https://www.heroui.com/docs/components/modal"
                className="!text-[#00bbff] font-medium hover:!text-white transition-colors"
                target="_blank"
              >
                www.heroui.com/docs/components/modal{" "}
              </a>
            </div>
          </span>
        </div>
        <div className="mt-3 max-w-[500px]">
          The webpage appears to be the documentation for HeroUI (previously
          NextUI), a React UI library. It provides information on how to create
          a modal using HeroUI. To create a modal using HeroUI, you can use the
          Modal component and its related components, such as ModalContent,
          ModalHeader, ModalBody, and ModalFooter. Here is an example of how to
          create a basic modal:
        </div>
      </SimpleChatBubbleBot>
    </>
  );
}

export default function Internet() {
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);

  return (
    <div className="w-screen flex items-center flex-col space-y-20 min-h-screen justify-center">
      <div className="text-6xl font-bold flex items-center gap-4">
        Use the Internet
        <InternetIcon color="#ffffff80" width={55} height={55} />
      </div>

      <div className="justify-around flex gap-11">
        <div
          className={`w-[35vw] space-y-3 bg-black rounded-3xl p-5 hover:bg-[#00bbff40] transition-all hover:scale-105 hover:w-[40vw] ${
            hover2 ? "opacity-40" : "opacity-100"
          }`}
          onMouseOver={() => setHover1(true)}
          onMouseOut={() => setHover1(false)}
        >
          <div className="text-center mb-6 p-5">
            <div className="font-medium text-3xl ">Search The Web</div>
            <div className="text-foreground-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Similique, molestias.
            </div>
          </div>
          <SearchWeb />
        </div>

        <div
          className={`w-[35vw] space-y-3 bg-black rounded-3xl p-5 hover:bg-[#00bbff40] transition-all hover:scale-105 hover:w-[40vw] ${
            hover1 ? "opacity-40" : "opacity-100"
          }`}
          onMouseOver={() => setHover2(true)}
          onMouseOut={() => setHover2(false)}
        >
          <div className="text-center mb-6 p-5">
            <div className="font-medium text-3xl ">
              Chat with content from a webpage
            </div>
            <div className="text-foreground-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Similique, molestias.
            </div>
          </div>
          <FetchWebpage />
        </div>
      </div>
    </div>
  );
}
