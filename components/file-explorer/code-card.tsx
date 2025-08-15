"use client";
import * as React from "react";
import type { EnhancedDirectoryItem } from "./file-explorer.types";
import SyntaxHighlighterClient from "../syntax-highlighter/client";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import ArrowDownIcon from "./icons/ArrowDown";
import CloseIcon from "./icons/CloseIcon";
import FileTree from "./file-tree";
import FileHeader from "./file-header";
import { useActiveFile } from "./providers/ActiveFileProvider";
export default function CodeCard({
  enhancedRootDirectory,
}: {
  enhancedRootDirectory: EnhancedDirectoryItem[];
}) {
  const [open, setOpen] = React.useState(false); //mobile
  const {
    activeFile: { absolutePath, code },
  } = useActiveFile();
  return (
    <>
      <div className="relative z-10 w-full flex-1 overflow-hidden rounded-xl bg-[#ededed] p-1 md:shadow-[0px_8px_12px_-4px_rgba(15,12,12,0.08),_0px_0px_2px_0px_rgba(15,12,12,0.10),_0px_1px_2px_0px_rgba(15,12,12,0.10)]">
        <div className="flex items-center justify-between gap-2 px-1 py-1.5 font-medium">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="shrink-0 rounded-full bg-white md:hidden"
          >
            <ArrowDownIcon className="size-6" openSubtree={open} />
          </button>
          <FileHeader {...{ absolutePath, code }} />
        </div>
        <div
          id="code-container"
          className="relative flex h-[450px] overflow-clip rounded-[8px] border-dashed border-[#c6c6c6] bg-white shadow-[0px_8px_12px_-4px_rgba(16,12,12,0.08),0px_0px_2px_0px_rgba(16,12,12,0.10),0px_1px_2px_0px_rgba(16,12,12,0.10)] md:h-[600px] [&_pre]:min-h-full [&_pre]:w-full [&_pre]:overflow-auto [&_pre]:rounded-[6px] [&_pre]:p-3 [&_pre]:md:p-4"
        >
          <SyntaxHighlighterClient loader={<pre>{code}</pre>}>
            {code}
          </SyntaxHighlighterClient>
        </div>
      </div>
      <MotionConfig transition={{ ease: "easeInOut" }}>
        <AnimatePresence>
          {open && (
            <motion.div
              onClick={() => setOpen((prev) => !prev)}
              initial="fadeOut"
              exit="fadeOut"
              animate="fadeIn"
              variants={{
                fadeOut: { backdropFilter: "blur(0px)", opacity: 0 },
                fadeIn: { backdropFilter: "blur(8px)", opacity: 1 },
              }}
              className="absolute inset-0 z-20 overflow-hidden rounded-[inherit] bg-black/20 md:hidden"
            >
              <div className="absolute top-2 right-2 rounded-full bg-white p-1">
                <CloseIcon className="size-5" />
              </div>
              <motion.div
                initial="moveOut"
                exit="moveOut"
                animate="moveIn"
                variants={{
                  moveOut: { x: "-100%" },
                  moveIn: { x: "0%" },
                }}
                onClick={(e) => e.stopPropagation()}
                className="relative h-full w-[85%] max-w-[300px] bg-white p-1"
              >
                <div className="p-2 font-medium">Files</div>
                <FileTree rootDirectory={enhancedRootDirectory} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </MotionConfig>
    </>
  );
}
