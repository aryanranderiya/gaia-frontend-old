import { Button } from "@heroui/button";
import { Tab, Tabs } from "@heroui/tabs";
import { Download, ZoomIn, ZoomOut } from "lucide-react";
import mermaid from "mermaid";
import { Key, useCallback, useEffect, useRef, useState } from "react";
import {
  SimpleChatBubbleBot,
  SimpleChatBubbleUser,
} from "@/components/Chat/ChatBubbles/SimpleChatBubbles";
import { FlowchartIcon, Task01Icon, TaskDone01Icon } from "@/components/icons";
import LandingPage1Layout from "@/layouts/LandingPage1";

mermaid.initialize({});

const FlowchartDemo = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("code");
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.contentLoaded();
  }, [activeTab]);

  const flowchartCode = `flowchart TD
  A[Define Product Vision] -->B{Market Research}
  B -->C[Identify Target Audience]
  C -->D[Create Product Roadmap]
  D -->E[Product Design and Development]
  E -->F[Product Testing and Refinement]
  F -->G[Finalize Product Details]
  G -->H[Launch Planning]
  H -->I[Schedule Launch Date]
  I -->J[Marketing and Promotion]
  J -->K[Product Launch]
  K -->L[Evaluate Launch Success]
  L -->M[Gather Feedback and Improve]
  M -->N[Repeat and Refine]
  style A fill:#00bbff, stroke:#00bbff, stroke-width:3px
  style B fill:#00bbff, stroke:#00bbff, stroke-width:3px
  style C fill:#00bbff, stroke:#00bbff, stroke-width:3px
  style D fill:#00bbff, stroke:#00bbff, stroke-width:3px
  style E fill:#00bbff, stroke:#00bbff, stroke-width:3px
  style F fill:#00bbff, stroke:#00bbff, stroke-width:3px
  style G fill:#00bbff, stroke:#00bbff, stroke-width:3px
  style H fill:#00bbff, stroke:#00bbff, stroke-width:3px
  style I fill:#00bbff, stroke:#00bbff, stroke-width:3px
  style J fill:#00bbff, stroke:#00bbff, stroke-width:3px
  style K fill:#00bbff, stroke:#00bbff, stroke-width:3px
  style L fill:#00bbff, stroke:#00bbff, stroke-width:3px
  style M fill:#00bbff, stroke:#00bbff, stroke-width:3px
  style N fill:#00bbff, stroke:#00bbff, stroke-width:3px`;

  const handleCopy = () => {
    navigator.clipboard.writeText(String(flowchartCode).replace(/\n$/, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 4000);
  };

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.1, 4));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5));

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
    e.preventDefault();
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
    <LandingPage1Layout
      heading={"Create flowcharts"}
      subheading={"Easily turn ideas into clear, interactive visuals instantly"}
      icon={
        <FlowchartIcon color="#9b9b9b" className="sm:size-[30px] size-[30px]" />
      }
    >
      <div className="w-100% flex justify-end">
        <div className="w-[95%]">
          <SimpleChatBubbleUser>
            How can I plan a product launch for my SaaS?
          </SimpleChatBubbleUser>
        </div>
      </div>

      <SimpleChatBubbleBot className={"!rounded-2xl"}>
        <div className="mb-3">
          Here is a flowchart to help you plan a product launch:
        </div>
        <div className="relative flex flex-col gap-0 bg-zinc-950 !rounded-[15px] overflow-hidden">
          <Tabs
            selectedKey={activeTab}
            onSelectionChange={(key: Key) => {
              setActiveTab(key as string);
              setTimeout(() => {
                mermaid.contentLoaded();
              }, 10);
            }}
            variant="underlined"
            className="px-3"
          >
            <Tab key="preview" title="Flowchart" className="p-0">
              <div className="p-4 bg-zinc-950 relative overflow-hidden h-[320px] ">
                <div
                  ref={mermaidRef}
                  className="mermaid absolute select-none "
                  style={{
                    transform: `scale(${scale}) translate(${25}px, ${
                      position.y
                    }px)`,
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
                  <Button size="sm" onPress={handleZoomIn}>
                    <ZoomIn size={16} />
                  </Button>
                  <Button size="sm" onPress={handleZoomOut}>
                    <ZoomOut size={16} />
                  </Button>
                  <Button size="sm" onPress={handleDownload}>
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
      {/* </div> */}
      {/* // </div> */}
    </LandingPage1Layout>
  );
};

export default FlowchartDemo;
