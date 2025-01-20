import { Input } from "@nextui-org/input";
import { DashIcon } from "@radix-ui/react-icons";
import BulletList from "@tiptap/extension-bullet-list";
import CharacterCount from "@tiptap/extension-character-count";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
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

import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const TextTypeSelector = ({ editor }) => {
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
    : "Paragraph"; // Default to Paragraph

  const handleSelect = (value) => {
    if (value === "paragraph") {
      editor.chain().focus().setParagraph().run();
    } else if (value === "heading-1") {
      editor.chain().focus().toggleHeading({ level: 1 }).run();
    } else if (value === "heading-2") {
      editor.chain().focus().toggleHeading({ level: 2 }).run();
    } else if (value === "heading-3") {
      editor.chain().focus().toggleHeading({ level: 3 }).run();
    } else if (value === "heading-4") {
      editor.chain().focus().toggleHeading({ level: 4 }).run();
    } else if (value === "heading-5") {
      editor.chain().focus().toggleHeading({ level: 5 }).run();
    } else if (value === "heading-6") {
      editor.chain().focus().toggleHeading({ level: 6 }).run();
    }
  };

  return (
    <Select
      onValueChange={handleSelect}
      defaultValue={currentTextType.toLowerCase()}
    >
      <SelectTrigger className="outline-none border-none focus:!border-none w-fit space-x-3 hover:bg-black/30 focus:bg-black/30">
        <SelectValue placeholder="Select Text Type" />
      </SelectTrigger>
      <SelectContent className="bg-zinc-900 border-none text-foreground-300 active:bg-zinc-800 ">
        <SelectItem
          value="heading-1"
          className="hover:!bg-zinc-600 focus:!bg-zinc-600  hover:!text-white focus:!text-white"
        >
          <h1>Heading 1</h1>
        </SelectItem>
        <SelectItem
          value="heading-2"
          className="hover:!bg-zinc-600 focus:!bg-zinc-600  hover:!text-white focus:!text-white"
        >
          <h2>Heading 2</h2>
        </SelectItem>
        <SelectItem
          value="heading-3"
          className="hover:!bg-zinc-600 focus:!bg-zinc-600  hover:!text-white focus:!text-white"
        >
          <h3>Heading 3</h3>
        </SelectItem>
        <SelectItem
          value="heading-4"
          className="hover:!bg-zinc-600 focus:!bg-zinc-600  hover:!text-white focus:!text-white"
        >
          <h4>Heading 4</h4>
        </SelectItem>
        <SelectItem
          value="heading-5"
          className="hover:!bg-zinc-600 focus:!bg-zinc-600  hover:!text-white focus:!text-white"
        >
          <h5>Heading 5</h5>
        </SelectItem>
        <SelectItem
          value="heading-6"
          className="hover:!bg-zinc-600 focus:!bg-zinc-600  hover:!text-white focus:!text-white"
        >
          <h6>Heading 6</h6>
        </SelectItem>
        <SelectItem
          value="paragraph"
          className="hover:!bg-zinc-600 focus:!bg-zinc-600  hover:!text-white focus:!text-white"
        >
          <p>Paragraph</p>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

const limit = 2000;
export interface Note {
  id: string;
  title: string;
  description: string;
}

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="w-full px-6 py-2 bg-black/40 rounded-lg gap-5 mb-5 flex flex-row items-center">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        B
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${
          editor.isActive("italic") ? "is-active" : ""
        } !font-serif italic`}
      >
        I
      </button>

      <TextTypeSelector editor={editor} />
      {/* <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "is-active" : ""}
      >
        code
      </button> */}
      {/* <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </button> */}

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <List />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        <ListOrdered />
      </button>

      {/* <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        <Quote />
      </button> */}
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <DashIcon />
      </button>
      <div className="flex gap-1 items-center ml-auto">
        <button
          onClick={() => editor?.chain().focus().undo().run()}
          disabled={!editor?.can().undo()}
        >
          <Undo2 color={editor?.can().undo() ? "white" : "grey"} />
        </button>
        <button
          onClick={() => editor?.chain().focus().redo().run()}
          disabled={!editor?.can().redo()}
        >
          <Redo2 color={editor?.can().redo() ? "white" : "grey"} />
        </button>
      </div>

      <div
        className={`text-sm ${
          editor?.storage.characterCount.characters() === limit
            ? "text-danger-500"
            : "text-primary "
        }`}
      >
        {editor?.storage.characterCount.characters()} / {limit} characters
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

export default function NotesAdd() {
  // const [note, setNote] = useState("");

  const content = ``;

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      BulletList,
      Highlight,
      StarterKit,
      Typography,
      CharacterCount.configure({
        limit,
      }),
      Placeholder.configure({
        // placeholder: "My Custom Placeholder",
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "Enter a title for your note";
          }

          return "Write something for GAIA to remember...";
        },
      }),
    ],
    content,
  });

  return (
    <>
      <div className="flex flex-col justify-between min-h-screen h-screen w-full">
        {/* Menu Bar */}

        <div className="min-h-screen h-screen pt-3 flex flex-col">
          {/* <Input
            variant="underlined"
            placeholder="Title"
            size="lg"
            classNames={{
              input: "!text-5xl font-medium",
              inputWrapper: "border-none",
            }}
          /> */}
          {/* <div className="bg-black/20 p-3 rounded-xl no-preflight"> */}
          {editor && (
            <>
              <BubbleMenuComponent editor={editor} />
              <MenuBar editor={editor} />
              <EditorContent editor={editor} className="min-h-screen" />
            </>
          )}
          {/* </div> */}
        </div>
        {/* <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu> */}
        {/* <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu> */}
        {/* </div>
          </div>
        </ScrollArea> */}

        {/* <div className="bg-custom-gradient2 left-0 absolute bottom-0 w-full h-[100px] z-[1]" /> */}
      </div>
    </>
  );
}
