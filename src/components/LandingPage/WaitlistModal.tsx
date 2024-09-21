import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { toast } from "sonner";
import api from "../../apiaxios";
import PartySmiley from "../Smileys/20.webp";
import createConfetti from "./CreateConfetti";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../Shadcn/Dialog";
import {
  ArrowUpRight01Icon,
  Mail01Icon,
  Calendar01Icon,
  Cancel01Icon,
} from "../icons";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useEffect, useMemo, useState } from "react";

export default function WaitListButton({
  props,
  text = "Signup for the Waitlist",
  secondarytext = "",
  iconsize = 15,
}: {
  props: any;
  text?: string;
  secondarytext?: string;
  iconsize?: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        color="primary"
        radius="full"
        variant="shadow"
        className="arrow_diagonal_btn"
        onPress={() => setOpen(true)}
        endContent={
          <ArrowUpRight01Icon
            className="arrow_diagonal"
            color="primary"
            width={iconsize}
            height={iconsize}
          />
        }
        size="lg"
        {...props}
      >
        <div>
          <span className="font-medium">{text}</span>
          {secondarytext && <span>{secondarytext}</span>}
        </div>
      </Button>
      <WaitListModal open={open} setOpen={setOpen} />
    </>
  );
}

export function WaitListModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [successfullySubmitted, setSuccessfullySubmitted] = useState(false);

  function validateEmail(value: string) {
    if (value === "") return false;
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    return regex.test(value.trim());
  }
  const isInvalidEmail = useMemo(() => {
    return !validateEmail(email);
  }, [email]);

  function clearInputs() {
    setEmail("");
  }

  const SubmitForm = async () => {
    setLoading(true);
    setSubmitted(false);
    if (validateEmail(email)) {
      try {
        const response = await api.post("/waitlistSignup", {
          email,
        });
        console.log(response.data.message);

        clearInputs();
        createConfetti();
        setSuccessfullySubmitted(true);
      } catch (error) {
        console.log(error);
        toast.error("Uh oh! Something went wrong.", {
          classNames: {
            toast:
              "flex items-center p-3 rounded-xl gap-3 w-[350px] toast_error",
            title: " text-sm",
            description: "text-sm",
          },
          duration: 3000,
          description: "There was a problem signing up.\n",
        });
      }
    } else console.log("invalid form");

    setLoading(false);
    setSubmitted(true);
  };

  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setSuccessfullySubmitted(false);
    }
  }, [open]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") SubmitForm();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-zinc-900 text-white border-none max-w-md flex justify-center items-center">
        <DialogHeader>
          <DialogTitle className="text-center">
            {successfullySubmitted
              ? "Thank You for joining the Waitlist!"
              : "Join the Waitlist"}
          </DialogTitle>
          <DialogDescription className="pb-3 text-center">
            We'll be sending you an email once we launch, featuring exclusive
            perks including a Pro subscription for free!
          </DialogDescription>
          {successfullySubmitted ? (
            <>
              <div className="w-full flex justify-center">
                <img
                  src={PartySmiley}
                  alt="Smiley face party"
                  width={230}
                  height={230}
                />
              </div>
              <DialogClose asChild>
                <div className="flex justify-center w-full">
                  <Button
                    color="success"
                    variant="flat"
                    onPress={() => setOpen(false)}
                    startContent={
                      <Cancel01Icon color="foreground" width="20" />
                    }
                    radius="lg"
                    className="w-fit"
                  >
                    Close
                  </Button>
                </div>
              </DialogClose>
            </>
          ) : (
            <div className="flex w-full flex-col items-center">
              <Input
                isRequired
                type="email"
                label="Email"
                variant="faded"
                placeholder="name@example.com"
                startContent={<Mail01Icon height="21" />}
                value={email}
                onValueChange={(value) => setEmail(value.trim())}
                isInvalid={submitted && isInvalidEmail}
                color={submitted && isInvalidEmail ? "danger" : "primary"}
                errorMessage="Please enter a valid email"
                onKeyDown={handleKeyDown}
                className="dark max-w-sm"
              />

              <div className="flex w-full justify-center pt-3 gap-3">
                <DialogClose asChild>
                  <Button
                    color="danger"
                    variant="light"
                    startContent={
                      <Cancel01Icon color="foreground" width="20" />
                    }
                    radius="lg"
                  >
                    Cancel
                  </Button>
                </DialogClose>

                <Button
                  children={"Signup"}
                  color="primary"
                  onPress={SubmitForm}
                  endContent={<Calendar01Icon color="foreground" width="20" />}
                  radius="lg"
                  isLoading={loading}
                />
              </div>
            </div>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
