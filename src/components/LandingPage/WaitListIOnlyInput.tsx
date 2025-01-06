import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import * as React from "react";
import { toast } from "sonner";
import api from "@/utils/apiaxios";
import createConfetti from "./CreateConfetti.js";
import { CheckmarkCircle02Icon } from "../icons";

export default function WaitlistOnlyInput() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("");
  const [submitted, setSubmitted] = React.useState<boolean>(false);
  const [succesfullySubmitted, setSuccessfulySubmitted] =
    React.useState<boolean>(false);

  function validateEmail(value: string): boolean {
    if (value === "") return false;
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    return regex.test(value.trim());
  }

  const isInvalidEmail = React.useMemo(() => !validateEmail(email), [email]);

  function clearInputs() {
    setEmail("");
  }

  const SubmitForm = async () => {
    setLoading(true);
    setSubmitted(false);

    if (validateEmail(email)) {
      try {
        const response = await api.post("/waitlistSignup", { email });
        console.log(response.data.message);

        clearInputs();
        createConfetti();
        setSuccessfulySubmitted(true);
      } catch (error) {
        console.log(error);
        toast.error("Uh oh! Something went wrong.", {
          classNames: {
            toast:
              "flex items-center p-3 rounded-xl gap-3 w-[350px] toast_error",
            title: "text-sm",
            description: "text-sm",
          },
          duration: 3000,
          description: "There was a problem signing up.\n",
        });
      }
    } else {
      toast.error("Uh oh! Something went wrong.", {
        classNames: {
          toast: "flex items-center p-3 rounded-xl gap-3 w-[350px] toast_error",
          title: "text-sm",
          description: "text-sm",
        },
        duration: 3000,
        description: "Please enter a valid email.\n",
      });
    }

    setSubmitted(true);
    setLoading(false);
  };

  // Handle key down events
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") SubmitForm();
  };

  return (
    <div className="flex gap-2 w-[220px] mt-2 justify-center">
      {!succesfullySubmitted ? (
        <>
          <Input
            isRequired
            type="email"
            variant="faded"
            placeholder="name@example.com"
            description="Signup for the waitlist"
            value={email}
            onValueChange={(value) => setEmail(value.trim())}
            isInvalid={submitted && isInvalidEmail}
            color={submitted && isInvalidEmail ? "danger" : "primary"}
            errorMessage="Please enter a valid email"
            isClearable
            onKeyDown={handleKeyDown}
            className="w-full flex-shrink-0"
          />
          <Button
            children={"Signup"}
            color="primary"
            onPress={SubmitForm}
            variant="shadow"
            size="md"
            isLoading={loading}
            className="font-medium w-full px-2 flex-shrink min-w-[100px]"
          />
        </>
      ) : (
        <Button
          color="success"
          variant="shadow"
          size="md"
          className="font-medium w-full px-2 flex-shrink min-w-[100px] cursor-default"
          isIconOnly
          endContent={<CheckmarkCircle02Icon />}
          disableRipple
        >
          Thank you for signing up! &nbsp;
        </Button>
      )}
    </div>
  );
}
