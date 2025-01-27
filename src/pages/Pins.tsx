import { InternetIcon, PinIcon } from "@/components/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { apiauth } from "@/utils/apiaxios";
import { parseDate } from "@/utils/fetchDate";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";
import { ArrowUpRight, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Define types for fetched messages
interface Message {
  message: {
    message_id: string;
    response: string;
    searchWeb: boolean;
    pageFetchURL: string;
    date: string;
    type: string;
  };
  conversation_id: string;
}

export default function Pins() {
  const [fetchedResults, setFetchedResults] = useState<Message[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPins = async () => {
    setLoading(true);
    try {
      const response = await apiauth.get("/messages/pinned");
      setFetchedResults(response.data.results);
      console.log(response.data.results);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPins();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-between h-full">
        <ScrollArea>
          <div className="flex items-center flex-col gap-2">
            <h1 className="font-bold text-center text-5xl">Pinned Messaegs</h1>
            <div className=" text-center text-md pb-6 max-w-screen-md">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis,
              sed!
            </div>
          </div>

          {loading ? (
            <div className="h-[80vh] flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <div className="flex flex-wrap gap-4 justify-center pb-8 ">
              <div>
                {!!fetchedResults && fetchedResults?.length > 0 ? (
                  <div className="grid gap-3 px-[10%] grid-cols-[repeat(auto-fill,_minmax(15vw,_1fr))]">
                    {fetchedResults.map(
                      (result) =>
                        result.message?.message_id && (
                          <Link
                            key={result.message?.message_id}
                            to={`/try/chat/${result.conversation_id}`}
                            state={{ messageId: result.message?.message_id }}
                            className="bg-black p-3 rounded-xl h-full overflow-hidden max-h-[190px] min-h-[190px] flex flex-col gap-2 outline outline-zinc-800 outline-2 hover:bg-zinc-800 transition-colors relative"
                          >
                            <Chip
                              className="min-h-7"
                              color={
                                result.message.type == "bot"
                                  ? "primary"
                                  : "default"
                              }
                            >
                              {result.message.type == "bot"
                                ? "From GAIA"
                                : "From You"}
                            </Chip>

                            <div className="absolute right-1 top-1">
                              <PinIcon
                                width={30}
                                height={30}
                                fill="#00bbff"
                                color="#00bbff"
                              />
                            </div>

                            <div>
                              {result.message?.searchWeb && (
                                <Chip
                                  size="sm"
                                  startContent={
                                    <InternetIcon height={20} color="#00bbff" />
                                  }
                                  variant="flat"
                                  color="primary"
                                >
                                  <div className="font-medium flex items-center gap-1 text-primary">
                                    Live Search Results from the Web
                                  </div>
                                </Chip>
                              )}

                              {!!result.message?.pageFetchURL && (
                                <Chip
                                  size="sm"
                                  startContent={
                                    <ArrowUpRight height={20} color="#00bbff" />
                                  }
                                  variant="flat"
                                  color="primary"
                                >
                                  <div className="font-medium flex items-center gap-1 text-primary">
                                    Fetched
                                    <a
                                      href={result.message.pageFetchURL}
                                      className="!text-[#00bbff] font-medium hover:!text-white transition-colors"
                                      target="_blank"
                                    >
                                      {result.message.pageFetchURL.replace(
                                        /^https?:\/\//,
                                        ""
                                      )}
                                    </a>
                                  </div>
                                </Chip>
                              )}
                            </div>
                            <div className="max-h-[140px] overflow-hidden text-sm">
                              {result.message?.response?.slice(0, 350)}
                              {result?.message?.response?.length > 350
                                ? "..."
                                : ""}
                            </div>
                            <div className="text-xs mt-auto text-foreground-400">
                              {parseDate(result?.message?.date)}
                            </div>
                          </Link>
                        )
                    )}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          )}
        </ScrollArea>

        <div className="absolute left-0 bottom-5 flex justify-center items-center w-full z-10">
          <div className="flex items-center gap-3 max-w-screen-sm w-full">
            <Input
              placeholder="Enter a message to search:   "
              value={searchQuery}
              size="lg"
              variant="faded"
              radius="full"
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
              classNames={{ inputWrapper: "pr-1" }}
              onKeyDown={(e) => {
                if (e.key === "Enter") fetchPins();
              }}
              endContent={
                <Button
                  onClick={fetchPins}
                  isIconOnly
                  radius="full"
                  color="primary"
                >
                  <SearchIcon />
                </Button>
              }
            />
          </div>
        </div>
        <div className="bg-custom-gradient2 left-0 absolute bottom-0 w-full h-[100px] z-[1]" />
      </div>
    </>
  );
}
