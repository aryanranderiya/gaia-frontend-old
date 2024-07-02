import { Button } from "@nextui-org/button";
import { ArrowUpRight01Icon } from "../icons";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar_content">
        <div className="navbar_title">gaia</div>

        <div>
          <Button
            color="primary"
            radius="full"
            className="px-3 font-medium"
            variant="shadow"
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
        </div>
      </div>
    </div>
  );
}
