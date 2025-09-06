"use client";

import * as React from "react";
import { HTMLMotionProps, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { TailwindCSSClassname } from "./file-explorer.types";

type Button = React.ComponentProps<"button"> &
  HTMLMotionProps<"button"> &
  TailwindCSSClassname;
export default function Button({ children, className, ...rest }: Button) {
  return (
    <motion.button
      className={cn(
        "bg-secondary text-secondary-foreground border-background hover:bg-accent/85 hover:text-accent-foreground/85 relative flex cursor-pointer items-center justify-center rounded-[8px] border px-2.5 py-2 text-sm shadow-[0_1px_rgba(255,255,255,0.1)_inset,0_1px_3px_rgba(0,0,0,0.2)]",
        className,
      )}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
