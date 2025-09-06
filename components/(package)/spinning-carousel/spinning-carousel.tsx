"use client";

import * as React from "react";
import { motion, MotionProps, useInView } from "motion/react";

import { cn } from "@/lib/utils";

const CARD_STATES = [
  { opacity: 0.6, zIndex: 2, x: "-100%" },
  { opacity: 1, zIndex: 3, x: "0%" },
  { opacity: 0.6, zIndex: 2, x: "100%" },
  { opacity: 0, zIndex: 1, x: "0%" },
];
const TOTAL_CARDS = 4;

export interface SpinningCarouselProps {
  children: React.ReactNode[];
  readTimeInSec?: number;
  animationDurationInSec?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function SpinningCarousel({
  children,
  readTimeInSec = 4,
  animationDurationInSec = 0.8,
  className,
  style,
}: SpinningCarouselProps) {
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef);
  const intervalRef = React.useRef<NodeJS.Timeout>(undefined);

  const [carouselState, setCarouselState] = React.useState<{
    index: number;
    visibleCardIndices: number[];
  }>({
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
        "grid w-full grid-cols-7 !overflow-hidden lg:grid-cols-4",
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
      className="col-span-5 col-start-2 row-start-1 grid p-1.5 sm:p-2 lg:col-span-2 lg:col-start-2 lg:p-3"
    >
      {children}
    </motion.div>
  );
}
