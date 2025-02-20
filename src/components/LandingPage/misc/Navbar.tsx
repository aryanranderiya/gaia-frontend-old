import { Button } from "@heroui/button";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  BubbleConversationChatIcon,
  Home01Icon,
  Menu01Icon,
} from "../../icons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";

import useMediaQuery from "@/hooks/MediaQuery";
import { useUser } from "@/contexts/UserContext";
// import WaitListButton from "./WaitlistModal";
import { apiauth } from "@/utils/apiaxios";

export default function Navbar() {
  const { user, setUserData } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobileScreen = useMediaQuery("(max-width: 600px)");

  const [open, setOpen] = useState(false);

  useEffect(() => {
    // LoadTranslationModel();
    const fetchUserInfo = async () => {
      try {
        const response = await apiauth.get("/oauth/me", {
          withCredentials: true,
        });

        setUserData(
          response?.data?.name,
          response?.data?.email,
          response?.data?.picture,
        );

        if (
          location.pathname == "/login" ||
          location.pathname == "/signup" ||
          location.pathname == "/get-started"
        )
          navigate("/try/chat");
      } catch (err) {
        if (location.pathname.startsWith("/try")) navigate("/get-started");
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="navbar">
      <div className="navbar_content bg-zinc-950 outline outline-zinc-900 w-full max-w-screen-xl">
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
          <Sheet open={open} onOpenChange={setOpen}>
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
                      setOpen(false);
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
                        navigate("/try/chat");
                        setOpen(false);
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
                to={"/try/chat"}
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
