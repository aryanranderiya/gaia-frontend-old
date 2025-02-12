"use client";

import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { MessageCircle } from "lucide-react";
import { SimpleChatBubbleBot } from "./Chat/ChatBubbles/SimpleChatBubbles";

interface ChatBubbleProps {
  x: number;
  y: number;
  size: number;
  color: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  x,
  y,
  size,
  color,
}) => {
  return (
    <motion.div
      className="absolute cursor-grab active:cursor-grabbing"
      style={{ x, y }}
      drag
      dragElastic={0.2}
      dragMomentum={false}
      whileHover={{ scale: 1.2, rotate: 1.5 }}
      whileTap={{ scale: 0.9 }}
      // dragConstraints={{
      //   left: 0,
      //   right: 0,
      //   top: 0,
      //   bottom: 0,
      // }}
    >
      <SimpleChatBubbleBot>hey there!</SimpleChatBubbleBot>
    </motion.div>
  );
};

const BUBBLE_COUNT = 10;
const COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"];

const BubblePitFooter: React.FC = () => {
  const [bubbles, setBubbles] = useState<
    { x: number; y: number; size: number; color: string }[]
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      const newBubbles = Array.from({ length: BUBBLE_COUNT }, () => ({
        x: Math.random() * (width - 40),
        y: Math.random() * (height - 40),
        size: 20 + Math.random() * 20,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
      setBubbles(newBubbles);
    }
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const { left, top, width, height } =
        containerRef.current.getBoundingClientRect();
      const mouseX = event.clientX - left;
      const mouseY = event.clientY - top;

      setBubbles((prevBubbles) =>
        prevBubbles.map((bubble) => {
          const dx = mouseX - bubble.x;
          const dy = mouseY - bubble.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 100;

          let newX = bubble.x;
          let newY = bubble.y;

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            const moveX = (dx / distance) * force * 5;
            const moveY = (dy / distance) * force * 5;

            newX = bubble.x - moveX;
            newY = bubble.y - moveY;
          }

          // Collision detection with container walls
          if (newX < 0 || newX + bubble.size > width) {
            newX = Math.max(0, Math.min(newX, width - bubble.size));
          }
          if (newY < 0 || newY + bubble.size > height) {
            newY = Math.max(0, Math.min(newY, height - bubble.size));
          }

          return {
            ...bubble,
            x: newX,
            y: newY,
          };
        })
      );
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className="fixed bottom-0 left-0 w-full min-h-[20vh] h-[20vh] overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {bubbles.map((bubble, index) => (
        <ChatBubble key={index} {...bubble} />
      ))}
    </motion.div>
  );
};

export default BubblePitFooter;
