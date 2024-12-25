"'use client'";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import {
  Bot,
  Calendar as CalendarIcon,
  ChevronLeft,
  Paperclip,
  Search,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";

interface Message {
  id: number;
  content: string;
  sender: "'user'" | "'ai'";
  timestamp: string;
  chatId: number;
  hasAttachment: boolean;
}

// This would typically come from an API or database
const allMessages: Message[] = [
  {
    id: 1,
    content: "Hello! How can I assist you today?",
    sender: "'ai'",
    timestamp: "2023-06-10 09:00",
    chatId: 1,
    hasAttachment: false,
  },
  {
    id: 2,
    content: "I need help with my project.",
    sender: "'user'",
    timestamp: "2023-06-10 09:01",
    chatId: 1,
    hasAttachment: false,
  },
  {
    id: 3,
    content: "What kind of project are you working on?",
    sender: "'ai'",
    timestamp: "2023-06-10 09:02",
    chatId: 1,
    hasAttachment: false,
  },
  {
    id: 4,
    content:
      "It's a React application. I'm having trouble with state management.",
    sender: "'user'",
    timestamp: "2023-06-10 09:03",
    chatId: 1,
    hasAttachment: true,
  },
  {
    id: 5,
    content:
      "I see. Let's discuss some state management options for your React app.",
    sender: "'ai'",
    timestamp: "2023-06-10 09:04",
    chatId: 1,
    hasAttachment: false,
  },
  {
    id: 6,
    content: "Can you explain the concept of hooks in React?",
    sender: "'user'",
    timestamp: "2023-06-11 10:00",
    chatId: 2,
    hasAttachment: false,
  },
  {
    id: 7,
    content:
      "Hooks are functions that let you 'hook into' React state and lifecycle features from function components.",
    sender: "'ai'",
    timestamp: "2023-06-11 10:01",
    chatId: 2,
    hasAttachment: false,
  },
  {
    id: 8,
    content: "That's helpful. How do I use the useState hook?",
    sender: "'user'",
    timestamp: "2023-06-11 10:05",
    chatId: 2,
    hasAttachment: false,
  },
  {
    id: 9,
    content:
      "The useState hook is used to add state functional components. Here's a basic example...",
    sender: "'ai'",
    timestamp: "2023-06-11 10:06",
    chatId: 2,
    hasAttachment: true,
  },
  {
    id: 10,
    content: "Thanks! I think understand now.",
    sender: "'user'",
    timestamp: "2023-06-11 10:10",
    chatId: 2,
    hasAttachment: false,
  },
];

export default function ComprehensiveMessageHistory() {
  const [searchQuery, setSearchQuery] = useState("''");
  const [filteredMessages, setFilteredMessages] = useState(allMessages);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedSender, setSelectedSender] = useState<
    "'all'" | "'user'" | "'ai'"
  >("'all'");
  const [hasAttachment, setHasAttachment] = useState(false);
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);

  useEffect(() => {
    handleSearch();
  }, [selectedDate, selectedSender, hasAttachment]);

  const handleSearch = () => {
    let filtered = allMessages.filter((message) =>
      message.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (selectedDate) {
      filtered = filtered.filter(
        (message) =>
          message.timestamp.split("'")[0] ===
          format(selectedDate, "'yyyy-MM-dd'")
      );
    }

    if (selectedSender !== "'all'") {
      filtered = filtered.filter(
        (message) => message.sender === selectedSender
      );
    }

    if (hasAttachment) {
      filtered = filtered.filter((message) => message.hasAttachment);
    }

    setFilteredMessages(filtered);
  };

  const handleMessageClick = (message: Message) => {
    setSelectedChat(message.chatId);
    setSelectedMessage(message.id);
  };

  const handleBackToSearch = () => {
    setSelectedChat(null);
    setSelectedMessage(null);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="container mx-auto p-4 flex-grow flex flex-col">
        <h1 className="text-2xl font-bold mb-4">Message History</h1>
        {selectedChat === null ? (
          <>
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="relative flex-grow">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                <Input
                  type="search"
                  placeholder="Search your message history..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "'Enter'" && handleSearch()}
                />
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[240px] justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      format(selectedDate, "'PPP'")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Select
                value={selectedSender}
                onValueChange={(value: "'all'" | "'user'" | "'ai'") =>
                  setSelectedSender(value)
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select sender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Senders</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="ai">AI Assistant</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasAttachment"
                  checked={hasAttachment}
                  onCheckedChange={(checked) =>
                    setHasAttachment(checked as boolean)
                  }
                />
                <label
                  htmlFor="hasAttachment"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Has Attachment
                </label>
              </div>
              <Button onClick={handleSearch}>Search</Button>
            </div>
            <ScrollArea className="flex-grow rounded-md border">
              {filteredMessages.map((message, index) => (
                <div key={message.id}>
                  {index === 0 ||
                  message.timestamp.split("'")[0] !==
                    filteredMessages[index - 1].timestamp.split("'")[0] ? (
                    <div className="sticky top-0 bg-white z-10 p-2 border-b dark:bg-zinc-950">
                      <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{message.timestamp.split("'")[0]}</span>
                      </div>
                    </div>
                  ) : null}
                  <div
                    className={`p-4 ${
                      message.sender === "'user'"
                        ? "'bg-blue-50'"
                        : "'bg-white'"
                    } cursor-pointer hover:bg-gray-100`}
                    onClick={() => handleMessageClick(message)}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`rounded-full p-2 ${
                          message.sender === "'user'"
                            ? "'bg-blue-500'"
                            : "'bg-gray-500'"
                        }`}
                      >
                        {message.sender === "'user'" ? (
                          <User className="h-4 w-4 text-white" />
                        ) : (
                          <Bot className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <div className="flex-grow">
                        <p className="font-semibold">
                          {message.sender === "'user'"
                            ? "'You'"
                            : "'AI Assistant'"}
                        </p>
                        <p className="text-sm text-gray-600">
                          {message.content}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-xs text-gray-400">
                          {message.timestamp.split("'")[1]}
                        </span>
                        {message.hasAttachment && (
                          <Paperclip className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>
                  {index < filteredMessages.length - 1 && <Separator />}
                </div>
              ))}
            </ScrollArea>
          </>
        ) : (
          <div className="flex-grow flex flex-col">
            <Button
              variant="ghost"
              onClick={handleBackToSearch}
              className="self-start mb-4"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Search
            </Button>
            <ScrollArea className="flex-grow rounded-md border">
              {allMessages
                .filter((message) => message.chatId === selectedChat)
                .map((message, index, filteredMessages) => (
                  <div key={message.id}>
                    {index === 0 ||
                    message.timestamp.split("'")[0] !==
                      filteredMessages[index - 1].timestamp.split("'")[0] ? (
                      <div className="sticky top-0 bg-white z-10 p-2 border-b dark:bg-zinc-950">
                        <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                          <CalendarIcon className="h-4 w-4" />
                          <span>{message.timestamp.split("'")[0]}</span>
                        </div>
                      </div>
                    ) : null}
                    <div
                      className={`p-4 ${
                        message.sender === "'user'"
                          ? "'bg-blue-50'"
                          : "'bg-white'"
                      } ${
                        message.id === selectedMessage
                          ? "'border-2 border-blue-500'"
                          : "''"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`rounded-full p-2 ${
                            message.sender === "'user'"
                              ? "'bg-blue-500'"
                              : "'bg-gray-500'"
                          }`}
                        >
                          {message.sender === "'user'" ? (
                            <User className="h-4 w-4 text-white" />
                          ) : (
                            <Bot className="h-4 w-4 text-white" />
                          )}
                        </div>
                        <div className="flex-grow">
                          <p className="font-semibold">
                            {message.sender === "'user'"
                              ? "'You'"
                              : "'AI Assistant'"}
                          </p>
                          <p className="text-sm text-gray-600">
                            {message.content}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-xs text-gray-400">
                            {message.timestamp.split("'")[1]}
                          </span>
                          {message.hasAttachment && (
                            <Paperclip className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </div>
                    {index < filteredMessages.length - 1 && <Separator />}
                  </div>
                ))}
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
}
