import {
  BubbleChatIcon,
  BubbleConversationChatIcon,
  PinIcon,
} from "@/components/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LandingPage1Layout from "@/layouts/LandingPage1";
import { PinCard } from "@/pages/Pins";
import { SearchIcon, Star } from "lucide-react";

const dummyMessages = [
  {
    searchWeb: true,
    response: "This is a message with a web search link.",
    date: new Date(),
    type: "bot",
    message_id: "1",
  },
  {
    searchWeb: false,
    pageFetchURL: "https://google.com",
    response: "This is a message with a fetched webpage.",
    date: new Date(),
    type: "user",
    message_id: "2",
  },
];

import { StickyNote01Icon, Tick02Icon } from "@/components/icons";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { useState } from "react";

const dummyResults = {
  conversations: [
    { id: 1, name: "Project Discussion - AI Roadmap" },
    { id: 2, name: "Customer Support - Issue #2345" },
    { id: 3, name: "Weekly Standup Meeting" },
    { id: 4, name: "AI Model Training Insights" },
    { id: 5, name: "Future Features Brainstorming" },
  ],
  messages: [
    { id: 1, content: "Can you summarize this document?" },
    { id: 2, content: "What are the key insights from last week's report?" },
    { id: 3, content: "Generate an email draft for the client proposal." },
    { id: 4, content: "What's the sentiment analysis of this feedback?" },
    { id: 5, content: "Translate this text into French." },
    { id: 6, content: "Find similar conversations to this topic." },
    { id: 7, content: "Schedule a meeting for next Monday." },
    { id: 8, content: "Summarize today's discussion in bullet points." },
    { id: 9, content: "Give me a short bio of Alan Turing." },
    { id: 10, content: "Draft a response for this inquiry." },
  ],
  notes: [
    { id: 1, title: "Key takeaways from AI Conference 2024" },
    { id: 2, title: "To-Do List for Machine Learning Model Update" },
    { id: 3, title: "Important Metrics for Performance Analysis" },
    { id: 4, title: "Checklist for AI Deployment Best Practices" },
    { id: 5, title: "Meeting Notes - Strategy Planning" },
    { id: 6, title: "Pros and Cons of Using GPT Models" },
    { id: 7, title: "Quick Guide to Prompt Engineering" },
    { id: 8, title: "Common Issues in NLP and Their Solutions" },
  ],
};

