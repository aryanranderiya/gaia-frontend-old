import { cn } from "@/lib/utils";

export function SimpleChatBubbleUser({
  children,
  hideMobile = false,
  className = "",
}: {
  children: any;
  hideMobile?: boolean;
  className?: string;
}) {
  if (hideMobile) return <></>;

  return (
    <div className={`chat_bubble_container user ${className}`}>
      <div className="chat_bubble user !select-none">
        {/* <div className="flex select-text text-wrap max-w-[30vw]"> */}
        {children}
        {/* </div> */}
      </div>
    </div>
  );
}

export function SimpleChatBubbleBot({
  className,
  children,
}: {
  children: any;
  className?: string;
}) {
  return (
    <div className={"relative flex items-end gap-3"}>
      {/* <div className="pingspinner relative" /> */}
      <div className={cn("chat_bubble bg-zinc-800 !select-none", className)}>
        {children}
      </div>
    </div>
  );
}
