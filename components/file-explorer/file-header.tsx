import CopyButton from "../copy-button";
import FileExtensionIcon from "./file-extension";
import { ActiveFile } from "./file-explorer.types";

export default function FileHeader({ absolutePath, code }: ActiveFile) {
  return (
    <>
      <div className="flex flex-1 items-center gap-1 overflow-auto text-nowrap whitespace-nowrap md:gap-2 [&>svg]:shrink-0">
        <FileExtensionIcon fileName={absolutePath} />
        {absolutePath}
      </div>
      <CopyButton code={code} />
    </>
  );
}
