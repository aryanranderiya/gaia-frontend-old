import { Children, useMemo, useRef } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";
import { LazyMotion, domAnimation, m } from "motion/react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function AnimatedSection({
  children,
  staggerDelay = 0.4,
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
    <LazyMotion features={domAnimation}>
      <m.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className={cn(className)} // Ensure cn is optimized
      >
        {Children.map(children, (child, index) => (
          <m.div key={index} variants={itemVariants}>
            {child}
          </m.div>
        ))}
      </m.div>
    </LazyMotion>
  );
}
