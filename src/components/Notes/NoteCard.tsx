import { ScrollArea } from "@/components/ui/scroll-area";
import { Note } from "@/pages/Notes";

export default function NoteCard({ note }: { note: Note }) {
  return (
    <div className="bg-white bg-opacity-20 min-w-[250px] max-w-[250px] max-h-[250px] rounded-xl text-foreground flex p-[1em] flex-col justify-end overflow-hidden gap-1">
      <span className="font-semibold text-xl whitespace-nowrap overflow-hidden overflow-ellipsis min-h-7">
        {note.title}
      </span>

      <ScrollArea>
        <span className="text-md">{note.description}</span>
      </ScrollArea>
    </div>
  );
}
