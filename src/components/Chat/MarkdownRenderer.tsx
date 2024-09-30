import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { Task01Icon, TaskDone01Icon } from "../icons";
import { Button } from "@nextui-org/button";

interface MarkdownRendererProps {
  content: string;
}

const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || "");

  const handleCopy = () => {
    navigator.clipboard.writeText(String(children).replace(/\n$/, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 4000);
  };

  return !inline && match ? (
    <div className="relative flex flex-col gap-0">
      <div className="flex justify-between items-center bg-black bg-opacity-60 text-white px-4 py-1 !rounded-t-[15px] !rounded-b-none mb-[-0.5em]">
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
        className="m-0"
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    </div>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
}) => {
  return (
    <div className="prose dark:prose-invert max-w-none">
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
          p: ({ node, ...props }) => <p className="mb-4" {...props} />,
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
    </div>
  );
};
