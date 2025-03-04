import { useCallback } from "react";
import { useInfiniteQuery, QueryFunctionContext } from "@tanstack/react-query";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { apiauth } from "@/utils/apiaxios";
import { EmailFrom } from "@/components/Mail/MailFrom";
import { Spinner } from "@heroui/spinner";

export interface EmailData {
  id: string;
  from: string;
  subject: string;
  time: string;
  snippet?: string;
}

interface EmailsResponse {
  emails: EmailData[];
  nextPageToken?: string;
}

const fetchEmails = async ({
  pageParam = undefined,
}: QueryFunctionContext<string[]>): Promise<EmailsResponse> => {
  const maxResults = 50; // Adjust as needed
  const url = `/gmail/messages?maxResults=${maxResults}${
    pageParam ? `&pageToken=${pageParam}` : ""
  }`;
  const response = await apiauth.get(url);
  const data = response.data;
  return { emails: data.messages, nextPageToken: data.nextPageToken };
};

export default function Email() {
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage } =
    useInfiniteQuery<EmailsResponse, Error>({
      queryKey: ["emails"],
      queryFn: fetchEmails,
      getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
    });

  const emails = data ? data.pages.flatMap((page) => page.emails) : [];

  const isItemLoaded = useCallback(
    (index: number) => !hasNextPage || index < emails.length,
    [emails.length, hasNextPage]
  );

  const loadMoreItems = useCallback(
    async (_startIndex: number, _stopIndex: number) => {
      if (hasNextPage) await fetchNextPage();
    },
    [hasNextPage, fetchNextPage]
  );

  const Row = ({ index, style }: ListChildComponentProps) => {
    const email = emails[index];

    return (
      email && (
        <div
          className="flex p-3 gap-5 items-center px-10"
          style={{
            ...style,
          }}
        >
          <div className="flex-[0.3]">
            <EmailFrom from={email.from} />
          </div>
          <div className="flex-1">{email.subject}</div>
          <div className="text-sm text-foreground-500">{email.time}</div>
        </div>
      )
    );
  };

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-red-500">
        <Spinner />
      </div>
    );
  }

  const itemCount = hasNextPage ? emails.length + 1 : emails.length;

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <List
          height={900}
          itemCount={itemCount}
          itemSize={60}
          onItemsRendered={onItemsRendered}
          ref={ref}
          width="100%"
        >
          {Row}
        </List>
      )}
    </InfiniteLoader>
  );
}
