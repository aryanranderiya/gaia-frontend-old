import { Chip } from "@heroui/chip";
import { Input } from "@heroui/input";
import { Spinner } from "@heroui/spinner";
import { ArrowUpRight, DeleteIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { parseDate } from "@/utils/fetchDate";
import { apiauth } from "@/utils/apiaxios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { InternetIcon, PinIcon } from "@/components/icons";

interface PinCardProps {
  message: {
    message_id: string;
    response: string;
    searchWeb?: boolean;
    pageFetchURL?: string;
    date: string | Date;
    type: string;
  };
  conversation_id: string;
}

export const PinCard: React.FC<PinCardProps> = ({
  message,
  conversation_id,
}) => {
  return (
    <Link
      key={message.message_id}
      className="bg-black p-3 rounded-xl h-full overflow-hidden max-h-[190px] min-h-[150px] flex flex-col gap-2 outline outline-zinc-800 outline-2 hover:bg-zinc-800 transition-colors relative"
      state={{ messageId: message.message_id }}
      to={`/try/chat/${conversation_id}`}
    >
      <Chip
        className="min-h-7"
        color={message.type === "bot" ? "primary" : "default"}
      >
        {message.type === "bot" ? "From GAIA" : "From You"}
      </Chip>

      <div className="absolute right-1 top-1">
        <PinIcon color="#00bbff" fill="#00bbff" height={30} width={30} />
      </div>

      <div>
        {message.searchWeb && (
          <Chip
            color="primary"
            size="sm"
            startContent={<InternetIcon color="#00bbff" height={20} />}
            variant="flat"
          >
            <div className="font-medium flex items-center gap-1 text-primary">
              Live Search Results from the Web
            </div>
          </Chip>
        )}

        {message.pageFetchURL && (
          <Chip
            color="primary"
            size="sm"
            startContent={<ArrowUpRight color="#00bbff" height={20} />}
            variant="flat"
          >
            <div className="font-medium flex items-center gap-1 text-primary">
              Fetched
              <a
                className="!text-[#00bbff] font-medium hover:!text-white transition-colors"
                href={message.pageFetchURL}
                rel="noreferrer"
                target="_blank"
              >
                {message.pageFetchURL.replace(/^https?:\/\//, "")}
              </a>
            </div>
          </Chip>
        )}
      </div>

      <div className="max-h-[140px] overflow-hidden text-sm">
        {message.response.slice(0, 350)}
        {message.response.length > 350 ? "..." : ""}
      </div>

      <div className="text-xs mt-auto text-foreground-400">
        {parseDate(message.date as string)}
      </div>
    </Link>
  );
};

export default function Pins() {
  const [fetchedResults, setFetchedResults] = useState<any[]>([]);
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPins = async () => {
    setLoading(true);
    try {
      const response = await apiauth.get("/messages/pinned");
      const results = response.data.results;

      setFetchedResults(results);
      setFilteredResults(results);
      console.log(results);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPins();
  }, []);

  const filterPins = (query: string) => {
    const filtered = fetchedResults.filter((result) =>
      result.message.response.toLowerCase().includes(query.toLowerCase()),
    );

    setFilteredResults(filtered);
  };

  return (
    <>
      <div className="flex flex-col justify-between h-full">
        <ScrollArea>
          <div className="flex items-center flex-col gap-2">
            <h1 className="font-bold text-center text-5xl">Pinned Messages</h1>
            <div className="text-center text-md pb-6 max-w-screen-md">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis,
              sed!
            </div>
          </div>

          {loading ? (
            <div className="h-[80vh] flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <div className="flex flex-wrap gap-4 justify-center pb-8">
              <div>
                {!!filteredResults && filteredResults.length > 0 ? (
                  <div className="grid gap-3 sm:px-[10%] sm:grid-cols-[repeat(auto-fill,_minmax(15vw,_1fr))] grid-cols-[repeat(auto-fill,_minmax(1fr,_1fr))]">
                    {filteredResults.map((result) => (
                      <PinCard
                        key={result.message.message_id}
                        conversation_id={result.conversation_id}
                        message={result.message}
                      />
                    ))}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          )}
        </ScrollArea>

        <div className="absolute left-0 bottom-5 flex justify-center items-center w-full z-10 flex-col">
          <div className="flex items-center gap-3 max-w-screen-sm w-full relative">
            {searchQuery.trim().length > 0 && (
              <div className="div flex justify-end text-sm w-full absolute bottom-14 right-2">
                <div
                  className="text-foreground-600 bg-foreground-100 w-fit gap-1 items-center flex-row flex px-4 py-1 rounded-full cursor-pointer"
                  onClick={() => {
                    setSearchQuery("");
                    filterPins("");
                  }}
                >
                  Clear Query <DeleteIcon height={17} width={17} />
                </div>
              </div>
            )}

            <Input
              autoFocus
              className="w-full"
              classNames={{ inputWrapper: "pr-1" }}
              placeholder="Enter a message to filter pins"
              radius="full"
              size="lg"
              value={searchQuery}
              variant="faded"
              onChange={(e) => {
                const query = e.target.value;

                setSearchQuery(query);
                filterPins(query);
              }}
            />
          </div>
        </div>
        <div className="bg-custom-gradient2 left-0 absolute bottom-0 w-full h-[100px] z-[1]" />
      </div>
    </>
  );
}
