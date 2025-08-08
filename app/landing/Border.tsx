"use client";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
export default function Border() {
  const { scrollY } = useScroll();
  const scrollYVelocity = useVelocity(scrollY);

  const backgroundColor = useTransform(
    scrollYVelocity,
    [-400, 0, 400],
    ["#ffffff", "#c6c6c6", "#ffffff"],
  );
  const backgroundColorSpringified = useSpring(backgroundColor, {
    mass: 1,
    damping: 57,
    stiffness: 430,
  });
  return (
    <>
      <div className="absolute inset-x-[11px] inset-y-0 z-10 flex justify-between lg:inset-x-[15px]">
        {Array.from({ length: 2 }).map(() => (
          <motion.div
            style={{
              maskImage:
                "repeating-linear-gradient(to bottom,rgba(0,0,0,1) 0px,rgba(0,0,0,1) 6px,rgba(0,0,0,0) 6px, rgba(0,0,0,0) 9px)",
              backgroundColor: backgroundColorSpringified,
            }}
            className="w-px bg-[#a1a1a1]"
          />
        ))}
      </div>
    </>
  );
}
