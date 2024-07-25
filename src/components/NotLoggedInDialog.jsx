import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/Shadcn/Dialog";
import { Button } from "@nextui-org/button";
import { useNotLoggedDialogOpen } from "@/contexts/NotLoggedDialogOpen";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useClerk, SignedIn, SignedOut, SignInButton, SignIn, UserButton, RedirectToSignIn } from "@clerk/clerk-react";

export default function NotLoggedIn() {
  const { notLoggedDialogOpen, setNotLoggedDialogOpen } =
    useNotLoggedDialogOpen();

  const navigate = useNavigate();
  const clerk = useClerk();


  return (
    <SignedOut>

      <Dialog
        open={notLoggedDialogOpen}
        className="rounded-full"
      >
        <DialogContent className="bg-zinc-900 text-white border-none flex flex-col gap-3 md:rounded-2xl rounded-2xl max-w-[350px]">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl  select-text">
              Log in
            </DialogTitle>
            <DialogDescription className="text-center select-text text-sm">
              You have been Signed out.
              <br />
              Please login again to use GAIA!
            </DialogDescription>
          </DialogHeader>

          {/* <RedirectToSignIn /> */}

          {/* <div className="flex justify-center mt-2 gap-2"> */}
          {/* <Button variant="shadow" color="primary" radius="full" size="md" className="font-medium"
            endContent={<ArrowUpRight01Icon color="foreground" width="15" />}
          >Get Started</Button> */}



          <Button
            size="md"
            variant="flat"
            color="primary"
            onClick={() => {
              setNotLoggedDialogOpen(false);
              // navigate("/signup");
              clerk.openSignIn()

            }}
          >
            Login
          </Button>
          {/* </div> */}
        </DialogContent>
      </Dialog>
    </SignedOut>
  );
}
