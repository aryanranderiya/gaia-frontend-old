import { useState } from "react";

export default function MailCompose(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div
      className={`absolute bottom-0 right-3 overflow-hidden transition-all duration-500 ${
        open ? "w-[50vw] h-[50vh] bg-zinc-900" : "w-[250px] h-10 bg-primary"
      } rounded-t-lg text-white p-2 px-3 shadow-xl`}
    >
      <div
        className="w-full flex justify-between cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="font-medium">Create new Email</div>
        {open ? <span>⌄</span> : <span>⌃</span>}
      </div>
    </div>
  );
}
