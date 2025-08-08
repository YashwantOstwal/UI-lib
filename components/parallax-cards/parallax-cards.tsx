"use client";
import * as React from "react";
import { useScroll, useTransform, motion } from "motion/react";
import { ParallaxCardsProps, CardProps } from "./parallax-cards.types";
import { cn } from "@/lib/utils";

const ParallaxCards = ({
  maxStackedCards = 3,
  top = "30px",
  children,
}: ParallaxCardsProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [sticky, setSticky] = React.useState(true);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const childrenCount = children.length;

  React.useEffect(() => {
    const handleResize = ({ matches }: { matches: boolean }) =>
      setSticky(matches);
    let mediaQuery: MediaQueryList;
    if (ref.current) {
      const cardHeight =
        ref.current.getBoundingClientRect().height / childrenCount;
      mediaQuery = window.matchMedia(`(min-height : ${cardHeight}px)`);
      handleResize(mediaQuery);
      mediaQuery.addEventListener("change", handleResize);
    }
    return () => {
      ref.current && mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);
  return (
    <>
      <style>
        {`
      html{
      scroll-behaviour:smooth;}
      `}
      </style>
      <motion.div
        ref={ref}
        className="relative mb-8 grid !p-0"
        style={{
          gridTemplateRows: `repeat(${childrenCount}, minmax(0, 1fr))`,
        }}
      >
        {children.map((child, index) => (
          <Card
            key={index}
            index={index}
            scrollYProgress={scrollYProgress}
            totalCards={childrenCount}
            maxStackedCards={maxStackedCards}
            top={top}
            sticky={sticky}
          >
            {child}
          </Card>
        ))}
      </motion.div>
    </>
  );
};
const Card = ({
  index,
  scrollYProgress,
  maxStackedCards,
  totalCards,
  children,
  top,
  sticky,
}: CardProps) => {
  const r = 1 / totalCards;

  const topMagnitude = parseFloat(top);
  const topUnit = top.slice(String(topMagnitude).length) || "px";
  if (topUnit == "%") throw new Error("% as spacing unit is not supported.");
  const fullTop = topMagnitude + topUnit;
  const y = useTransform(
    scrollYProgress,
    [
      index * r,
      (index + maxStackedCards - 1) * r,
      (index + maxStackedCards) * r,
    ],
    [
      "0",
      `-${fullTop}`,
      `${-topMagnitude - topMagnitude / (maxStackedCards - 1)}${topUnit}`,
    ],
    // 0 , -top,- top - top/(maxStackedCards - 1)
  );
  const scale = useTransform(
    scrollYProgress,
    [index * r, (index + maxStackedCards) * r],
    [1, 0.85],
  );
  const opacity = useTransform(
    scrollYProgress,
    [(index + maxStackedCards - 1) * r, (index + maxStackedCards) * r],
    [1, 0],
  );
  return (
    <>
      <style>{`
          [data-component="card"]{
          --max-h: calc(100vh - ${fullTop});
          }
    `}</style>
      <motion.div
        data-component="card"
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
                }
              : {
                  scale: 1,
                  opacity: 1,
                  y: "0px",
                }
          }
          className={cn(
            "grid size-full origin-top overflow-hidden",
            sticky && index != totalCards - 1 && "max-h-(--max-h)",
          )}
        >
          {children}
        </motion.div>
      </motion.div>
    </>
  );
};
export default ParallaxCards;
