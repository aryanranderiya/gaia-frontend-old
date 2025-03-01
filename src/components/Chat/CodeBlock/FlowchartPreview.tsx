import React, { useCallback, useEffect, useRef, useState } from "react";
import { Tooltip } from "@heroui/tooltip";
import { Button } from "@heroui/button";
import { Download, ZoomIn, ZoomOut } from "lucide-react";

interface FlowchartPreviewProps {
  children: React.ReactNode;
}

const FlowchartPreview: React.FC<FlowchartPreviewProps> = ({ children }) => {
  const mermaidRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1.5);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.1, 10));
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
    e.preventDefault();
    const delta = e.deltaY * -0.01;
    setScale((prevScale) => Math.min(Math.max(prevScale + delta, 0.5), 10));
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
    <div className="p-4 bg-white relative overflow-hidden h-[50vh] ">
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
        {String(children).replace(/\n$/, "")}
      </div>
      <div className="absolute bottom-2 right-2 flex gap-1 items-center">
        <div className="flex items-center p-1 !rounded-xl gap-1">
          <Tooltip content="Zoom Out">
            <Button size="sm" onPress={handleZoomOut} isIconOnly>
              <ZoomOut size={18} />
            </Button>
          </Tooltip>
          <Tooltip content="Reset Zoom">
            <Button size="sm" onPress={resetZoom}>
              Reset
            </Button>
          </Tooltip>
          <Tooltip content="Zoom In">
            <Button size="sm" onPress={handleZoomIn} isIconOnly>
              <ZoomIn size={18} />
            </Button>
          </Tooltip>
        </div>
        <Tooltip content="Download Flowchart (.svg)">
          <Button size="sm" onPress={handleDownload} isIconOnly>
            <Download size={18} />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default FlowchartPreview;
