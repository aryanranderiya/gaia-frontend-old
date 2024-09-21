import { Button } from "@nextui-org/button";
import { Menu01Icon, Home01Icon } from "../icons";
import { useNavigate } from "react-router-dom";
import { CommentAdd01Icon, ArrowUpRight01Icon, Chatting01Icon } from "../icons";
import useMediaQuery from "../../hooks/MediaQuery";
import * as React from "react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import WaitListButton from "./WaitlistModal";
import FeedbackFormBtn from "../FeedbackForm/FeedbackFormBtn";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "../Shadcn/Sheet";

export default function Navbar() {
  const navigate = useNavigate();
  const isMobileScreen = useMediaQuery("(max-width: 600px)");
  const [open, setOpen] = React.useState(false);

  return (
    <div className="navbar">
      <div className="navbar_content">
        <Button
          variant="light"
          radius="full"
          size="md"
          onPress={() => navigate("/")}
        >
          <span className="navbar_title">gaia</span>
        </Button>
        {/* 
        <div className="flex justify-center w-full items-center">
          <Button variant="light" radius="none" size="md" onPress={() => navigate("features")}>Features</Button>
          <Button variant="light" radius="none" size="md" onPress={() => navigate("pricing")}>Pricing</Button>
          <Button variant="light" radius="none" size="md" onPress={() => navigate("feedback")}>Survey</Button>
        </div> */}

        {!isMobileScreen ? (
          <div className="flex items-center gap-1">
            <FeedbackFormBtn props={{ size: "md" }} text="Survey" />

            <WaitListButton
              props={{
                className: "p-0",
                size: "md",
                color: "default",
                variant: "light",
                endContent: <></>,
              }}
              text="Login"
            />

            <WaitListButton
              props={{
                size: "md",
                endContent: <></>,
                className: "p-0",
              }}
              text="Signup"
            />

            <Button
              variant="shadow"
              color="primary"
              radius="full"
              size="md"
              className="font-medium"
              endContent={<Chatting01Icon color="foreground" width="17" />}
              onPress={() => navigate("/try/chat")}
            >
              Chat
            </Button>

            <Button
              variant="shadow"
              color="primary"
              radius="full"
              size="md"
              className="font-medium"
              endContent={<ArrowUpRight01Icon color="foreground" width="15" />}
            >
              Get Started
            </Button>
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
                    variant="ghost"
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
                    className="w-full flex justify-between font-medium"
                    variant="ghost"
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
                    text="Waitlist Signup"
                    props={{
                      variant: "ghost",
                      size: "md",
                      radius: "md",
                      className: "font-normal",
                    }}
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
