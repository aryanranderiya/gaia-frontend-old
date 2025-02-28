import { InboxIcon } from "@/components/Misc/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Chip } from "@heroui/chip";
import { Tooltip } from "@heroui/tooltip";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

// Sample email data
const emails = [
  {
    key: "1",
    from: "lorem@ipsum.com",
    subject: "Test Email",
    time: "10:30 AM",
  },
  {
    key: "2",
    from: "john@doe.com",
    subject: "Meeting Reminder",
    time: "12:00 PM",
  },
  {
    key: "3",
    from: "client@xyz.com",
    subject: "Project Update",
    time: "3:45 PM",
  },
];

// Draft Email Component
function DraftEmail() {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`absolute bottom-0 right-3 overflow-hidden transition-all duration-500 ${
        open ? "w-[50vw] h-[50vh] bg-zinc-900" : "w-[250px] h-10 bg-primary"
      } rounded-t-lg text-white p-2 px-3 shadow-xl`}
    >
      <div
        className="w-full flex justify-between cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="font-medium">Create new Email</div>
        {open ? <ChevronDown /> : <ChevronUp />}
      </div>
    </div>
  );
}

// Email Table Component using ShadCN
function EmailTable({ data }: { data: typeof emails }) {
  return (
    <Table className="w-full bg-zinc-950 rounded-xl">
      {/* <TableHeader className="bg-zinc-800 text-white">
        <TableRow>
          <TableHead className="text-left">From</TableHead>
          <TableHead className="text-left">Subject</TableHead>
          <TableHead className="text-right">Time</TableHead>
        </TableRow>
      </TableHeader> */}
      <TableBody>
        {data.length > 0 ? (
          data.map((email) => (
            <Tooltip
              radius="sm"
              color="foreground"
              content={
                <div className="flex flex-col max-w-[300px]">
                  <div className="font-medium text-lg">title</div>
                  <ScrollArea>
                    <div className="max-h-20">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Commodi perspiciatis molestiae et error, omnis eaque
                      sapiente tempore saepe hic quisquam, vitae dignissimos,
                      rerum sit libero veniam repudiandae aperiam nam? Ratione
                      quisquam repellendus tempore sit porro ipsam quaerat quos,
                      atque odio quia modi nemo hic eveniet dolores nihil!
                      Doloribus magnam unde animi sed velit vel dignissimos
                      distinctio quisquam ad nesciunt optio, beatae cumque!
                      Odit, assumenda dolores? Cum error autem, iste consequatur
                      doloremque inventore, ipsum officiis non corrupti
                      reiciendis sed, ducimus placeat eos vel magnam sapiente
                      itaque exercitationem praesentium cumque voluptatibus vero
                      repellat fugiat. Provident atque fugiat vel nisi sed
                      eligendi ut.
                    </div>
                  </ScrollArea>
                </div>
              }
            >
              <TableRow
                key={email.key}
                className="hover:bg-zinc-800 border-none cursor-pointer"
              >
                <TableCell className="font-medium text-white">
                  {email.from}
                </TableCell>
                <TableCell className="font-medium text-white">
                  {email.subject}
                </TableCell>
                <TableCell className="font-medium text-white">
                  <Chip radius="sm" variant="flat" color="warning">
                    Important
                  </Chip>
                </TableCell>
                <TableCell className="text-right font-normal text-foreground-500">
                  {email.time}
                </TableCell>
              </TableRow>
            </Tooltip>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={3} className="text-center py-4 text-gray-500">
              You have no emails to display.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

// Main Emails Component
export default function Emails() {
  return (
    <div className="w-full h-screen p-4 pt-0">
      <div className="text-2xl mb-4 font-medium flex items-center gap-2">
        <InboxIcon color={undefined} />
        Inbox
      </div>

      <EmailTable data={emails} />
      <DraftEmail />
    </div>
  );
}
