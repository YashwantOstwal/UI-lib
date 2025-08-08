import { cn } from "@/lib/utils";
import * as motion from "motion/react-client";
import * as React from "react";
import { MotionStyle } from "motion/react";

interface UnderlineText {
  style?: MotionStyle;
  className?: string;
  children: React.ReactNode;
}
export default function UnderlineText({
  children,
  className,
  style,
  ...rest
}: UnderlineText) {
  return (
    <motion.div
      initial="initial"
      whileHover="whileHover"
      className={cn("relative w-fit", className)}
      style={{ ...style }}
      {...rest}
    >
      {children}
      <motion.div
        className="absolute bottom-0 h-0.5 bg-gray-900"
        variants={{
          initial: { width: "0%", right: "0px", left: "auto" },
          whileHover: { width: "100%", left: "0px", right: "auto" },
        }}
        transition={{
          left: {
            duration: 0,
          },
          right: {
            duration: 0,
          },
          default: {
            ease: "easeInOut",
          },
        }}
      />
    </motion.div>
  );
}
