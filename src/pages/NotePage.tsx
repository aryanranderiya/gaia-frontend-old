import CharacterCount from "@tiptap/extension-character-count";
import { Button } from "@/components/ui/button";
import Typography from "@tiptap/extension-typography";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BubbleMenuComponent from "@/components/Notes/BubbleMenu";
import { MenuBar } from "@/components/Notes/NotesMenuBar";
import { apiauth } from "@/utils/apiaxios";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { all, createLowlight } from "lowlight";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "sonner";
import { CircleX, TriangleAlert } from "lucide-react";
// import { Input } from "@nextui-org/input";

export default function NotesAdd() {
  const { id } = useParams();
  const location = useLocation();
  const [note, setNote] = useState({ id: "", title: "", note: "" });
  const [oldNote, setOldNote] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  // const [oldTitle, setOldTitle] = useState("");
  // const lowlight = createLowlight(all);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Typography,
      Underline,
      // CodeBlockLowlight.configure({
      //   lowlight,
      // }),
      CharacterCount.configure({ limit: 10_000 }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "Enter a title for your note";
          }
          return "Write something for GAIA to remember...";
        },
      }),
    ],
    content: note.note,
    onUpdate: ({ editor }) => {
      const note = editor.getHTML();

      if (note.length == 9500) {
        toast.custom(() => (
          <div className="bg-[#ffecd8] list-none py-2 px-4 rounded-md flex flex-row items-center gap-3 text-[#dc7609] font-medium w-full justify-evenly text-nowrap">
            <TriangleAlert
              fill="#dc7609"
              color="#ffecd8"
              width={30}
              height={30}
              className="min-w-[30px]"
            />
            <span>
              You are reaching the maximum character limit of a note. (10k
              characters)
            </span>
          </div>
        ));
      } else if (note.length == 10_000) {
        toast.custom(() => (
          <div className="bg-[#ffe1e1] list-none py-2 px-4 rounded-md flex flex-row items-center gap-3 text-[#e60000] font-medium w-full justify-evenly text-nowrap">
            <CircleX
              fill="#e60000"
              color="#ffe1e1"
              width={30}
              height={30}
              className="min-w-[30px]"
            />
            <span>
              You have reached the maximum character limit of a note. (10k
              characters)
            </span>
          </div>
        ));
      }

      setNote((prev) => {
        return { ...prev, note };
      });
    },
  });

  const unsavedChanges = useMemo(() => {
    return (
      note.note !== oldNote && editor?.storage?.characterCount?.characters() > 0
    );
  }, [note, oldNote, editor]);

  useEffect(() => {
    setHasUnsavedChanges(hasUnsavedChanges);
  }, [unsavedChanges]);

  const fetchNote = useCallback(async () => {
    if (id) {
      try {
        // const response = await fetch(`${API_URL}/notes/${id}`);
        // if (!response.ok) throw new Error("Failed to fetch note");
        // const data = await response.json();
        const response = await apiauth.get(`/notes/${id}`);
        console.log(response.data);
        setNote(response.data);
        setOldNote(response.data.note);
        // setOldTitle(response.data.title);
        setHasUnsavedChanges(false);
        editor?.commands.setContent(response.data.note);
      } catch (error) {
        console.error("Error fetching note:", error);
      }
    }
    setIsLoading(false);
  }, [id, editor]);

  useEffect(() => {
    if (location.pathname === "/notes/add") {
      setIsLoading(false);
    } else {
      fetchNote();
    }
  }, [location, fetchNote]);

  // const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setNote((prev) => ({ ...prev, title: e.target.value }));
  //   setHasUnsavedChanges(true);
  // };

  const saveNote = async () => {
    try {
      const method = id ? "PUT" : "POST";
      const url = id ? `/notes/${id}` : `/notes`;
      const response = await apiauth[method.toLowerCase()](url, {
        note: note.note,
      });

      toast.success("Note has been created");

      setHasUnsavedChanges(false);
    } catch (error) {
      console.error("Error saving note:", error);
      toast.error("Uh oh! Something went wrong.", {
        classNames: {
          toast: "flex items-center p-3 rounded-xl gap-3 w-[350px] toast_error",
          title: " text-sm",
          description: "text-sm",
        },
        duration: 3000,
        description:
          "There was a problem with saving this Note. Please try again later.\n",
      });
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-screen h-screen w-full">
      <div className="min-h-screen h-screen pt-3 flex flex-col editor">
        {/* <Toaster position="top-right" /> */}

        {editor && (
          <>
            <BubbleMenuComponent editor={editor} />
            <MenuBar editor={editor} />
            {/* 
            <Input
              value={note.title}
              onChange={handleTitleChange}
              variant="underlined"
              placeholder="Title"
              size="lg"
              className="mb-2 no-underline after:bg-transparent"
              classNames={{
                input: "!text-5xl font-medium",
                inputWrapper: "border-none !px-0 after:bg-transparent",
              }}
            /> */}

            <EditorContent editor={editor} className="min-h-screen" />
          </>
        )}
      </div>
      <div
        className={`fixed bottom-4 right-4 bg-[#00bbff] p-5 rounded-lg shadow-lg  transition-all duration-200 ${
          hasUnsavedChanges
            ? "opacity-100 pointer-events-auto scale-100"
            : "opacity-0 pointer-events-none scale-80"
        }`}
      >
        <p className="text-white mb-2 font-medium text-xl">
          You have unsaved changes!
        </p>
        <Button onClick={saveNote} size={"lg"} disabled={!hasUnsavedChanges}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
