import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Children, useMemo, useRef } from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function AnimatedSection({
  children,
  staggerDelay = 0.2,
  className = "",
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isVisible = useIntersectionObserver(ref);

  // Memoize variants to prevent unnecessary recalculations
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          when: "beforeChildren",
          staggerChildren: staggerDelay,
        },
      },
    }),
    [staggerDelay]
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    }),
    []
  );

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className={cn(className)}
    >
      {Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
