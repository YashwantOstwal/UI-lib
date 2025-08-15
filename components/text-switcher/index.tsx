"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  useVelocity,
} from "motion/react";
import type { TextSwitcherProps } from "./text-switcher.types";

export default function TextSwitcher({
  words,
  animationDurationInSec = 0.4,
  readTimeInSec = 2,
  dotRestColor,
  dotMotionColor,
  className,
  style,
}: TextSwitcherProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const dotX = useMotionValue("100%");
  const dotXAsFloat = useTransform(dotX, (latest) => parseFloat(latest));
  const dotVelocity = useVelocity(dotXAsFloat);

  const dotScaleX = useTransform(dotVelocity, [-125, 0, 125], [3, 1, 3]);
  const dotColor = useTransform(
    dotVelocity,
    [-100, 0, 100],
    [dotMotionColor, dotRestColor, dotMotionColor],
  );

  React.useEffect(() => {
    const totalCycleTimeInMs =
      (readTimeInSec + 2 * animationDurationInSec) * 1000;
    const controlInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, totalCycleTimeInMs);

    return () => clearInterval(controlInterval);
  }, [words.length, readTimeInSec, animationDurationInSec]);

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: animationDurationInSec / words[currentIndex].length,
      },
    },
    exit: {
      transition: {
        staggerChildren: animationDurationInSec / words[currentIndex].length,
        staggerDirection: -1,
      },
    },
  };

  const letterVariants = {
    initial: { scaleX: 0, opacity: 0 },
    animate: { scaleX: 1, opacity: 1 },
    exit: { scaleX: 0, opacity: 0 },
  };

  return (
    <div
      className={cn("relative inline-block w-fit", className)}
      style={{ ...style }}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          className="flex flex-nowrap whitespace-pre"
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {words[currentIndex].split("").map((letter, index) => (
            <motion.div
              key={`${currentIndex}-${index}`}
              className="origin-left"
              variants={letterVariants}
              transition={{
                duration: animationDurationInSec / words[currentIndex].length,
              }}
            >
              {letter}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={`${currentIndex}-dot`}
          style={{ left: dotX, scaleX: dotScaleX, color: dotColor }}
          className="absolute inset-y-0"
          variants={{
            initial: { left: "0%" },
            animate: {
              left: "100%",
              transformOrigin: "100% 50%",
              transition: {
                duration: animationDurationInSec,
                ease: [0.33, 1, 0.68, 1],
              },
            },
            exit: {
              left: "0%",
              transformOrigin: "0% 50%",
              transition: {
                duration: animationDurationInSec,
                ease: [0.32, 0, 0.67, 0],
              },
            },
          }}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          .
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
