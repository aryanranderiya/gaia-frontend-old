import { EmailFrom } from "@/components/Mail/MailFrom";
import ViewEmail from "@/components/Mail/ViewMail";
import { InboxIcon } from "@/components/Misc/icons";
import { apiauth } from "@/utils/apiaxios";
import { formatTime } from "@/utils/mailUtils";
import { Spinner } from "@heroui/spinner";
import { Tooltip } from "@heroui/tooltip";
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import { useCallback, useState } from "react";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

export interface EmailData {
  id: string;
  from: string;
  subject: string;
  time: string;
  snippet?: string;
  body?: string;
  labelIds?: string[];
  headers: any;
}

interface EmailsResponse {
  emails: EmailData[];
  nextPageToken?: string;
}

const fetchEmails = async ({
  pageParam = undefined,
}: QueryFunctionContext<string[]>): Promise<EmailsResponse> => {
  const maxResults = 20;
  const url = `/gmail/messages?maxResults=${maxResults}${
    pageParam ? `&pageToken=${pageParam}` : ""
  }`;
  const response = await apiauth.get(url);
  const data = response.data;
  return { emails: data.messages, nextPageToken: data.nextPageToken };
};

export const renderEmailBody = (body?: string) => {
  if (!body) return "No content available.";

  console.log(body);

  // Check if the body is HTML or plain text
  const isHtml = /<\/?[a-z][\s\S]*>/i.test(body);

  if (isHtml) {
    const sanitizedHtml = DOMPurify.sanitize(body); // Sanitize HTML
    return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
  }

  return <p className="whitespace-pre-wrap">{body}</p>;
};

export default function Email() {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<
    EmailsResponse,
    Error
  >({
    queryKey: ["emails"],
    queryFn: fetchEmails,
    getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
  });

  const emails = data ? data.pages.flatMap((page) => page.emails) : [];

  const [selectedEmail, setSelectedEmail] = useState<EmailData | null>(null);

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

  const openEmail = (email: EmailData) => {
    setSelectedEmail(email);
  };

  const Row = ({ index, style }: ListChildComponentProps) => {
    if (!isItemLoaded(index)) {
      return (
        <div style={style} className="flex items-center justify-center">
          <Spinner />
        </div>
      );
    }
    const email = emails[index];
    if (!email) return null;

    return (
      <Tooltip
        showArrow
        placement="top"
        closeDelay={0}
        content={
          <div className="p-1 flex flex-col w-[200px]">
            <div className="font-medium text-xl">Title</div>
            <div>
              Description Lorem, ipsum dolor sit amet consectetur adipisicing
              elit. Rerum, quia?
            </div>
          </div>
        }
        color="foreground"
        radius="sm"
      >
        <div
          className={`flex p-3 gap-5 items-center px-6 hover:bg-white/20 hover:text-white bg-black bg-opacity-45 transition-all duration-200 cursor-pointer ${
            email?.labelIds.includes("UNREAD")
              ? "font-medium"
              : "font-normal text-foreground-400"
          }`}
          style={style}
          onClick={() => openEmail(email)}
        >
          <div className="flex-[0.3] truncate">
            <EmailFrom from={email.from} />
          </div>
          <div className="flex-1 truncate">{email.subject}</div>
          <div className="text-sm opacity-50">{formatTime(email.time)}</div>
        </div>
      </Tooltip>
    );
  };

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const itemCount = hasNextPage ? emails.length + 1 : emails.length;

  return (
    <div className="pl-2 w-full">
      <h1 className="flex items-center gap-2 w-full justify-start pb-5">
        <InboxIcon color={undefined} width={25} height={25} />
        Inbox
      </h1>
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <List
            height={900}
            itemCount={itemCount}
            itemSize={55}
            onItemsRendered={onItemsRendered}
            ref={ref}
            width="100%"
            className="rounded-xl"
          >
            {Row}
          </List>
        )}
      </InfiniteLoader>

      <ViewEmail
        mail={selectedEmail}
        onOpenChange={() => setSelectedEmail(null)}
      />
    </div>
  );
}
