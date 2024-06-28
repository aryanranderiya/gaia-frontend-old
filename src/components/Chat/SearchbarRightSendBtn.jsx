import { Button } from "@nextui-org/button";
import { SentIcon } from "../icons";
import { Tooltip } from "@nextui-org/tooltip";

export default function SearchbarRightSendBtn({ loading }) {
  return (
    <Tooltip content="Send message" placement="right">
      <Button
        disabled={loading}
        isIconOnly
        radius="full"
        aria-label="Send message"
        color="primary"
        type="submit"
        className={`${loading && "cursor-wait"} mx-2`}
      >
        <SentIcon color="black" fill="#ffffff40" />
      </Button>
    </Tooltip>
  );
}
