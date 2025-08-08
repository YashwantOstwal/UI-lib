"use client";

import * as React from "react";
import { useScroll, useTransform, motion, useMotionValue } from "motion/react";
import useIsServer from "@/hooks/use-is-server";
import type { ParallaxContainerProps } from "./parallax-container.types";
export default function ParallaxContainer({
  children,
  maxScale = 1.1,
  className,
  style,
}: ParallaxContainerProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isServer = useIsServer();
  const scale = useMotionValue(1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const scrollYOffset = useTransform(scrollYProgress, (latest) => {
    if (isServer || !containerRef.current) return 0;

    const viewportHeight = window.innerHeight;
    const { height: containerHeight } =
      containerRef.current.getBoundingClientRect();
    return latest * (viewportHeight + containerHeight);
  });

  const y = useTransform(scrollYOffset, (latest) => {
    if (isServer || !containerRef.current) return "0%";

    const viewportHeight = window.innerHeight;
    const { height: containerHeight } =
      containerRef.current.getBoundingClientRect();

    if (containerHeight >= viewportHeight) return "0%";
    const effectiveMaxScale = Math.min(
      maxScale,
      viewportHeight / containerHeight,
    );

    const percent =
      ((effectiveMaxScale % 1) / (viewportHeight - containerHeight)) *
      (latest - containerHeight) *
      100;

    return `${percent}%`;
  });

  React.useEffect(() => {
    if (!containerRef.current) return;
    const setMotionScale = ({ matches }: { matches: boolean }) => {
      const { height: containerHeight } =
        containerRef.current!.getBoundingClientRect();
      if (matches) {
        const effectiveMaxScale = Math.min(
          maxScale,
          window.innerHeight / containerHeight,
        );
        scale.set(effectiveMaxScale);
      } else {
        scale.set(1);
      }
    };
    const { height: containerHeight } =
      containerRef.current!.getBoundingClientRect();
    const mediaQuery = window.matchMedia(`(min-height : ${containerHeight}px)`);

    setMotionScale(mediaQuery);
    mediaQuery.addEventListener("change", setMotionScale);

    return () => mediaQuery.removeEventListener("change", setMotionScale);
  }, [maxScale]);

  return (
    <>
      <style>{`html { scroll-behavior: smooth; }`}</style>
      <div
        ref={containerRef}
        className={className}
        style={{ ...style, overflow: "hidden" }}
      >
        <motion.div
          style={{
            y,
            scale,
            transformOrigin: "bottom",
          }}
        >
          {children}
        </motion.div>
      </div>
    </>
  );
}
