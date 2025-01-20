import { DashIcon } from "@radix-ui/react-icons";
import CharacterCount from "@tiptap/extension-character-count";
import Typography from "@tiptap/extension-typography";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  List,
  ListOrdered,
  Redo2,
  Undo2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@nextui-org/input";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { apiauth } from "@/utils/apiaxios";

// const TextTypeSelector = ({ editor }) => {
//   const currentTextType = editor.isActive("paragraph")
//     ? "Paragraph"
//     : editor.isActive("heading", { level: 1 })
//     ? "Heading 1"
//     : editor.isActive("heading", { level: 2 })
//     ? "Heading 2"
//     : editor.isActive("heading", { level: 3 })
//     ? "Heading 3"
//     : editor.isActive("heading", { level: 4 })
//     ? "Heading 4"
//     : editor.isActive("heading", { level: 5 })
//     ? "Heading 5"
//     : editor.isActive("heading", { level: 6 })
//     ? "Heading 6"
//     : "Paragraph"; // Default to Paragraph

//   const handleSelect = (value) => {
//     if (value === "paragraph") {
//       editor.chain().focus().setParagraph().run();
//     } else if (value === "heading-1") {
//       editor.chain().focus().toggleHeading({ level: 1 }).run();
//     } else if (value === "heading-2") {
//       editor.chain().focus().toggleHeading({ level: 2 }).run();
//     } else if (value === "heading-3") {
//       editor.chain().focus().toggleHeading({ level: 3 }).run();
//     } else if (value === "heading-4") {
//       editor.chain().focus().toggleHeading({ level: 4 }).run();
//     } else if (value === "heading-5") {
//       editor.chain().focus().toggleHeading({ level: 5 }).run();
//     } else if (value === "heading-6") {
//       editor.chain().focus().toggleHeading({ level: 6 }).run();
//     }
//   };

//   return (
//     <Select
//       onValueChange={handleSelect}
//       defaultValue={currentTextType.toLowerCase()}
//     >
//       <SelectTrigger className="outline-none border-none focus:!border-none w-fit space-x-3 hover:bg-black/30 focus:bg-black/30">
//         <SelectValue placeholder="Select Text Type" />
//       </SelectTrigger>
//       <SelectContent className="bg-zinc-900 border-none text-foreground-300 active:bg-zinc-800 ">
//         <SelectItem
//           value="heading-1"
//           className="hover:!bg-zinc-600 focus:!bg-zinc-600  hover:!text-white focus:!text-white"
//         >
//           <h1>Heading 1</h1>
//         </SelectItem>
//         <SelectItem
//           value="heading-2"
//           className="hover:!bg-zinc-600 focus:!bg-zinc-600  hover:!text-white focus:!text-white"
//         >
//           <h2>Heading 2</h2>
//         </SelectItem>
//         <SelectItem
//           value="heading-3"
//           className="hover:!bg-zinc-600 focus:!bg-zinc-600  hover:!text-white focus:!text-white"
//         >
//           <h3>Heading 3</h3>
//         </SelectItem>
//         <SelectItem
//           value="heading-4"
//           className="hover:!bg-zinc-600 focus:!bg-zinc-600  hover:!text-white focus:!text-white"
//         >
//           <h4>Heading 4</h4>
//         </SelectItem>
//         <SelectItem
//           value="heading-5"
//           className="hover:!bg-zinc-600 focus:!bg-zinc-600  hover:!text-white focus:!text-white"
//         >
//           <h5>Heading 5</h5>
//         </SelectItem>
//         <SelectItem
//           value="heading-6"
//           className="hover:!bg-zinc-600 focus:!bg-zinc-600  hover:!text-white focus:!text-white"
//         >
//           <h6>Heading 6</h6>
//         </SelectItem>
//         <SelectItem
//           value="paragraph"
//           className="hover:!bg-zinc-600 focus:!bg-zinc-600  hover:!text-white focus:!text-white"
//         >
//           <p>Paragraph</p>
//         </SelectItem>
//       </SelectContent>
//     </Select>
//   );
// };

const limit = 10000;
export interface Note {
  id: string;
  title: string;
  description: string;
}

