import React, { useState, useEffect } from "react";
import MailCompose from "@/components/Mail/MailCompose";
import { InboxIcon } from "@/components/Misc/icons";
import { apiauth } from "@/utils/apiaxios";
import { parseEmail, transformEmail } from "@/utils/mailUtils";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  getKeyValue,
} from "@heroui/react";
import { useInfiniteScroll } from "@heroui/use-infinite-scroll";
import { useAsyncList } from "@react-stately/data";

export interface EmailData {
  id: string;
  from: string;
  subject: string;
  time: string;
  snippet?: string;
}

const EmailFrom = ({ from }: { from: string }) => {
  const { name, email } = parseEmail(from);
  return <strong>{name ? name : email}</strong>;
};

export default function Emails(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const list = useAsyncList<EmailData>({
    async load({ signal, cursor }) {
      try {
        const maxResults = 20;
        const url = cursor || `/gmail/messages?maxResults=${maxResults}`;

        setIsLoading(true);
        const response = await apiauth.get(url, { signal });
        const data = response.data;

        // Determine if there are more pages to load
        const hasMorePages = !!data.nextPageToken;
        setHasMore(hasMorePages);

        const emails: EmailData[] = data.messages.map(transformEmail);

        return {
          items: emails,
          cursor: hasMorePages
            ? `/gmail/messages?pageToken=${data.nextPageToken}&maxResults=${maxResults}`
            : null,
        };
      } catch (error) {
        console.error("Failed to load emails:", error);
        setHasMore(false);
        return { items: [] };
      } finally {
        setIsLoading(false);
      }
    },
  });

  const [loaderRef, scrollerRef] = useInfiniteScroll({
    hasMore,
    onLoadMore: list.loadMore,
  });

  // Auto-load more if the content isn't scrollable yet
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (scroller && hasMore) {
      const isScrollable = scroller.scrollHeight > scroller.clientHeight;
      if (!isScrollable) {
        list.loadMore();
      }
    }
  }, [list, hasMore, scrollerRef]);

  return (
    <div className="w-full h-screen p-4 pt-0 relative">
      <div className="text-2xl mb-4 font-medium flex items-center gap-2">
        <InboxIcon />
        Inbox
      </div>
      <Table
        // isHeaderSticky
        hideHeader
        aria-label="Emails Table with Infinite Scroll"
        baseRef={scrollerRef}
        bottomContent={
          hasMore ? (
            <div className="flex w-full justify-center">
              <Spinner ref={loaderRef} color="white" />
            </div>
          ) : null
        }
        classNames={{
          base: "max-h-[80vh]",
          table: "min-h-[400px]",
        }}
      >
        <TableHeader>
          <TableColumn key="from">From</TableColumn>
          <TableColumn key="subject">Subject</TableColumn>
          <TableColumn key="time">Time</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          items={list.items}
          // loadingContent={<Spinner color="white" />}
        >
          {(item: EmailData) => (
            <TableRow key={item.id}>
              {(columnKey) => {
                if (columnKey === "from") {
                  return (
                    <TableCell>
                      <EmailFrom from={item.from} />
                    </TableCell>
                  );
                }
                if (columnKey === "subject") {
                  return <TableCell>{item.subject}</TableCell>;
                }
                if (columnKey === "time") {
                  return <TableCell>{item.time}</TableCell>;
                }
                return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <MailCompose />
    </div>
  );
}
