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
} from "../icons";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

import { Confetti, ConfettiFireworks } from "../MagicUI/confetti";
import * as React from "react";

export default function WaitListButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        color="primary"
        radius="full"
        variant="shadow"
        className="arrow_diagonal_btn font-medium"
        onClick={onOpen}
        endContent={
          <ArrowUpRight01Icon
            className="arrow_diagonal"
            color="primary"
            width="15"
            height="15"
          />
        }
      >
        Join the waitlist
      </Button>
      <WaitListModal
        onOpen={onOpen}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
}

export function WaitListModal({ onOpen, isOpen, onOpenChange }) {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="dark text-foreground"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center text-center">
                Join the Waitlist
                <span className="text-sm font-normal">
                  We'll be sending you an email once we launch, featuring
                  exclusive perks including a Pro subscription for free!"
                </span>
              </ModalHeader>
              <ModalBody>
                <div className="flex gap-3">
                  <Input
                    isRequired
                    type="text"
                    label="First Name"
                    color="primary"
                    variant="faded"
                  />

                  <Input
                    isRequired
                    type="text"
                    label="Last Name"
                    color="primary"
                    variant="faded"
                  />
                </div>

                <Input
                  isRequired
                  type="email"
                  label="Email"
                  color="primary"
                  variant="faded"
                  placeholder="name@example.com"
                  startContent={<Mail01Icon height="21" />}
                />
                <div className="flex text-xs text-zinc-500 items-center justify-center mt-4">
                  <SquareLock02Icon height="15" /> Your data is safe and secure
                  with us.
                </div>
              </ModalBody>
              <ModalFooter className="justify-center">
                <Button
                  color="danger"
                  variant="flat"
                  onPress={onClose}
                  startContent={<Cancel01Icon color="foreground" width="20" />}
                >
                  Cancel
                </Button>
                {/* <Button>Signup</Button> */}
                <ConfettiFireworks
                  children={"Signup"}
                  color="primary"
                  onPress={() => {
                    onClose();
                  }}
                  endContent={<Calendar01Icon color="foreground" width="20" />}
                />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
