"use client";

import * as React from "react";
import { useScroll, useTransform, motion, useMotionValue } from "motion/react";
import useIsServer from "@/hooks/use-is-server";

interface ParallaxContainerProps {
  children: React.ReactNode;
  maxScale?: number;
}
export default function ParallaxContainer({
  children,
  maxScale = 1.1,
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

    const updateScale = (viewportHeight: number) => {
      const { height: containerHeight } =
        containerRef.current!.getBoundingClientRect();
      const effectiveMaxScale = Math.min(
        maxScale,
        viewportHeight / containerHeight,
      );

      if (containerHeight >= viewportHeight) {
        scale.set(1);
      } else {
        scale.set(effectiveMaxScale);
      }
    };

    const handleResize = () => {
      const viewportHeight = window.innerHeight;
      updateScale(viewportHeight);
    };

    updateScale(window.innerHeight);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [scale, maxScale]);

  return (
    <>
      <style>{`html { scroll-behavior: smooth; }`}</style>
      <div ref={containerRef} className="overflow-hidden">
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
