import type {
  EnhancedDirectoryItem,
  FileExplorerProps,
} from "./file-explorer.types";
import ProjectDirectory from "./utils/projectDirectory";
import FileTree from "./file-tree";
import CopiedFilesTrackerProvider from "./providers/CopiedFilesTrackerProvider";
import ActiveFileProvider from "./providers/ActiveFileProvider";
import CodeCard from "./code-card";
import { TrackerToggler } from "./tracker-toggler";
import { cn } from "@/lib/utils";

export default function FileExplorer({
  rootDirectory,
  defaultActiveFile,
  className,
  ...rest
}: FileExplorerProps) {
  const enhancedRootDirectory: EnhancedDirectoryItem[] = new ProjectDirectory(
    rootDirectory,
  ).enhancedRootDirectory;
  return (
    <ActiveFileProvider defaultActiveFile={defaultActiveFile}>
      <div
        className={cn(
          "md:bg-layout relative isolate mt-3.5 flex w-full rounded-2xl text-sm shadow-[0px_8px_12px_-4px_rgba(15,12,12,0.08),_0px_0px_2px_0px_rgba(15,12,12,0.10),_0px_1px_2px_0px_rgba(15,12,12,0.10)] md:p-1.5 dark:shadow-[0_4px_12px_rgba(0,0,0,0.35),0_1px_rgba(255,255,255,0.05)_inset]",
          className,
        )}
        {...rest}
      >
        <div className="min-w-80 pr-2.5 max-md:hidden">
          <CopiedFilesTrackerProvider>
            <div className="flex items-center justify-between p-2 font-medium">
              100xui <TrackerToggler />
            </div>
            <FileTree rootDirectory={enhancedRootDirectory} />
          </CopiedFilesTrackerProvider>
        </div>
        <CodeCard enhancedRootDirectory={enhancedRootDirectory} />
      </div>
    </ActiveFileProvider>
  );
}
