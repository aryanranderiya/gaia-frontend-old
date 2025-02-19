import { Brain02Icon } from "@/components/icons";
import { AnimatedSection } from "../misc/AnimatedSection";
import { SectionHeading } from "../misc/SectionHeading";
import { Chip } from "@heroui/chip";
import {
  SimpleChatBubbleBot,
  SimpleChatBubbleUser,
} from "@/components/Chat/ChatBubbles/SimpleChatBubbles";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function LocalNotecard({ plaintext }: { plaintext: string }) {
  return (
    <div className="bg-zinc-950 hover:bg-zinc-800 hover:-translate-y-1 transition-all w-full max-h-fit rounded-xl text-foreground flex p-[1em] flex-col justify-start overflow-hidden gap-1 cursor-pointer h-full relative outline outline-2 outline-zinc-700">
      <Chip size="sm" variant="flat" color="primary" className="mb-1">
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
      <div className="max-w-screen-xl w-screen flex flex-row justify-evenly items-start sm:space-x-10 space-x-5 ">
        <SectionHeading
          className="w-full"
          heading={"An Assistant That Remembers"}
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
          icon={<Brain02Icon color="#9b9b9b" width={45} height={45} />}
        />

        <div className="w-full px-10 !mt-0">
          <Tabs defaultValue="chat1" className="h-[280px]">
            <TabsList className="w-full mb-6 rounded-full">
              <TabsTrigger className="rounded-full" value="chat1">
                Chat 1
              </TabsTrigger>
              <TabsTrigger className="rounded-full" value="chat2">
                Chat 2
              </TabsTrigger>
              <TabsTrigger
                value="notes"
                className="flex items-center gap-2 rounded-full"
              >
                <Brain02Icon color="#9b9b9b" />
                GAIA Memories
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat2" className="space-y-4">
              <SimpleChatBubbleUser>I am from England, UK</SimpleChatBubbleUser>

              <SimpleChatBubbleBot>
                Hello from across the globe. I see you're from England, UK. What
                brings you here today?
              </SimpleChatBubbleBot>
            </TabsContent>

            <TabsContent value="chat1" className="space-y-4">
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
