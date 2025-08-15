"use client";
import { cn } from "@/lib/utils";
import {
  useCopiedFiles,
  useIsCopyTrackerOn,
} from "./providers/CopiedFilesTrackerProvider";
import { useActiveFile } from "./providers/ActiveFileProvider";
import { EnhancedFile } from "./file-explorer.types";
import ArrowDownIcon from "./icons/ArrowDown";
import FileIcon from "./icons/File";

export default function File({
  name,
  level,
  absolutePath,
  code,
}: EnhancedFile & {
  level: number;
}) {
  const { isCopyTrackerOn } = useIsCopyTrackerOn();
  const { activeFile, setActiveFile } = useActiveFile();
  const { copiedFiles, dispatchCopiedFiles } = useCopiedFiles();
  const isActive = activeFile.absolutePath === absolutePath;
  const isFileCopied = copiedFiles.includes(absolutePath);
  return (
    <button
      style={{ paddingLeft: `calc(${level} * var(--indent))` }}
      className={cn(
        "flex w-full items-center gap-1 rounded-md py-1 outline-none",
        isActive
          ? isCopyTrackerOn
            ? isFileCopied
              ? "bg-green-200/80"
              : "bg-red-200/80"
            : "bg-[#e4e4e4]/80"
          : isCopyTrackerOn
            ? isFileCopied
              ? "bg-green-200/25 hover:bg-green-200/50 focus:bg-green-200/50 focus-visible:bg-green-200/50"
              : "bg-red-200/25 hover:bg-red-200/50 focus:bg-red-200/50 focus-visible:bg-red-200/50"
            : "hover:bg-[#e4e4e4]/50 focus:bg-[#e4e4e4]/50 focus-visible:bg-[#e4e4e4]/50",
      )}
      onClick={() => setActiveFile({ absolutePath, code })}
    >
      <ArrowDownIcon className="invisible" />
      <FileIcon />
      <span>{name}</span>
      {isCopyTrackerOn && (
        <input
          className="size-3.5 accent-green-600"
          onChange={(e) => {
            const isChecked = e.currentTarget.checked;
            dispatchCopiedFiles?.({
              type: isChecked ? "ADD" : "REMOVE",
              items: [absolutePath],
            });
          }}
          type="checkbox"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            const newStatus = !e.currentTarget.checked;
            dispatchCopiedFiles?.({
              type: newStatus ? "ADD" : "REMOVE",
              items: [absolutePath],
            });
          }}
          checked={isFileCopied}
        />
      )}
    </button>
  );
}
