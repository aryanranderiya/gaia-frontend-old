import { useUser } from "@/contexts/UserContext";
import { Button } from "@nextui-org/button";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "../../hooks/MediaQuery";
import {
  Chatting01Icon,
  CommentAdd01Icon,
  Home01Icon,
  Menu01Icon,
} from "../icons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../Shadcn/Sheet";
import WaitListButton from "./WaitlistModal";

export default function Navbar() {
  const { user } = useUser();

  const navigate = useNavigate();
  const isMobileScreen = useMediaQuery("(max-width: 600px)");
  const [open, setOpen] = useState(false);

  return (
    <div className="navbar">
      <div className="navbar_content">
        <Button
          variant="light"
          radius="full"
          size="md"
          className="text-xl font-medium"
          onPress={() => navigate("/")}
        >
          gaia
        </Button>
        {/* 
        <div className="flex justify-center w-full items-center">
          <Button variant="light" radius="none" size="md" onPress={() => navigate("features")}>Features</Button>
          <Button variant="light" radius="none" size="md" onPress={() => navigate("pricing")}>Pricing</Button>
          <Button variant="light" radius="none" size="md" onPress={() => navigate("feedback")}>Survey</Button>
        </div> */}

        {!isMobileScreen ? (
          <div className="flex items-center gap-1">
            {/* <FeedbackFormBtn
              props={{
                size: "md",
                color: "default",
                variant: "light",
              }}
              text="Survey"
            /> */}

            {!!user ? (
              <Button
                variant="shadow"
                color="primary"
                radius="full"
                size="md"
                className="font-medium text-xl"
                endContent={<Chatting01Icon color="foreground" width="17" />}
                onPress={() => navigate("/try/chat")}
              >
                Chat
              </Button>
            ) : (
              <>
                <Button
                  variant="light"
                  color="primary"
                  radius="full"
                  size="md"
                  className="p-0 font-semibold"
                  onPress={() => navigate("/login")}
                >
                  Login
                </Button>

                <Button
                  variant="shadow"
                  color="primary"
                  radius="full"
                  size="md"
                  className="p-0 font-semibold"
                  onPress={() => navigate("/signup")}
                >
                  Signup
                </Button>
              </>
            )}
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
