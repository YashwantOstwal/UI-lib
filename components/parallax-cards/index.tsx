"use client";
import * as React from "react";
import { useScroll, useTransform, motion } from "motion/react";
import type { ParallaxCardsProps, CardProps } from "./parallax-cards.types";

export default function ParallaxCards({
  maxStackedCards = 3,
  top = "30px",
  forceParallax = false,
  children,
}: ParallaxCardsProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [sticky, setSticky] = React.useState(true);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const childrenCount = children.length;

  React.useEffect(() => {
    if (forceParallax) return;

    const element = containerRef.current;

    if (!element) return;
    const handleMediaQuery = ({ matches }: { matches: boolean }) =>
      setSticky(matches);

    const cardHeight = element.getBoundingClientRect().height / childrenCount;
    const mediaQuery = window.matchMedia(`(min-height : ${cardHeight}px)`);
    handleMediaQuery(mediaQuery);
    mediaQuery.addEventListener("change", handleMediaQuery);

    return () => mediaQuery.removeEventListener("change", handleMediaQuery);
  }, [childrenCount, forceParallax]);
  return (
    <>
      <style>
        {`
      html{
      scroll-behaviour:smooth;}
      `}
      </style>
      <motion.div
        ref={containerRef}
        className="relative mb-8 grid !py-0"
        style={{
          gridTemplateRows: `repeat(${childrenCount},1fr)`,
        }}
      >
        {children.map((child, index) => (
          <Card
            key={`cards[${index}]`}
            index={index}
            scrollYProgress={scrollYProgress}
            totalCards={childrenCount}
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
      `${-topMagnitude - topMagnitude / (maxStackedCards - 1)}${topUnit}`, // 0 , -top,- top - top/(maxStackedCards - 1)
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
    <>
      <motion.div
        style={{
          paddingTop: fullTop,
          position: sticky ? "sticky" : "relative",
        }}
        className="top-0 px-3"
      >
        <motion.div
          style={
            sticky
              ? {
                  scale,
                  opacity,
                  y,
                  maxHeight: forceParallax
                    ? `calc(100vh - ${fullTop})`
                    : undefined,
                }
              : undefined
          }
          className="grid size-full origin-top overflow-hidden"
        >
          {children}
        </motion.div>
      </motion.div>
    </>
  );
};
