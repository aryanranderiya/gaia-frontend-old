import { Chip } from "@heroui/chip";

import { AnimatedSection } from "../AnimatedSection";
import { SectionHeading } from "../SectionHeading";

import { Brain02Icon } from "@/components/Misc/icons";
import {
  SimpleChatBubbleBot,
  SimpleChatBubbleUser,
} from "@/components/Chat/ChatBubbles/SimpleChatBubbles";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function LocalNotecard({ plaintext }: { plaintext: string }) {
  return (
    <div className="bg-zinc-950 hover:bg-zinc-800 hover:-translate-y-1 transition-all w-full max-h-fit rounded-xl text-foreground flex p-[1em] flex-col justify-start overflow-hidden gap-1 cursor-pointer h-full relative outline outline-2 outline-zinc-700">
      <Chip className="mb-1" color="primary" size="sm" variant="flat">
        Auto Created by GAIA
      </Chip>

      <div className="font-normal text-md whitespace-wrap overflow-hidden overflow-ellipsis min-h-7 max-h-[100px]">
        {plaintext}
      </div>
    </div>
  );
}

export default function Section_Memories() {
  return (
    <AnimatedSection className="w-screen justify-center items-center flex relative z-[1]">
      <div className="max-w-screen-xl w-screen flex sm:flex-row flex-col justify-evenly items-start sm:space-x-10 space-x-5 ">
        <SectionHeading
          className="w-full"
          heading={"An Assistant That Remembers"}
          icon={
            <Brain02Icon
              color="#9b9b9b"
              className="sm:w-[40px] w-[35px] sm:h-[40px] h-[40px]"
            />
          }
          subheading={
            <div>
              GAIA remembers what matters to you. Your preferences, past
              conversations, and important details are saved, so you don’t have
              to repeat yourself.
              <br />
              <br />
              You can also store notes for things you want GAIA to remember,
              making every chat feel more personalized and helpful.
            </div>
          }
        />

        <div className="w-full sm:px-10 !m-0 !mt-0">
          <Tabs
            className="w-full box-border sm:m-0 !m-0 px-4 h-[300px] overflow-hidden"
            defaultValue="chat1"
          >
            <TabsList className="w-full mb-6 rounded-full">
              <TabsTrigger className="rounded-full" value="chat1">
                Chat 1
              </TabsTrigger>
              <TabsTrigger className="rounded-full" value="chat2">
                Chat 2
              </TabsTrigger>
              <TabsTrigger
                className="flex items-center gap-2 rounded-full"
                value="notes"
              >
                <Brain02Icon color="#9b9b9b" />
                GAIA Memories
              </TabsTrigger>
            </TabsList>

            <TabsContent className="space-y-4" value="chat2">
              <SimpleChatBubbleUser>I am from England, UK</SimpleChatBubbleUser>

              <SimpleChatBubbleBot>
                Hello from across the globe. I see you're from England, UK. What
                brings you here today?
              </SimpleChatBubbleBot>
            </TabsContent>

            <TabsContent className="space-y-4" value="chat1">
              <SimpleChatBubbleUser>
                Hey GAIA! My name is Jake!
              </SimpleChatBubbleUser>

              <SimpleChatBubbleBot>
                Hello Jake! It's nice to meet you. How can I assist you today?
              </SimpleChatBubbleBot>

              <SimpleChatBubbleUser>Where am I from?</SimpleChatBubbleUser>

              <SimpleChatBubbleBot>
                You are from England, United Kingdom
              </SimpleChatBubbleBot>
            </TabsContent>

            <TabsContent value="notes">
              <div className="flex gap-3">
                <LocalNotecard plaintext={"My name is Jake"} />
                <LocalNotecard plaintext={"I was born in England, UK"} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AnimatedSection>
  );
}
