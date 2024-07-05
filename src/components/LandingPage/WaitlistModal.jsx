import * as React from "react";
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
} from "../Dialog";
import {
  ArrowUpRight01Icon,
  Mail01Icon,
  SquareLock02Icon,
  Calendar01Icon,
  Cancel01Icon,
} from "../icons";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function WaitListButton({ props, text = "Join the waitlist" }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        color="primary"
        radius="full"
        variant="shadow"
        className="arrow_diagonal_btn  font-medium"
        onPress={() => setOpen(true)}
        endContent={
          <ArrowUpRight01Icon
            className="arrow_diagonal"
            color="primary"
            width="15"
            height="15"
          />
        }
        size="lg"
        {...props}
      >
        {text}
      </Button>
      <WaitListModal open={open} setOpen={setOpen} />
    </>
  );
}

export function WaitListModal({ open, setOpen }) {
  const [loading, setLoading] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [successfullySubmitted, setSuccessfullySubmitted] =
    React.useState(false);

  function validateEmail(value) {
    if (value === "") return false;
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    return regex.test(value);
  }

  function isOnlyLetters(text) {
    if (text === "") return false;
    return /^[A-Za-z]+$/.test(text);
  }

  const isInvalidEmail = React.useMemo(() => {
    return !validateEmail(email);
  }, [email]);

  const isFirstNameInvalid = React.useMemo(() => {
    return !isOnlyLetters(firstName);
  }, [firstName]);

  const isLastNameInvalid = React.useMemo(() => {
    return !isOnlyLetters(lastName);
  }, [lastName]);

  function clearInputs() {
    setEmail("");
    setFirstName("");
    setLastName("");
  }

  const SubmitForm = async () => {
    setLoading(true);
    setSubmitted(false);
    if (
      validateEmail(email) &&
      isOnlyLetters(firstName) &&
      isOnlyLetters(lastName)
    ) {
      try {
        const response = await api.post("/waitlistSignup", {
          email,
          firstName,
          lastName,
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

  React.useEffect(() => {
    if (open) {
      setSubmitted(false);
      setSuccessfullySubmitted(false);
    }
  }, [open]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") SubmitForm();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-zinc-900 text-white border-none ">
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
                    radius="full"
                    className="w-fit"
                  >
                    Close
                  </Button>
                </div>
              </DialogClose>
            </>
          ) : (
            <>
              <div className="flex gap-3 dark pb-2">
                <Input
                  isRequired
                  type="text"
                  label="First Name"
                  variant="faded"
                  value={firstName}
                  onValueChange={setFirstName}
                  isInvalid={submitted && isFirstNameInvalid}
                  color={submitted && isFirstNameInvalid ? "danger" : "primary"}
                  errorMessage="Please only enter letters"
                  onKeyDown={handleKeyDown}
                />

                <Input
                  isRequired
                  type="text"
                  label="Last Name"
                  variant="faded"
                  value={lastName}
                  onValueChange={setLastName}
                  isInvalid={submitted && isLastNameInvalid}
                  color={submitted && isLastNameInvalid ? "danger" : "primary"}
                  errorMessage="Please only enter letters"
                  onKeyDown={handleKeyDown}
                />
              </div>

              <Input
                isRequired
                type="email"
                label="Email"
                variant="faded"
                placeholder="name@example.com"
                startContent={<Mail01Icon height="21" />}
                value={email}
                onValueChange={setEmail}
                isInvalid={submitted && isInvalidEmail}
                color={submitted && isInvalidEmail ? "danger" : "primary"}
                errorMessage="Please enter a valid email"
                onKeyDown={handleKeyDown}
                className="dark"
              />

              <div className="flex text-xs text-zinc-500 items-center justify-center mt-4">
                <SquareLock02Icon height="15" /> Your data is safe and secure
                with us.
              </div>

              <div className="flex w-full justify-center pt-3 gap-3">
                <DialogClose asChild>
                  <Button
                    color="danger"
                    variant="light"
                    startContent={
                      <Cancel01Icon color="foreground" width="20" />
                    }
                    radius="full"
                  >
                    Cancel
                  </Button>
                </DialogClose>

                <Button
                  children={"Signup"}
                  color="primary"
                  onPress={SubmitForm}
                  endContent={<Calendar01Icon color="foreground" width="20" />}
                  radius="full"
                  isLoading={loading}
                />
              </div>
            </>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
