// import { NoteDialog } from "@/components/Notes/NoteCardDialog";
import { Note } from "@/pages/Notes";
// import { useState } from "react";
import { convert } from "html-to-text";
import { Link } from "react-router-dom";
import { TriangleFilledIcon } from "../icons";
import { TriangleRight } from "lucide-react";

export default function NoteCard({
  note,
}: // onDelete,
{
  note: Note;
  onDelete?: (id: string) => void;
}) {
  // const [openDialog, setOpenDialog] = useState(false);

  return (
    <Link to={`./${note.id}`}>
      <div
        className="bg-white/20 hover:bg-[#00bbff80] hover:-translate-y-1 transition-all min-w-[250px] max-w-[250px] max-h-[250px] rounded-xl text-foreground flex p-[1em] flex-col justify-start overflow-hidden gap-1 cursor-pointer h-full relative"
        // onClick={() => setOpenDialog(true)} // Open dialog on click
      >
        {/* <div className="absolute rotate-[-90deg] top-[-3px] -right-2 shadow-sm">
          <TriangleRight
            height={45}
            width={45}
            fill="#ffffff50"
            color="transparent"
          />
        </div> */}
        <div className="font-normal text-md whitespace-wrap overflow-hidden overflow-ellipsis min-h-7 max-h-[100px]">
          {convert(note.note)}
        </div>

        {/* <ScrollArea>
        <span className="text-md">{note.note}</span>
      </ScrollArea> */}
      </div>

      {/* Note Dialog */}
      {/* <NoteDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        note={note}
        onDelete={() => onDelete(note.id)} // Pass delete handler
      /> */}
    </Link>
  );
}
