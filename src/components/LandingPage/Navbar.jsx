import { Button } from "@nextui-org/button";
import { ArrowUpRight01Icon, Menu01Icon, Home01Icon } from "../icons";
import { Link, useNavigate } from "react-router-dom";
import { CommentAdd01Icon } from "../icons";
import useMediaQuery from "../../hooks/MediaQuery";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "../Sheet";
import * as React from "react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import WaitListButton from "./WaitlistModal";
import FeedbackFormBtn from "../FeedbackForm/FeedbackFormBtn";

export default function Navbar() {
  const navigate = useNavigate();
  const isMobileScreen = useMediaQuery("(max-width: 600px)");
  const [open, setOpen] = React.useState(false);

  return (
    <div className="navbar">
      <div className="navbar_content">
        <span className="navbar_title">
          <Link to="/">gaia</Link>
        </span>

        {!isMobileScreen ? (
          <div className="flex gap-3">
            <FeedbackFormBtn props={{ size: "md" }} />

            <WaitListButton className="p-0" props={{ size: "md" }} />
          </div>
        ) : (
          <Sheet onOpenChange={setOpen} open={open}>
            <SheetTrigger>
              <div className="rounded-full p-3">
                <Menu01Icon color="foreground" />
              </div>
            </SheetTrigger>
            <SheetContent className="dark text-foreground max-w-[200px] bg-zinc-950">
              <SheetHeader>
                <SheetTitle>
                  <VisuallyHidden.Root>Menu</VisuallyHidden.Root>
                </SheetTitle>
                <SheetDescription className="pt-12 gap-3 flex flex-col">
                  <Button
                    className="w-full flex justify-between"
                    color="default"
                    variant="flat"
                    onPress={() => {
                      navigate("/");
                      setOpen(false);
                    }}
                    endContent={
                      <Home01Icon color="foreground" width="20" height="20" />
                    }
                  >
                    Home
                  </Button>

                  <Button
                    className="w-full flex justify-between"
                    variant="flat"
                    color="success"
                    onPress={() => {
                      navigate("/feedback");
                      setOpen(false);
                    }}
                    endContent={
                      <CommentAdd01Icon
                        color="foreground"
                        width="20"
                        height="20"
                      />
                    }
                  >
                    Feedback
                  </Button>

                  <WaitListButton
                    props={{
                      variant: "flat",
                      size: "md",
                      radius: "md",
                      className: "font-normal",
                    }}
                    text="Waitlist Signup"
                  />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </div>
  );
}
