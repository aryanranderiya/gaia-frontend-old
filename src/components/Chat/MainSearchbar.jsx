import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { SentIcon, AttachmentIcon } from "../icons";
import { Tooltip } from "@nextui-org/tooltip";

export default function MainSearchbar() {
  return (
    <div className="searchbar">
      <Input
        radius="full"
        size="lg"
        placeholder="Ask gaia something..."
        classNames={{ inputWrapper: ["px-1"] }}
        startContent={
          <Tooltip content="Attach documents" placement="left">
            <Button
              isIconOnly
              radius="full"
              aria-label="Attach files"
              className="mr-7"
            >
              <AttachmentIcon />
            </Button>
          </Tooltip>
        }
        endContent={
          <Tooltip content="Send message" placement="right">
            <Button isIconOnly radius="full" aria-label="Send message">
              <SentIcon />
            </Button>
          </Tooltip>
        }
      />
    </div>
  );
}
