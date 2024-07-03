import { Button } from "@nextui-org/button";
import { ArrowUpRight01Icon, Menu01Icon, Home01Icon } from "../icons";
import { Link, useNavigate } from "react-router-dom";
import { CommentAdd01Icon } from "../icons";
import useMediaQuery from "../../hooks/MediaQuery";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";

export default function Navbar() {
  const navigate = useNavigate();
  const isMobileScreen = useMediaQuery("(max-width: 600px)");

  return (
    <div className="navbar">
      <div className="navbar_content">
        <span className="navbar_title">
          <Link to="/">gaia</Link>
        </span>

        {!isMobileScreen ? (
          <div className="flex gap-3">
            <Button
              radius="full"
              className="px-3 font-medium"
              variant="light"
              onClick={() => navigate("/feedback")}
              endContent={
                <CommentAdd01Icon
                  className="arrow_diagonal"
                  color="primary"
                  width="20"
                  height="20"
                />
              }
            >
              Feedback Form
            </Button>

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
        ) : (
          <Dropdown
            classNames={{
              base: "dark text-foreground",
            }}
            backdrop="opaque"
          >
            <DropdownTrigger>
              <Button variant="light" isIconOnly radius="full">
                <Menu01Icon color="foreground" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions" color="primary">
              <DropdownItem
                key="home"
                endContent={
                  <Home01Icon color="primary" width="20" height="20" />
                }
              >
                Home
              </DropdownItem>

              <DropdownItem
                key="new"
                endContent={
                  <CommentAdd01Icon color="primary" width="20" height="20" />
                }
              >
                Feedback Form
              </DropdownItem>

              <DropdownItem
                key="new"
                endContent={
                  <ArrowUpRight01Icon color="primary" width="20" height="20" />
                }
              >
                Signup for Waitlist
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </div>
    </div>
  );
}
