import * as React from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import confetti from "canvas-confetti";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import {
  ArrowUpRight01Icon,
  Mail01Icon,
  SquareLock02Icon,
  Calendar01Icon,
  Cancel01Icon,
  CheckmarkBadge01Icon,
} from "../icons";
import { toast } from "sonner";
import api from "../../apiaxios";
import PartySmiley from "../Smileys/20.webp";

export default function WaitListButton({ props }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <Button
        color="primary"
        radius="full"
        variant="shadow"
        className="arrow_diagonal_btn  font-medium"
        onClick={onOpen}
        endContent={
          <ArrowUpRight01Icon
            className="arrow_diagonal"
            color="primary"
            width="15"
            height="15"
          />
        }
        {...props}
      >
        Join the waitlist
      </Button>
      <WaitListModal
        onOpen={onOpen}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />
    </>
  );
}

function createConfetti() {
  const duration = 4 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 1,
  };
  const randomInRange = (min, max) => Math.random() * (max - min) + min;

  const interval = window.setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      zIndex: 100,
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      zIndex: 100,
    });
  }, 250);
}

export function WaitListModal({ onOpen, isOpen, onOpenChange, onClose }) {
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
    setSubmitted(true);
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
        toast.error("Uh oh! Something went wrong.", {
          classNames: {
            toast:
              "flex items-center p-3 rounded-xl gap-3 w-[350px] toast_error",
            title: " text-sm",
            description: "text-sm",
          },
          duration: 3000,
          description: "There was a problem signing up.\n" + error,
        });
      }
    } else {
      console.log("invalid");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") SubmitForm();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="dark text-foreground"
        backdrop="blur"
        placement="center"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 items-center text-center">
            {successfullySubmitted
              ? "Thank You for joining the Waitlist!"
              : "Join the Waitlist"}
            <span className="text-sm font-normal">
              We'll be sending you an email once we launch, featuring exclusive
              perks including a Pro subscription for free!
            </span>
          </ModalHeader>
          {successfullySubmitted ? (
            <ModalBody>
              <div className="w-full flex justify-center">
                <img
                  src={PartySmiley}
                  alt="Smiley face party"
                  width={230}
                  height={230}
                />
              </div>
            </ModalBody>
          ) : (
            <ModalBody>
              <div className="flex gap-3">
                <Input
                  isRequired
                  type="text"
                  label="First Name"
                  variant="faded"
                  value={firstName}
                  onValueChange={setFirstName}
                  isInvalid={submitted && isFirstNameInvalid}
                  color={
                    submitted && isFirstNameInvalid ? "default" : "primary"
                  }
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
                  color={submitted && isLastNameInvalid ? "default" : "primary"}
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
                color={submitted && isInvalidEmail ? "default" : "primary"}
                errorMessage="Please enter a valid email"
                onKeyDown={handleKeyDown}
              />
              <div className="flex text-xs text-zinc-500 items-center justify-center mt-4">
                <SquareLock02Icon height="15" /> Your data is safe and secure
                with us.
              </div>
            </ModalBody>
          )}

          <ModalFooter className="justify-center">
            {successfullySubmitted ? (
              <Button
                color="success"
                variant="flat"
                onPress={onClose}
                startContent={<Cancel01Icon color="foreground" width="20" />}
              >
                Close
              </Button>
            ) : (
              <>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={onClose}
                  startContent={<Cancel01Icon color="foreground" width="20" />}
                >
                  Cancel
                </Button>

                <Button
                  children={"Signup"}
                  color="primary"
                  onPress={SubmitForm}
                  endContent={<Calendar01Icon color="foreground" width="20" />}
                />
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
