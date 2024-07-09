import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../Dialog";
import * as React from "react";
import { StarsIcon } from "../icons";
import { Button } from "@nextui-org/button";

export default function ComingSoonModal({ open, setOpen }) {
  return (
    <Dialog open={open} onOpenChange={setOpen} className="rounded-full">
      <DialogContent className="bg-zinc-900 text-white border-none flex flex-col gap-3 md:rounded-2xl rounded-2xl max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl  select-text">
            Coming Soon!
          </DialogTitle>
          <DialogDescription className="text-center  select-text">
            What's coming soon?
          </DialogDescription>
        </DialogHeader>

        <img
          src="https://media.licdn.com/dms/image/D4D22AQEXAhBLeOGz8Q/feedshare-shrink_2048_1536/0/1720402539349?e=1723680000&v=beta&t=WWA3AWiaM--K0fgi24FTObeCZWGBVnwrOkZ5X9gmrI0"
          alt="Coming Soon Image"
          className="rounded-xl max-w-[600px] object-cover max-h-[200px]"
          loading="eager"
        />

        <span className="text-sm text-justify select-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dolor
          dolor, varius vitae suscipit nec, ultrices eu sapien. Donec eu
          venenatis metus, et tempus justo. Quisque vestibulum eget dui sed
          sagittis. Maecenas ultricies tortor sapien, a fermentum purus lacinia
          eu. In nisi nisi, ultrices quis lectus nec, feugiat rutrum erat.
        </span>

        <div className="flex justify-between mt-2 w-full">
          <DialogClose>
            <Button size="sm" variant="light" color="danger">
              Close
            </Button>
          </DialogClose>
          <Button size="sm" variant="flat" color="primary">
            Next
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
