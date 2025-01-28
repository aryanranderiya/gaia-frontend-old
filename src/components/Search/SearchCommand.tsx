"use client";

import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { apiauth } from "@/utils/apiaxios";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import {
  useCallback,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar01Icon,
  DiscoverCircleIcon,
  PencilEdit02Icon,
  PinIcon,
  Route02Icon,
  StickyNote01Icon,
} from "../icons";
import { SearchCard } from "./SearchCard";
import { Lightbulb } from "lucide-react";

const pages = [
  // { name: "Calendar", path: "/try/calendar", icon: <Calendar01Icon /> },
  // { name: "Explore", path: "/try/explore" icon: <DiscoverCircleIcon/>},
  // { name: "Notes", path: "/try/notes" icon:<},
  // { name: "Goals", path: "/try/goals" },
  {
    path: "/try/explore",
    icon: (
      <DiscoverCircleIcon
        className="min-h-[22px] min-w-[22px]"
        color="#9b9b9b"
      />
    ),
    name: "Explore",
  },
  {
    path: "/try/pins",
    icon: <PinIcon className="min-h-[22px] min-w-[22px]" color="#9b9b9b" />,
    name: "Pins",
  },
  {
    path: "/try/calendar",
    icon: (
      <Calendar01Icon className="min-h-[22px] min-w-[22px]" color="#9b9b9b" />
    ),
    name: "Calendar",
  },
  {
    path: "/try/notes",
    icon: (
      <StickyNote01Icon className="min-h-[22px] min-w-[22px]" color="#9b9b9b" />
    ),
    name: "Notes",
  },
  {
    path: "/try/goals",
    icon: <Route02Icon color="#9b9b9b" className="min-h-[22px] min-w-[22px]" />,
    name: "Goals",
  },
];

const commands = [
  {
    name: "New Chat",
    action: () => console.log("Create new note"),
    icon: (
      <PencilEdit02Icon color="#9b9b9b" className="min-h-[22px] min-w-[22px]" />
    ),
  },
];

export default function SearchCommand({
  openSearchDialog,
  setOpenSearchDialog,
}: {
  openSearchDialog: boolean;
  setOpenSearchDialog: Dispatch<SetStateAction<boolean>>;
}) {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpenSearchDialog((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [filteredPages, setFilteredPages] = useState(pages);
  const [filteredCommands, setFilteredCommands] = useState(commands);
  const navigate = useNavigate();

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }
    try {
      const response = await apiauth.get("/search/messages", {
        params: { query: searchQuery },
      });
      setResults(response.data.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch();
      setFilteredPages(
        pages.filter((page) =>
          page.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredCommands(
        commands.filter((command) =>
          command.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }, 300); // 300ms delay

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, handleSearch]);

  return (
    <CommandDialog open={openSearchDialog} onOpenChange={setOpenSearchDialog}>
      <CommandInput
        placeholder="Search for messages..."
        value={searchQuery}
        // classList={{ "cmdk-input-wrapper": "bg-red-500" }}
        onValueChange={setSearchQuery}
      />
      <CommandList className="bg-zinc-900">
        <CommandGroup>
          {filteredCommands.map((command) => (
            <CommandItem
              key={command.name}
              onSelect={() => {
                setOpenSearchDialog(false);
                command.action();
              }}
              className="cursor-pointer group !my-3"
            >
              <div className="flex gap-2 items-center w-full">
                {command.icon}
                {command.name}
                <ArrowTopRightIcon className="text-foreground-500 ml-auto group-hover:text-[#00bbff] transition-all" />
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />

        <CommandGroup heading="Pages">
          {filteredPages.map((page) => (
            <CommandItem
              key={page.name}
              className="cursor-pointer group"
              onSelect={() => {
                setOpenSearchDialog(false);
                navigate(page.path);
              }}
            >
              <div className="flex gap-2 items-center w-full">
                {page.icon}
                {page.name}
                <ArrowTopRightIcon className="text-foreground-500 ml-auto group-hover:text-[#00bbff] transition-all" />
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        {!!searchQuery &&
          (results.length > 0 && !!results ? (
            <CommandGroup heading="Search Results">
              {results.map((result) => {
                return <SearchCard result={result} searchQuery={searchQuery} />;
              })}
            </CommandGroup>
          ) : (
            <div className="text-sm p-4 text-foreground-500">
              No results found for '{searchQuery}'
            </div>
          ))}

        {/* <CommandItem key="hey">hey there</CommandItem> */}
      </CommandList>
      {!searchQuery && (
        <div className="text-sm text-center p-2 bg-zinc-900 inline-flex gap-2 items-center justify-center text-foreground-600">
          <Lightbulb className="size-[20px] text-white relative left-1" />
          Tip: Hit
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded  bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 bg-zinc-600 text-white">
            <span className="text-xs">⌘</span>K
          </kbd>
          to open this Command Menu
        </div>
      )}
    </CommandDialog>
  );
}