export const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  const TextTypeSelector = () => {
    const currentTextType = editor.isActive("paragraph")
      ? "Paragraph"
      : editor.isActive("heading", { level: 1 })
      ? "Heading 1"
      : editor.isActive("heading", { level: 2 })
      ? "Heading 2"
      : editor.isActive("heading", { level: 3 })
      ? "Heading 3"
      : editor.isActive("heading", { level: 4 })
      ? "Heading 4"
      : editor.isActive("heading", { level: 5 })
      ? "Heading 5"
      : editor.isActive("heading", { level: 6 })
      ? "Heading 6"
      : "Paragraph";

    const handleSelect = (value) => {
      if (value === "paragraph") {
        editor.chain().focus().setParagraph().run();
      } else if (value.startsWith("heading-")) {
        const level = Number.parseInt(value.split("-")[1]);
        editor.chain().focus().toggleHeading({ level }).run();
      }
    };

    return (
      <Select
        onValueChange={handleSelect}
        defaultValue={currentTextType.toLowerCase().replace(" ", "-")}
      >
        <SelectTrigger className="outline-none border-none focus:!border-none w-fit space-x-3 hover:bg-black/30 focus:bg-black/30">
          <SelectValue placeholder="Select Text Type" />
        </SelectTrigger>
        <SelectContent className="bg-zinc-900 border-none text-foreground-300 active:bg-zinc-800">
          {[
            "Heading 1",
            "Heading 2",
            "Heading 3",
            "Heading 4",
            "Heading 5",
            "Heading 6",
            "Paragraph",
          ].map((type) => (
            <SelectItem
              key={type}
              value={type.toLowerCase().replace(" ", "-")}
              className="hover:!bg-zinc-600 focus:!bg-zinc-600 hover:!text-white focus:!text-white"
            >
              {type === "Paragraph" ? (
                <p>{type}</p>
              ) : (
                React.createElement(`h${type.split(" ")[1]}`, {}, type)
              )}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  };

  return (
    <div className="w-full p-2 bg-black/40 rounded-xl gap-1 mb-5 flex flex-row items-center">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-white/30" : ""}
      >
        B
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${
          editor.isActive("italic") ? "bg-white/30" : ""
        } !font-serif italic`}
      >
        I
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`${
          editor.isActive("underline") ? "bg-white/30" : ""
        } !font-serif underline`}
      >
        U
      </Button>
      <TextTypeSelector />
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "bg-white/30" : ""}
      >
        <List />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "bg-white/30" : ""}
      >
        <ListOrdered />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <DashIcon />
      </Button>
      <div className="flex items-center ml-auto mr-5">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo2 color={editor.can().undo() ? "white" : "grey"} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo2 color={editor.can().redo() ? "white" : "grey"} />
        </Button>
      </div>
      <div
        className={`text-sm pr-3 ${
          editor?.storage?.characterCount?.characters() === 2000
            ? "text-red-500"
            : "text-primary"
        }`}
      >
        {editor?.storage?.characterCount?.characters()} / 2000 characters
      </div>
    </div>
  );
};

const BubbleMenuComponent = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <div className="flex w-fit gap-5 bg-zinc-950 px-3 py-1 rounded-md">
        {/* Bold Button */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          B
        </button>

        {/* Italic Button */}
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${
            editor.isActive("italic") ? "is-active" : ""
          } !font-serif italic`}
        >
          I
        </button>

        {/* Heading 1 Button */}
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
        >
          <Heading1 />
        </button>

        {/* Heading 2 Button */}
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
        >
          <Heading2 />
        </button>

        {/* Heading 3 Button */}
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
        >
          <Heading3 />
        </button>

        {/* Heading 4 Button */}
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive("heading", { level: 4 }) ? "is-active" : ""
          }
        >
          <Heading4 />
        </button>

        {/* Heading 5 Button */}
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={
            editor.isActive("heading", { level: 5 }) ? "is-active" : ""
          }
        >
          <Heading5 />
        </button>

        {/* Heading 6 Button */}
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={
            editor.isActive("heading", { level: 6 }) ? "is-active" : ""
          }
        >
          <Heading6 />
        </button>
      </div>
    </BubbleMenu>
  );
};

// ... (keep other imports from your original file)

export default function NotesAdd() {
  const [note, setNote] = useState({ id: "", title: "", note: "" });
  const [oldNote, setOldNote] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    console.log("note", note);
    console.log("note.note", note.note);
    console.log("oldNote", oldNote);
    console.log(note.note != oldNote);

    if (note.note != oldNote) setHasUnsavedChanges(true);
    else setHasUnsavedChanges(false);
  }, [note, oldNote]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Typography,
      Underline,
      // CharacterCount.configure({ limit: 2000 }),
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
      setNote((prev) => {
        return { ...prev, note };
      });
    },
  });

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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote((prev) => ({ ...prev, title: e.target.value }));
    setHasUnsavedChanges(true);
  };

  const saveNote = async () => {
    try {
      const method = id ? "PUT" : "POST";
      const url = id ? `/notes/${id}` : `/notes`;
      const response = await apiauth[method.toLowerCase()](url, {
        note: note.note,
      });

      // Handle response if needed
      setHasUnsavedChanges(false);
      // Optionally, show a success message here
    } catch (error) {
      console.error("Error saving note:", error);
      // Optionally, show an error message here
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-screen h-screen w-full">
      <div className="min-h-screen h-screen pt-3 flex flex-col">
        <Input
          value={note.title}
          onChange={handleTitleChange}
          variant="underlined"
          placeholder="Title"
          size="lg"
          classNames={{
            input: "!text-5xl font-medium",
            inputWrapper: "border-none",
          }}
        />
        {editor && (
          <>
            <MenuBar editor={editor} />
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
