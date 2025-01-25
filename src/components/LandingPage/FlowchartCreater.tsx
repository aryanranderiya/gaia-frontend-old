import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@nextui-org/button";
import mermaid from "mermaid";
import { Tab, Tabs } from "@nextui-org/tabs";
import { Download, Move, ZoomIn, ZoomOut } from "lucide-react";
import { FlowchartIcon, Task01Icon, TaskDone01Icon } from "../icons";
import { ResetIcon } from "@radix-ui/react-icons";
import {
  SimpleChatBubbleBot,
  SimpleChatBubbleUser,
} from "../Chat/ChatBubbles/SimpleChatBubbles";
import { SectionHeading } from "./SectionHeading";

mermaid.initialize({});

const FlowchartDemo = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("code");
  const [scale, setScale] = useState(1.5);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.contentLoaded();
  }, [activeTab]);

  const flowchartCode = `flowchart TD
  A["Client Request"] --> B["Load Balancer"]
  B --> C["Web Server"]
  C --> D["Application Server"]
  D --> E{"Authentication"}
  E -->|"Yes"| F["Database"]
  E -->|"No"| G["Error Page"]
  F -->|"Data Retrieved"| H["Application Logic"]
  H --> I["Processed Data"]
  I --> J["Web Server"]
  J --> K["Client Response"]
  G --> K`;

  const handleCopy = () => {
    navigator.clipboard.writeText(String(flowchartCode).replace(/\n$/, ""));
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

  return (
    <div className="h-screen flex flex-row justify-center items-center gap-5">
      <div className="flex items-start flex-col justify-center h-full gap-5">
        <SectionHeading
          heading={"Create flowcharts with ease"}
          subheading={
            "Turn ideas into clear, interactive visuals instantly—using Mermaid"
          }
          icon={<FlowchartIcon color="#ffffff90" width={45} height={45} />}
        />
      </div>
      <div className="min-w-[37vw] w-fit space-y-4 bg-black p-10 rounded-3xl">
        <SimpleChatBubbleUser>
          Explain how a full-stack web application works using a simple
          flowchart
        </SimpleChatBubbleUser>

        <SimpleChatBubbleBot>
          <div className="mb-3">
            Here's a simple flowchart explaining how a full-stack web
            application works:
          </div>
          <div className="relative flex flex-col gap-0 bg-zinc-900 !rounded-t-[15px] w-[500px] pb-8">
            <Tabs
              selectedKey={activeTab}
              onSelectionChange={(key) => {
                setActiveTab(key as string);
                setTimeout(() => {
                  mermaid.contentLoaded();
                }, 10);
              }}
              variant="underlined"
              className="px-3"
            >
              <Tab key="preview" title="Flowchart" className="p-0">
                <div className="p-4 bg-white relative overflow-hidden h-[400px] ">
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
                  >
                    {String(flowchartCode).replace(/\n$/, "")}
                  </div>
                  <div className="absolute bottom-2 right-2 flex gap-2">
                    <Button size="sm" onClick={handleZoomIn}>
                      <ZoomIn size={16} />
                    </Button>
                    <Button size="sm" onClick={handleZoomOut}>
                      <ZoomOut size={16} />
                    </Button>
                    <Button size="sm" onClick={handleDownload}>
                      <Download size={16} />
                    </Button>
                  </div>
                </div>
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
        </SimpleChatBubbleBot>
      </div>
    </div>
  );
};

export default FlowchartDemo;
