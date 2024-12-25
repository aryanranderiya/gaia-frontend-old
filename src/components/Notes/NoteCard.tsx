import { ScrollArea } from "@/components/ui/scroll-area";
import { Note } from "@/pages/Notes";
import { useState } from "react";
import { NoteDialog } from "@/components/Notes/NoteCardDialog";

export default function NoteCard({
  note,
  onDelete,
}: {
  note: Note;
  onDelete: (id: string) => void;
}) {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      {/* Note Card */}
      <div
        className="bg-white bg-opacity-20 min-w-[250px] max-w-[250px] max-h-[250px] rounded-xl text-foreground flex p-[1em] flex-col justify-end overflow-hidden gap-1 cursor-pointer"
        onClick={() => setOpenDialog(true)} // Open dialog on click
      >
        <span className="font-semibold text-xl whitespace-nowrap overflow-hidden overflow-ellipsis min-h-7 ">
          {note.title}
        </span>

        <ScrollArea>
          <span className="text-md">{note.description}</span>
        </ScrollArea>
      </div>

      {/* Note Dialog */}
      <NoteDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        note={note}
        onDelete={() => onDelete(note.id)} // Pass delete handler
      />
    </>
  );
}
