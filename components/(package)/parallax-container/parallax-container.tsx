"use client";

import * as React from "react";
import {
  useScroll,
  useTransform,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";

import { useIsServer } from "@/hooks/use-is-server";

export interface ParallaxContainerProps {
  children: React.ReactElement;
  maxScale?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function ParallaxContainer({
  children,
  maxScale = 1.1,
  className,
  style,
}: ParallaxContainerProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isServer = useIsServer();

  const scale = useMotionValue(1);
  const springifyScale = useSpring(scale, {
    mass: 1,
    damping: 45,
    stiffness: 350,
  });
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

    const updateScale = () => {
      const viewportHeight = window.innerHeight;
      const { height: containerHeight } =
        containerRef.current!.getBoundingClientRect();

      const effectiveMaxScale = Math.min(
        maxScale,
        viewportHeight / containerHeight,
      );

      scale.set(containerHeight >= viewportHeight ? 1 : effectiveMaxScale);
    };

    updateScale();

    window.addEventListener("resize", updateScale);

    return () => window.removeEventListener("resize", updateScale);
  }, [scale, maxScale]);

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
            scale: springifyScale,
            transformOrigin: "bottom",
          }}
        >
          {children}
        </motion.div>
      </div>
    </>
  );
}
