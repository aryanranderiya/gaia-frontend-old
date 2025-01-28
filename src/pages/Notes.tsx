import { StickyNote01Icon } from "@/components/icons";
import NoteCard from "@/components/Notes/NoteCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { apiauth } from "@/utils/apiaxios";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export interface Note {
  id: string;
  // title?: string;
  // description?: string;
  content: string;
  plaintext: string;
}

export default function Notes() {
  // const [openDialog, setOpenDialog] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = await apiauth.get("/notes");
      setNotes(response?.data || []);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete a note
  const deleteNote = async (id: string) => {
    try {
      await apiauth.delete(`/notes/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-between h-full">
        <ScrollArea>
          <div className="flex items-center flex-col gap-2">
            <h1 className="font-bold text-center text-5xl">Notes</h1>
            <div className=" text-center text-md pb-6 max-w-screen-md">
              Add and store custom notes as memories for your AI assistant,
              enabling it to recall important details and provide more
              personalized interactions over time.
            </div>
          </div>

          {loading ? (
            <div className="h-[80vh] flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <div className="flex flex-wrap gap-4 justify-center pb-8 sm:px-[10vw]">
              <div className="flex flex-wrap gap-4">
                {notes.length > 0 &&
                  notes?.map((note, index) => (
                    <NoteCard key={index} note={note} onDelete={deleteNote} />
                  ))}
              </div>
            </div>
          )}
        </ScrollArea>

        <div className="absolute left-0 bottom-6 flex justify-center items-center w-full z-10">
          <Link to={"./add"}>
            <Button
              variant="shadow"
              color="primary"
              size="lg"
              radius="full"
              className="font-semibold gap-1"
            >
              <StickyNote01Icon width={27} height={27} />
              Add Note
            </Button>
          </Link>
        </div>
        <div className="bg-custom-gradient2 left-0 absolute bottom-0 w-full h-[100px] z-[1]" />
      </div>
      {/* <AddNoteDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        addNote={addNote}
      /> */}
    </>
  );
}
