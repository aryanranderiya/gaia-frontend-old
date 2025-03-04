import { Dropdown, DropdownItem } from "@heroui/dropdown";
import { Input, Textarea } from "@heroui/input";
import { Drawer } from "vaul";
import { Button } from "@heroui/button";
import { DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { ButtonGroup } from "@heroui/react";
import { ChevronDown, ChevronDownIcon, PaletteIcon } from "lucide-react";
import {
  BrushIcon,
  Sent02Icon,
  SentIcon,
  TimeScheduleIcon,
} from "../Misc/icons";
import { useState } from "react";
import { TagInput } from "emblor";

interface MailComposeProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function MailCompose({
  open,
  onOpenChange,
}: MailComposeProps): JSX.Element {
  // Use Emblor for the "From" field email chips.
  const [fromEmails, setFromEmails] = useState<string[]>([
    "aryanranderiya1478@gmail.com",
  ]);

  // Writing style selection state.
  const [writingStyle, setWritingStyle] = useState("formal");
  const writingStyles = [
    { id: "formal", label: "Formal" },
    { id: "friendly", label: "Friendly" },
    { id: "casual", label: "Casual" },
    { id: "persuasive", label: "Persuasive" },
    { id: "humorous", label: "Humorous" },
  ];

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange} direction="right">
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        <Drawer.Content className="bg-zinc-900 fixed right-0 bottom-0 w-[40vw] h-[60vh] z-[10] rounded-tl-xl p-4 flex flex-col gap-2">
          <Drawer.Title>New Message</Drawer.Title>

          {/* From field using Emblor */}
          <div>
            <label className="text-sm text-foreground-500 mb-1 block">
              From
            </label>
            <TagInput
              value={fromEmails}
              onChange={(emails: string[]) => setFromEmails(emails)}
              placeholder="Add email..."
              className="bg-zinc-800 rounded p-2"
            />
          </div>

          <Input
            variant="underlined"
            startContent={
              <div className="text-sm text-foreground-500 w-[50px] flex justify-center">
                To
              </div>
            }
            className="bg-zinc-800"
          />
          <Input
            placeholder="Subject"
            variant="underlined"
            className="bg-zinc-800"
            classNames={{ innerWrapper: "px-2" }}
          />

          <div className="relative h-full w-full">
            <Textarea
              variant="underlined"
              minRows={100}
              size="lg"
              classNames={{ innerWrapper: "px-2" }}
              className="bg-zinc-800"
            />
            <div className="flex py-3 gap-3 justify-end w-full">
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    size="sm"
                    color="primary"
                    className="font-medium text-[#00bbff] bg-[#00bbff40]"
                  >
                    <BrushIcon width={20} height={20} />
                    Writing Style:{" "}
                    {writingStyles.find((ws) => ws.id === writingStyle)?.label}
                    <ChevronDown width={20} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Writing Styles">
                  {writingStyles.map((style) => (
                    <DropdownItem
                      key={style.id}
                      onSelect={() => setWritingStyle(style.id)}
                    >
                      {style.label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>

              <Dropdown>
                <DropdownTrigger>
                  <Button
                    size="sm"
                    color="primary"
                    variant="flat"
                    className="font-medium text-[#00bbff] bg-[#00bbff40]"
                  >
                    <PaletteIcon width={20} height={20} />
                    Personalise <ChevronDown width={20} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Personalisation Options">
                  <DropdownItem key="new">New file</DropdownItem>
                  <DropdownItem key="copy">Copy link</DropdownItem>
                  <DropdownItem key="edit">Edit file</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>

          <footer className="flex w-full justify-end gap-5">
            <Input
              placeholder="Ask Gaia..."
              radius="full"
              classNames={{ inputWrapper: "pr-1 pl-0" }}
              className="pr-1"
              variant="faded"
              size="lg"
              startContent={<div className="pingspinner"></div>}
              endContent={
                <Button isIconOnly color="primary" radius={"full"}>
                  <SentIcon />
                </Button>
              }
            />

            <div className="flex items-center gap-2">
              <ButtonGroup color="primary">
                <Button className="text-medium">
                  Send
                  <Sent02Icon width={23} height={23} />
                </Button>
                <Dropdown placement="bottom-end" color="primary">
                  <DropdownTrigger>
                    <Button isIconOnly>
                      <ChevronDownIcon />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Mail Options"
                    selectionMode="single"
                    color="primary"
                  >
                    <DropdownItem
                      key="squash"
                      color="primary"
                      classNames={{
                        title:
                          "flex items-center gap-2 p-0 w-fit justify-between",
                      }}
                    >
                      Schedule Send <TimeScheduleIcon className="text-black" />
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </ButtonGroup>
            </div>
          </footer>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
