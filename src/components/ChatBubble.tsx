"use client";

import { motion } from "framer-motion";
import React from "react";
import { BubbleConfig } from "./BubblePitFooter";

export const ChatBubble: React.FC<BubbleConfig> = ({
  x,
  y,
  size,
  component,
}) => {
  return (
    <motion.div
      className="absolute cursor-grab active:cursor-grabbing"
      style={{ x, y, width: size, height: size }}
      drag
      dragElastic={0.2}
      dragMomentum={false}
      whileHover={{ scale: 1.2, rotate: 1.5 }}
      whileTap={{ scale: 0.9 }}
    >
      {/* Render the injected component with its custom props */}
      {component}
    </motion.div>
  );
};
