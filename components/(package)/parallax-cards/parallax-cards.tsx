"use client";

import * as React from "react";
import { useScroll, useTransform, motion } from "motion/react";

import { cn } from "@/lib/utils";

import type { MotionValue } from "motion";

interface ParallaxCardsProps {
  children: React.ReactNode[];
  maxStackedCards?: number;
  top?: string;
  forceParallax?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

interface CardProps {
  index: number;
  scrollYProgress: MotionValue<number>;
  maxStackedCards: number;
  totalCards: number;
  children: React.ReactNode | string;
  top: string;
  sticky: boolean;
  forceParallax: boolean;
}

export function ParallaxCards({
  maxStackedCards = 3,
  top = "30px",
  forceParallax = false,
  className,
  style,
  children,
}: ParallaxCardsProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [sticky, setSticky] = React.useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const totalCards = children.length;

  React.useEffect(() => {
    if (forceParallax) return;

    const element = containerRef.current;
    if (!element) return;

    const handleMediaQuery = ({ matches }: { matches: boolean }) =>
      setSticky(matches);

    const cardHeight = element.getBoundingClientRect().height / totalCards;
    const mediaQuery = window.matchMedia(`(min-height : ${cardHeight}px)`); // should add resize listener if child’s height is dynamic

    handleMediaQuery(mediaQuery);
    mediaQuery.addEventListener("change", handleMediaQuery);

    return () => mediaQuery.removeEventListener("change", handleMediaQuery);
  }, [totalCards, forceParallax]);

  return (
    <>
      <style>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      <motion.div
        ref={containerRef}
        className={cn("relative w-full !py-0", className)}
        style={{
          display: "grid",
          gridTemplateRows: `repeat(${totalCards},1fr)`,
          ...style,
        }}
      >
        {children.map((child, index) => (
          <Card
            key={`cards[${index}]`}
            index={index}
            scrollYProgress={scrollYProgress}
            totalCards={totalCards}
            maxStackedCards={maxStackedCards}
            top={top}
            sticky={sticky}
            forceParallax={forceParallax}
          >
            {child}
          </Card>
        ))}
      </motion.div>
    </>
  );
}

const Card = ({
  index,
  scrollYProgress,
  maxStackedCards,
  totalCards,
  children,
  top,
  sticky,
  forceParallax,
}: CardProps) => {
  const topMagnitude = parseFloat(top);
  const topUnit = top.slice(String(topMagnitude).length) || "px";

  if (topUnit == "%") throw new Error("% as spacing unit is not supported.");

  const fullTop = topMagnitude + topUnit;
  const scrollRatio = 1 / totalCards;

  const y = useTransform(
    scrollYProgress,
    [
      index * scrollRatio,
      (index + maxStackedCards - 1) * scrollRatio,
      (index + maxStackedCards) * scrollRatio,
    ],
    [
      "0",
      `-${fullTop}`,
      `${-topMagnitude - topMagnitude / (maxStackedCards - 1)}${topUnit}`, // 0, -top, -top - top/(maxStackedCards - 1)
    ],
  );

  const scale = useTransform(
    scrollYProgress,
    [index * scrollRatio, (index + maxStackedCards) * scrollRatio],
    [1, 0.85],
  );

  const opacity = useTransform(
    scrollYProgress,
    [
      (index + maxStackedCards - 1) * scrollRatio,
      (index + maxStackedCards) * scrollRatio,
    ],
    [1, 0],
  );

  return (
    <motion.div
      style={{
        paddingTop: fullTop,
        position: sticky ? "sticky" : "relative",
      }}
      className="top-0 w-full px-3"
    >
      <motion.div
        style={
          sticky
            ? {
                scale,
                opacity,
                y,
                maxHeight: forceParallax
                  ? `calc(100svh - ${fullTop})`
                  : undefined,
              }
            : undefined
        }
        className="grid size-full origin-top overflow-hidden"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
