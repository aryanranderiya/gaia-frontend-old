import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import {
  AttachmentIcon,
  Image02Icon,
  Pdf02Icon,
  Mic01Icon,
  BlushBrush02Icon,
} from "../icons";

export default function SearchbarLeftDropdown({ loading }) {
  return (
    <div className="flex gap-1 mr-2 flex-row flex-nowrap">
      <Tooltip content="Attach documents" placement="left" disabled={loading}>
        <Dropdown backdrop="blur">
          <DropdownTrigger>
            <Button
              disabled={loading}
              isIconOnly
              radius="full"
              aria-label="Attach files"
              className={`${loading && "cursor-wait"}`}
            >
              <AttachmentIcon />
            </Button>
          </DropdownTrigger>

          <DropdownMenu
            variant="faded"
            aria-label="Static Actions"
            classNames={{
              base: "flex flex-row w-fit",
              list: "w-fit flex-row",
              content: "w-fit min-w-[100px]",
            }}
          >
            <DropdownItem key="brush" className="w-fit rounded-full">
              <BlushBrush02Icon color="black" />
            </DropdownItem>
            <DropdownItem key="pdf" className="w-fit rounded-full">
              <Pdf02Icon color="black" />
            </DropdownItem>

            <DropdownItem key="image" className="w-fit rounded-full">
              <Image02Icon color="black" />
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Tooltip>

      <Button isIconOnly radius="full" aria-label="Microphone" type="submit">
        <Mic01Icon />
      </Button>
    </div>
  );
}
