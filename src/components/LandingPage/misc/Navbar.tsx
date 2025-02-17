import { useUser } from "@/contexts/UserContext";
import useMediaQuery from "@/hooks/MediaQuery";
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
          response?.data?.picture
        );
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
          to={"/"}
          variant="light"
          radius="full"
          size="md"
          className="text-xl font-medium"
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
          <Sheet onOpenChange={setOpen} open={open}>
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
                    color="default"
                    // variant="ghost"
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

                  {user ? (
                    <Button
                      variant="shadow"
                      color="primary"
                      radius="full"
                      size="md"
                      className="font-medium"
                      onPress={() => {
                        navigate("/try/chat");
                        setOpen(false);
                      }}
                      endContent={
                        <BubbleConversationChatIcon
                          color="foreground"
                          width="17"
                        />
                      }
                    >
                      Chat
                    </Button>
                  ) : (
                    <Button
                      as={Link}
                      to={"/get-started"}
                      variant="shadow"
                      color="primary"
                      size="md"
                      className="p-0 px-4 font-semibold"
                    >
                      Get Started
                    </Button>
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
                variant="shadow"
                color="primary"
                radius="full"
                size="md"
                className="font-medium"
                as={Link}
                to={"/try/chat"}
                endContent={
                  <BubbleConversationChatIcon color="foreground" width="17" />
                }
              >
                Chat
              </Button>
            ) : (
              <Button
                as={Link}
                variant="shadow"
                color="primary"
                radius="full"
                size="md"
                to={"/get-started"}
                className="p-0 px-4 font-semibold"
              >
                Get Started
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
