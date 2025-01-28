import { Button } from "@heroui/button";
import { Github } from "../icons";

export default function MadeBy() {
  return (
    <div className="w-full flex justify-center pb-4">
      <Button
        size="sm"
        radius="full"
        color="primary"
        variant="faded"
        className="font-medium lowercase pl-0 gap-1"
        onPress={() =>
          (window.location.href = "https://github.com/aryanranderiya")
        }
        startContent={<Github color="lightgrey" height="20" />}
      >
        Made by Aryan Randeriya
      </Button>
    </div>
  );
}