export function DummySearchCommand() {
  const [searchQuery, setSearchQuery] = useState("");
  const [chipsVisibility, setChipsVisibility] = useState({
    messages: true,
    conversations: true,
    notes: true,
  });

  const handleChipClick = (type: "messages" | "conversations" | "notes") => {
    setChipsVisibility((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div className="rounded-md overflow-hidden">
      <Command>
        <CommandInput
          placeholder="Search for messages..."
          value={searchQuery}
          onValueChange={setSearchQuery}
        />

        {searchQuery && (
          <div className="flex gap-1 p-2 bg-zinc-900 text-sm text-foreground-500 items-center font-medium">
            <Chip
              className="cursor-pointer"
              startContent={
                <BubbleChatIcon
                  color={chipsVisibility.messages ? "#000000" : "#9b9b9b"}
                />
              }
              variant={chipsVisibility.messages ? "solid" : "faded"}
              color={chipsVisibility.messages ? "primary" : "default"}
              onClick={() => handleChipClick("messages")}
              endContent={
                chipsVisibility.messages ? (
                  <Tick02Icon color="#000" />
                ) : undefined
              }
            >
              Messages
            </Chip>
            <Chip
              className="cursor-pointer"
              startContent={
                <StickyNote01Icon
                  color={chipsVisibility.notes ? "#000000" : "#9b9b9b"}
                />
              }
              variant={chipsVisibility.notes ? "solid" : "faded"}
              color={chipsVisibility.notes ? "primary" : "default"}
              onClick={() => handleChipClick("notes")}
              endContent={
                chipsVisibility.notes ? <Tick02Icon color="#000" /> : undefined
              }
            >
              Notes
            </Chip>
          </div>
        )}

        <CommandList className="bg-zinc-900">
          {chipsVisibility.messages && (
            <>
              <CommandGroup heading="Messages">
                {dummyResults.messages.map((message) => (
                  <CommandItem key={message.id}>{message.content}</CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}
          {chipsVisibility.conversations && (
            <>
              <CommandGroup heading="Conversations">
                {dummyResults.conversations.map((conversation) => (
                  <CommandItem key={conversation.id}>
                    {conversation.name}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}

          {chipsVisibility.notes && (
            <CommandGroup heading="Notes">
              {dummyResults.notes.map((note) => (
                <CommandItem key={note.id}>{note.title}</CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>

        {/* <div className="text-sm text-center p-2 bg-zinc-900 inline-flex gap-2 items-center justify-center text-foreground-500">
          <Lightbulb className="size-[20px] text-white relative left-1" />
          Tip: Hit
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 bg-zinc-600 text-white">
            <span className="text-xs">⌘</span>K
          </kbd>
          to open this Command Menu
        </div> */}
      </Command>
    </div>
  );
}

export function SidebarComponent() {
  const sections = [
    {
      starred: true,
      title: "Starred Chats",
      conversations: [
        { name: "How do I start a blog?", active: true, starred: true },
        { name: "Explain quantum computing", starred: true, active: false },
      ],
    },
    {
      title: "Today",
      conversations: [
        { name: "Help me debug this code", active: false, starred: false },
        {
          name: "Best practices for UI design?",
          active: false,
          starred: false,
        },
      ],
    },
    {
      title: "Yesterday",
      conversations: [
        { name: "Optimize my SQL query", active: false, starred: false },
        { name: "How does recursion work?", active: false, starred: false },
      ],
    },
    {
      title: "Last 30 Days",
      conversations: [
        {
          name: "How do neural networks learn?",
          active: false,
          starred: false,
        },
        {
          name: "Generate a daily workout plan",
          active: false,
          starred: false,
        },
      ],
    },
  ];

  return (
    <div className="mt-7">
      {sections.map((section, index) => (
        <div
          key={index}
          className={`${
            section.starred ? "bg-zinc-900" : ""
          } min-h-fit pt-3 pb-1 mt-2 flex items-start justify-start rounded-lg flex-col overflow-hidden w-full`}
        >
          <div className="font-medium text-xs flex items-center gap-1 px-3 pb-1">
            {section.title}
          </div>
          <div className="flex w-full px-1 flex-col">
            {section.conversations.map((chat, chatIndex) => (
              <Button
                key={chatIndex}
                variant="light"
                color={chat?.active ? "primary" : "default"}
                className="w-full flex justify-start pr-0 pl-2 h-[35px] min-h-[35px]"
                radius="sm"
                startContent={
                  chat.starred ? (
                    <Star
                      width="19"
                      className="min-w-[17px] w-[17px]"
                      color={chat?.active ? "#00bbff" : "#9b9b9b"}
                    />
                  ) : (
                    <BubbleConversationChatIcon
                      width="19"
                      className="min-w-[17px] w-[17px]"
                    />
                  )
                }
              >
                <span className="truncate w-[200px] text-left">
                  {chat.name}
                </span>
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
export default function Section_ConvoManagement() {
  return (
    <LandingPage1Layout
      heading={"Advanced Conversation Management"}
      subheading={"Never lose track of anything. Ever."}
      icon={
        <BubbleChatIcon
          color="#ffffff90"
          className="sm:size-[30px] size-[30px]"
        />
      }
    >
      <Tabs defaultValue="starred" className="w-full">
        <TabsList className="flex gap-4">
          <TabsTrigger value="starred" className="flex items-center gap-2">
            <Star width={20} height={20} /> Starred
          </TabsTrigger>
          <TabsTrigger value="search" className="flex items-center gap-2">
            <SearchIcon width={20} height={20} /> Search
          </TabsTrigger>
          <TabsTrigger value="pins" className="flex items-center gap-2">
            <PinIcon width={20} height={20} /> Pins
          </TabsTrigger>
        </TabsList>

        <TabsContent value="starred">
          <SidebarComponent />
        </TabsContent>
        <TabsContent value="search">
          <div className="space-y-5 pt-5">
            <DummySearchCommand />
          </div>
        </TabsContent>
        <TabsContent value="pins">
          <div className="space-y-5 pt-5">
            {dummyMessages.map((message, index) => (
              <PinCard
                key={index}
                message={message}
                conversation_id={message.message_id}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </LandingPage1Layout>
  );
}
