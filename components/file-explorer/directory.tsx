"use client";
import { useState } from "react";
import { EnhancedDirectory, EnhancedFile } from "./file-explorer.types";
import {
  useCopiedFiles,
  useIsCopyTrackerOn,
} from "./providers/CopiedFilesTrackerProvider";
import { useActiveFile } from "./providers/ActiveFileProvider";
import { cn } from "@/lib/utils";
import ArrowDownIcon from "./icons/ArrowDown";
import DirectoryIcon from "./icons/Directory";
import File from "./file";
import sortDirectory from "./utils/sortDirectory";

export default function Directory({
  items,
  level,
  name,
  descendentFiles,
}: EnhancedDirectory & {
  level: number;
}) {
  const { isCopyTrackerOn } = useIsCopyTrackerOn();
  const { activeFile } = useActiveFile();
  const { copiedFiles, dispatchCopiedFiles } = useCopiedFiles();
  const [openSubtree, setOpenSubtree] = useState(
    () => !!(activeFile.absolutePath.split("/")[level] === name),
  );
  const handleSubTree = () => setOpenSubtree((prev) => !prev);

  const filesNotCopiedCount = descendentFiles.filter(
    (eachFile) => !copiedFiles.includes(eachFile),
  ).length;
  return (
    <div className="w-full space-y-0.5">
      <button
        className={cn(
          "flex w-full items-center justify-between gap-1 rounded-md py-1 hover:bg-[#e4e4e4]/50",
          isCopyTrackerOn &&
            (filesNotCopiedCount === 0
              ? "bg-green-200/25 hover:bg-green-200/50"
              : "bg-red-200/25 hover:bg-red-200/50"),
        )}
        style={{ paddingLeft: `calc(${level} * var(--indent))` }}
        onClick={handleSubTree}
      >
        <div className="flex items-center gap-1">
          <ArrowDownIcon openSubtree={openSubtree} />
          <DirectoryIcon />
          <span>{name}</span>
          {isCopyTrackerOn && (
            <input
              className="size-3.5 accent-green-600"
              onChange={(e) => {
                const isChecked = e.currentTarget.checked;
                dispatchCopiedFiles?.({
                  type: isChecked ? "ADD" : "REMOVE",
                  items: descendentFiles,
                });
              }}
              type="checkbox"
              onClick={(e) => e.stopPropagation()}
              checked={filesNotCopiedCount === 0}
            />
          )}
        </div>

        {isCopyTrackerOn && !!filesNotCopiedCount && (
          <div className="font-geist-mono mr-1.5 flex size-5 items-center justify-center rounded-md border border-[rgb(230,0,0)]/10 bg-red-500 bg-clip-border text-sm leading-none font-medium text-[white] shadow-[0px_1px_4px_-1px_rgba(230,_0,_0,_0.38)]">
            {filesNotCopiedCount}
          </div>
        )}
      </button>
      {openSubtree ? (
        <div className="space-y-0.5">
          {items
            .sort(sortDirectory)
            .map((props, i) =>
              props.type === "file" ? (
                <File
                  key={`level-${level},id-${i}`}
                  {...(props as EnhancedFile)}
                  level={level + 1}
                />
              ) : (
                <Directory
                  key={`level-${level},id-${i}`}
                  {...(props as EnhancedDirectory)}
                  level={level + 1}
                />
              ),
            )}
        </div>
      ) : null}
    </div>
  );
}
