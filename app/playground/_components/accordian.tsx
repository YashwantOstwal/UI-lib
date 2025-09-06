"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useStickyShowcase } from "./sticky-showcase-provider";

export type AccordianData = { title: string; description: string };

export default function Accordian({
  title,
  description,
  i,
}: AccordianData & { i: number }) {
  const { state, handleClick } = useStickyShowcase();
  return (
    <motion.button
      onClick={() => handleClick(i)}
      layoutId={`accordians[${i}]`}
      className={cn(
        "relative isolate mb-2 flex w-full flex-col gap-y-1 overflow-hidden from-[#f5f5f5] via-[#f5f5f5] via-[max(calc(100%-35px),60%)] to-transparent px-3 py-2 text-left text-sm text-(--foreground) max-lg:bg-gradient-to-b lg:max-w-lg lg:text-base",
        state !== i && "cursor-pointer max-lg:hidden",
      )}
    >
      <motion.div
        initial={{ opacity: state === i ? 1 : 0.75 }}
        animate={{ opacity: state === i ? 1 : 0.75 }}
        layoutId={`labels[${i}] relative z-10`}
        className=":text-sm lg:text-base"
      >
        {title}
      </motion.div>
      <AnimatePresence mode="popLayout" initial={false}>
        {state == i && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            layoutId={`descriptions[${i}]`}
            className="z-20 pb-3 text-xs leading-snug lg:text-base"
          >
            {description}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
