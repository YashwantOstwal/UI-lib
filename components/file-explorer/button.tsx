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
        "flex cursor-pointer items-center justify-center rounded-lg bg-white px-2.5 py-2 text-sm shadow-[0_1px_2px_0_rgba(0,0,0,.2),_inset_0_1px_0_0_rgba(255,255,255,0.07)] hover:opacity-85",
        className,
      )}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
