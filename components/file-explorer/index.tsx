import type {
  DirectoryItem,
  File,
  Directory,
  EnhancedDirectoryItem,
  ActiveFile,
  TailwindCSSClassname,
  FileExplorerProps,
} from "./file-explorer.types";
import ProjectDirectory from "./utils/projectDirectory";
import FileTree from "./file-tree";
import CopiedFilesTrackerProvider from "./providers/CopiedFilesTrackerProvider";
import ActiveFileProvider from "./providers/ActiveFileProvider";
import CodeCard from "./code-card";
import GetStartedButton from "./get-started-button";
import { cn } from "@/lib/utils";

export default function CodePreview({
  rootDirectory,
  defaultActiveFile,
  className,
}: FileExplorerProps) {
  const enhancedRootDirectory: EnhancedDirectoryItem[] = new ProjectDirectory(
    rootDirectory,
  ).enhancedRootDirectory;
  return (
    <ActiveFileProvider defaultActiveFile={defaultActiveFile}>
      <div
        className={cn(
          "relative mt-3.5 flex w-full rounded-2xl bg-[#fcfcfc] text-sm shadow-[0px_8px_12px_-4px_rgba(15,12,12,0.08),_0px_0px_2px_0px_rgba(15,12,12,0.10),_0px_1px_2px_0px_rgba(15,12,12,0.10)] md:p-2",
          className,
        )}
      >
        <div className="min-w-[320px] pr-2.5 text-[#202020] max-md:hidden">
          <CopiedFilesTrackerProvider>
            <div className="flex items-center justify-between p-2 font-medium">
              Root Dir. <GetStartedButton />
            </div>
            <FileTree rootDirectory={enhancedRootDirectory} />
          </CopiedFilesTrackerProvider>
        </div>
        <CodeCard enhancedRootDirectory={enhancedRootDirectory} />
      </div>
    </ActiveFileProvider>
  );
}
