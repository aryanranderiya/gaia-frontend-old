"use client";

import { useLoading } from "@/contexts/LoadingContext";
import { Button } from "@nextui-org/button";
import { Tab, Tabs } from "@nextui-org/tabs";
import { Download, Move, ZoomIn, ZoomOut } from "lucide-react";
import mermaid from "mermaid";
import type React from "react";
import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
// import { Prism, type SyntaxHighlighterProps } from "react-syntax-highlighter";
// import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { PrismAsyncLight, SyntaxHighlighterProps } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { Task01Icon, TaskDone01Icon } from "../icons";
import SuspenseLoader from "../SuspenseLoader";
const ReactMarkdown = lazy(() => import("react-markdown"));
const SyntaxHighlighter = PrismAsyncLight as any as React.FC<SyntaxHighlighterProps>;

interface MarkdownRendererProps {
  content: string;
}

mermaid.initialize({});

const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
  const { isLoading } = useLoading();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("code");
  const [scale, setScale] = useState(1.5);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const mermaidRef = useRef<HTMLDivElement>(null);
  const match = /language-(\w+)/.exec(className || "");
  const isMermaid = match && match[1] === "mermaid";

  useEffect(() => {
    mermaid.contentLoaded();
  }, [isLoading, activeTab]);

  useEffect(() => {
    if (!isLoading) setActiveTab("preview");
  }, [isLoading]);

  const handleCopy = () => {
    navigator.clipboard.writeText(String(children).replace(/\n$/, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 4000);
  };

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.1, 4));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5));

  const resetZoom = () => setScale(1.5);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      setStartPosition({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    },
    [position]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - startPosition.x,
          y: e.clientY - startPosition.y,
        });
      }
    },
    [isDragging, startPosition]
  );

  const handleMouseUp = () => setIsDragging(false);

  const handleDownload = () => {
    if (!mermaidRef.current) return;

    const svgData = new XMLSerializer().serializeToString(
      mermaidRef.current.querySelector("svg")!
    );
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = "mermaid-diagram.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault(); // This will now work because we're using a non-passive event listener
    const delta = e.deltaY * -0.01;
    setScale((prevScale) => Math.min(Math.max(prevScale + delta, 0.5), 3));
  }, []);

  useEffect(() => {
    const element = mermaidRef.current;
    if (element) {
      element.addEventListener("wheel", handleWheel, { passive: false });
      return () => {
        element.removeEventListener("wheel", handleWheel);
      };
    }
  }, [handleWheel]);

  if (isMermaid) {
    return (
      <div className="relative flex flex-col gap-0 bg-zinc-900 !pb-0 !rounded-t-[15px] w-[40vw]">
        <Tabs
          selectedKey={activeTab}
          onSelectionChange={(key) => {
            setActiveTab(key as string);
            setTimeout(() => {
              mermaid.contentLoaded();
            }, 10);
          }}
          disabledKeys={isLoading ? ["editor"] : []}
          variant="underlined"
          className="px-3"
        >
          <Tab key="preview" title="Flowchart" className="p-0">
            <div className="p-4 bg-white relative overflow-hidden h-[400px]">
              <div
                ref={mermaidRef}
                className="mermaid absolute select-none"
                style={{
                  transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                  transformOrigin: "0 0",
                  cursor: isDragging ? "grabbing" : "grab",
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                // onWheel={handleWheel}
              >
                {String(children).replace(/\n$/, "")}
              </div>
              <div className="absolute bottom-2 right-2 flex gap-2">
                <Button size="sm" onClick={handleZoomIn}>
                  <ZoomIn size={16} />
                </Button>
                <Button size="sm" onClick={handleZoomOut}>
                  <ZoomOut size={16} />
                </Button>
                <Button size="sm" onClick={resetZoom}>
                  Reset Zoom
                </Button>
                <Button
                  size="sm"
                  onClick={() => setPosition({ x: -50, y: -50 })}
                >
                  {" "}
                  {/* Update 3: Reset position */}
                  <Move size={16} />
                </Button>
                <Button size="sm" onClick={handleDownload}>
                  <Download size={16} />
                </Button>
              </div>
            </div>
          </Tab>
          <Tab key="code" title="Code">
            <SyntaxHighlighter
              {...(props as any)}
              style={vscDarkPlus}
              language="mermaid"
              PreTag="div"
              className="m-0 p-0 !bg-black !text-[10px]"
              showLineNumbers
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          </Tab>
        </Tabs>
        <Button
          onPress={handleCopy}
          size="sm"
          variant="light"
          className="absolute top-2 right-2 text-foreground hover:text-gray-300 text-xs"
        >
          {copied ? (
            <div className="flex flex-row gap-1 items-center">
              <TaskDone01Icon width={21} color="foreground" />
              <p>Copied!</p>
            </div>
          ) : (
            <div className="flex flex-row gap-1 items-center">
              <Task01Icon width={21} color="foreground" />
              <p>Copy Code</p>
            </div>
          )}
        </Button>
      </div>
    );
  }

  return (
    <>
      {!inline && match ? (
        <div className="relative flex flex-col gap-0 ">
          <div className="flex justify-between items-center bg-zinc-900  text-white px-4 py-1 !rounded-t-[15px] !rounded-b-none mb-[-0.5em] !sticky top-0">
            <span className="text-sm font-mono monospace">{match[1]}</span>
            <Button
              onPress={handleCopy}
              size="sm"
              variant="light"
              className="text-foreground hover:text-gray-300 text-xs"
            >
              {copied ? (
                <div className="flex flex-row gap-1 items-center">
                  <TaskDone01Icon width={21} color="foreground" />
                  <p>Copied!</p>
                </div>
              ) : (
                <div className="flex flex-row gap-1 items-center">
                  <Task01Icon width={21} color="foreground" />
                  <p>Copy Code</p>
                </div>
              )}
            </Button>
          </div>
          <SyntaxHighlighter
            style={vscDarkPlus}
            language={match[1]}
            PreTag="div"
            className="m-0 !bg-black !text-[10px]"
            showLineNumbers
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code
          className={className + " bg-black bg-opacity-40 rounded-sm"}
          {...props}
        >
          {children}
        </code>
      )}
    </>
  );
};

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
}) => {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <Suspense fallback={<SuspenseLoader />}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code: CodeBlock,
            h1: ({ node, ...props }) => (
              <h1 className="text-3xl font-bold mt-6 mb-4" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-2xl font-bold mt-5 mb-3" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="text-xl font-bold mt-4 mb-2" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul className="list-disc pl-6 mb-4" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-decimal pl-6 mb-4" {...props} />
            ),
            li: ({ node, ...props }) => <li className="mb-1" {...props} />,
            a: ({ node, ...props }) => (
              <a
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              />
            ),
            blockquote: ({ node, ...props }) => (
              <blockquote
                className="border-l-4 border-gray-300 pl-4 italic my-4"
                {...props}
              />
            ),
            img: ({ node, ...props }) => (
              <img className="max-w-full h-auto my-4" {...props} />
            ),
            table: ({ node, ...props }) => (
              <div className="overflow-x-auto">
                <table
                  className="min-w-full border-collapse border border-gray-300 rounded-md"
                  {...props}
                />
              </div>
            ),
            thead: ({ node, ...props }) => (
              <thead className="bg-gray-200 bg-opacity-20" {...props} />
            ),
            tbody: ({ node, ...props }) => <tbody {...props} />,
            tr: ({ node, ...props }) => (
              <tr className="border-b border-gray-300" {...props} />
            ),
            th: ({ node, ...props }) => (
              <th className="px-4 py-2 text-left font-bold" {...props} />
            ),
            td: ({ node, ...props }) => <td className="px-4 py-2" {...props} />,
          }}
        >
          {content}
        </ReactMarkdown>
      </Suspense>
    </div>
  );
};

export default MarkdownRenderer;
