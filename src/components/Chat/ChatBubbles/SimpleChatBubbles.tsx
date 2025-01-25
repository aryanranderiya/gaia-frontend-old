export function SimpleChatBubbleUser({ children }: { children: any }) {
  return (
    <div className="chat_bubble_container user">
      <div className="chat_bubble user !select-none">
        {/* <div className="flex select-text text-wrap max-w-[30vw]"> */}
        {children}
        {/* </div> */}
      </div>
    </div>
  );
}

export function SimpleChatBubbleBot({ children }: { children: any }) {
  return (
    <div className="relative flex items-end gap-3">
      {/* <div className="pingspinner relative" /> */}
      <div className="chat_bubble bg-zinc-800 !select-none">{children}</div>
    </div>
  );
}
