import { Button } from "@nextui-org/button";
import { ArrowUpRight01Icon, FallingStarIcon } from "../icons";

export default function JoinButtons() {
  return (
    <>
      <Button
        color="primary"
        radius="full"
        variant="shadow"
        className="arrow_diagonal_btn font-medium"
        endContent={
          <ArrowUpRight01Icon
            className="arrow_diagonal"
            color="primary"
            width="15"
            height="15"
          />
        }
      >
        Join the waitlist
      </Button>

      <Button
        color="default"
        radius="full"
        variant="ghost"
        className="arrow_diagonal_btn font-medium"
        endContent={
          <FallingStarIcon
            className="arrow_diagonal"
            color="primary"
            width="15"
            height="15"
          />
        }
      >
        Get early access
      </Button>
    </>
  );
}
