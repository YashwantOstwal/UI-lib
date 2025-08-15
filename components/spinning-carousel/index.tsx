"use client";

import * as React from "react";
import { motion, MotionProps, useInView } from "motion/react";
import { cn } from "@/lib/utils";
import type { SpinningCarouselProps } from "./spinning-carousel.types";

const CARD_STATES = [
  { opacity: 0.6, zIndex: 2, x: "-100%" },
  { opacity: 1, zIndex: 3, x: "0%" },
  { opacity: 0.6, zIndex: 2, x: "100%" },
  { opacity: 0, zIndex: 1, x: "0%" },
];

const TOTAL_CARDS = 4;

export default function SpinningCarousel({
  children,
  readTimeInSec = 3.5,
  animationDurationInSec = 0.8,
  className,
  style,
}: SpinningCarouselProps) {
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef);
  const intervalRef = React.useRef<NodeJS.Timeout>(undefined);

  const [carouselState, setCarouselState] = React.useState({
    index: 0,
    visibleCardIndices: Array.from(
      { length: TOTAL_CARDS },
      (_, i) => i % children.length,
    ),
  });

  React.useEffect(() => {
    if (isInView) {
      intervalRef.current = setInterval(
        () => {
          setCarouselState(({ index, visibleCardIndices }) => {
            const nextIndex = index + 1;

            const updatedVisibleIndices = visibleCardIndices.map(
              (cardIndex, i) =>
                (i - (nextIndex % TOTAL_CARDS) + TOTAL_CARDS) % TOTAL_CARDS ===
                2
                  ? (index + TOTAL_CARDS - 1) % children.length
                  : cardIndex,
            );

            return {
              index: nextIndex,
              visibleCardIndices: updatedVisibleIndices,
            };
          });
        },
        (readTimeInSec + animationDurationInSec) * 1000,
      );
    }

    return () => clearInterval(intervalRef.current);
  }, [animationDurationInSec, children.length, readTimeInSec, isInView]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative isolate flex h-72 justify-center overflow-hidden sm:h-68.5 lg:h-65",
        className,
      )}
      style={style}
    >
      {carouselState.visibleCardIndices.map((cardIndex, i) => {
        const newState =
          (i - (carouselState.index % TOTAL_CARDS) + TOTAL_CARDS) % TOTAL_CARDS;

        return (
          <CarouselCard
            key={`carouselCards[${i}]`}
            initial={CARD_STATES[i]}
            animate={CARD_STATES[newState]}
            transition={{
              duration: animationDurationInSec,
              ease: [0.33, 1, 0.68, 1], // easeInOutCubic
            }}
          >
            {children[cardIndex]}
          </CarouselCard>
        );
      })}
    </div>
  );
}

function CarouselCard({ children, ...motionProps }: MotionProps) {
  return (
    <motion.div
      {...motionProps}
      className="absolute inset-y-0 w-4/5 p-3 sm:w-3/5 lg:w-1/2 [&>*]:size-full"
    >
      {children}
    </motion.div>
  );
}
