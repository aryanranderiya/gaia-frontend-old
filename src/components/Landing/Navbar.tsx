import { useUser } from "@/contexts/UserContext";
import useMediaQuery from "@/hooks/mediaQuery";
import { Button } from "@heroui/button";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BubbleConversationChatIcon,
  Home01Icon,
  Menu01Icon,
} from "../Misc/icons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

export default function Navbar() {
  const { user } = useUser();
  const navigate = useNavigate();
  const isMobileScreen = useMediaQuery("(max-width: 600px)");
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="navbar">
      <div className="navbar_content bg-zinc-950 outline-[1px] outline outline-zinc-900 w-full max-w-screen-xl">
        <Button
          as={Link}
          className="text-xl font-medium"
          radius="full"
          size="md"
          to={"/"}
          variant="light"
        >
          gaia
        </Button>
        {/* 
      <div className="flex justify-center w-full items-center">
        <Button variant="light" radius="none" size="md" onPress={() => navigate("features")}>Features</Button>
        <Button variant="light" radius="none" size="md" onPress={() => navigate("pricing")}>Pricing</Button>
        <Button variant="light" radius="none" size="md" onPress={() => navigate("feedback")}>Survey</Button>
      </div> */}

        {isMobileScreen ? (
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger>
              <div className="rounded-full p-3">
                <Menu01Icon color="foreground" />
              </div>
            </SheetTrigger>
            <SheetContent className="dark text-foreground max-w-[250px] bg-zinc-900 border-none">
              <SheetHeader>
                <SheetTitle>
                  <VisuallyHidden.Root>Menu</VisuallyHidden.Root>
                </SheetTitle>
                <SheetDescription className="pt-12 gap-3 flex flex-col">
                  <Button
                    className="w-full flex justify-between"
                    endContent={
                      <Home01Icon color="foreground" width="20" height="20" />
                    }
                    color="default"
                    // variant="ghost"
                    onPress={() => {
                      navigate("/");
                      setSheetOpen(false);
                    }}
                  >
                    Home
                  </Button>

                  {user ? (
                    <Button
                      className="font-medium"
                      color="primary"
                      endContent={
                        <BubbleConversationChatIcon
                          color="foreground"
                          width="17"
                        />
                      }
                      radius="full"
                      size="md"
                      variant="shadow"
                      onPress={() => {
                        navigate("/c");
                        setSheetOpen(false);
                      }}
                    >
                      Chat
                    </Button>
                  ) : (
                    <>
                      <Button
                        as={Link}
                        className="p-0 px-4 font-semibold"
                        color="primary"
                        size="md"
                        variant="shadow"
                        to={"/login"}
                        // variant="light"
                      >
                        Login
                      </Button>

                      <Button
                        as={Link}
                        className="p-0 px-4 font-semibold"
                        color="primary"
                        size="md"
                        to={"/get-started"}
                        variant="shadow"
                      >
                        Get Started
                      </Button>
                    </>
                  )}

                  {/* 
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
                </Button> */}

                  {/* <WaitListButton
                  text="Waitlist Signup"
                  props={{
                    variant: "ghost",
                    size: "md",
                    radius: "md",
                    className: "font-normal",
                  }}
                /> */}
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        ) : (
          <div className="flex items-center gap-1">
            {user ? (
              <Button
                as={Link}
                className="font-medium"
                color="primary"
                endContent={
                  <BubbleConversationChatIcon color="foreground" width="17" />
                }
                radius="full"
                size="md"
                to={"/c"}
                variant="shadow"
              >
                Chat
              </Button>
            ) : (
              <>
                <Button
                  as={Link}
                  className="p-0 px-4 font-semibold"
                  color="primary"
                  radius="full"
                  size="md"
                  to={"/login"}
                  variant="light"
                >
                  Login
                </Button>

                <Button
                  as={Link}
                  className="p-0 px-4 font-semibold"
                  color="primary"
                  radius="full"
                  size="md"
                  to={"/get-started"}
                  variant="shadow"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
