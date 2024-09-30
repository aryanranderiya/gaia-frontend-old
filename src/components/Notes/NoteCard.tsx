import { ScrollArea } from "@/components/ui/scroll-area";
import { Note } from "@/pages/Notes";

export default function NoteCard({ note }: { note: Note }) {
  return (
    <div className="bg-white bg-opacity-20 aspect-square min-w-[30%] max-w-[30%] rounded-xl text-foreground flex p-[1em] flex-col justify-end overflow-hidden gap-1">
      <ScrollArea>
        <span className="text-sm">{note.description}</span>
      </ScrollArea>
      <span className="font-semibold text-lg whitespace-nowrap overflow-hidden overflow-ellipsis min-h-7">
        {note.title}
      </span>
    </div>
  );
}
