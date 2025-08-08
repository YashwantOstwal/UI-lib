"use client";
import React, {
  CSSProperties,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { useScroll, useTransform, motion, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";

export default function ParallaxContainer({
  style,
  children,
  className,
  parallaxAmount,
}: {
  style?: CSSProperties;
  children: ReactNode;
  className?: string;
  parallaxAmount: number;
}) {
  const container = useRef<HTMLDivElement>(null);
  const [isServer] = useState(typeof window == "undefined");
  const scale = useMotionValue(1);
  // const mediaQuery = useRef<MediaQueryList>(undefined);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const scrollY = useTransform(scrollYProgress, (latest) => {
    if (isServer || container.current == null) return 0;
    const viewportHeight = window.innerHeight;
    const { height: containerHeight } =
      container.current.getBoundingClientRect() as DOMRect;
    return latest * (viewportHeight + containerHeight);
  });

  const y = useTransform(scrollY, (latest) => {
    if (isServer || container.current === null) return "0%";
    const viewportHeight = window.innerHeight;
    const { height: containerHeight } =
      container.current.getBoundingClientRect() as DOMRect;

    return containerHeight > viewportHeight
      ? `${scrollYProgress.get() * parallaxAmount * 2 - parallaxAmount}%`
      : `${(parallaxAmount / (viewportHeight - containerHeight)) * (latest - containerHeight)}%`;
  });
  useEffect(() => {
    if (!container.current) return;
    const { height: containerHeight } =
      container.current.getBoundingClientRect();
    const handleMatchMedia = ({ matches }: { matches: boolean }) =>
      matches ? scale.set(1 + 0.01 * parallaxAmount) : scale.set(1);

    const mediaQuery = window.matchMedia(`(min-height : ${containerHeight}px)`);
    handleMatchMedia(mediaQuery);
    mediaQuery.addEventListener("change", handleMatchMedia);
    return () => mediaQuery.removeEventListener("change", handleMatchMedia);
  }, []);
  return (
    <>
      <style>{`html { scroll-behavior: smooth; }`}</style>
      <motion.div className="overflow-hidden bg-amber-500" ref={container}>
        <motion.div
          style={{
            y,
            scale,
            ...style,
          }}
          className={cn(className, "origin-bottom")} //origin?
        >
          {children}
        </motion.div>
      </motion.div>
    </>
  );
}
