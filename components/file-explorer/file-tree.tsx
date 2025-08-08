import {
  EnhancedDirectory,
  EnhancedFile,
  FileTreeProps,
} from "./file-explorer.types";
import File from "./file";
import sortDirectory from "./utils/sortDirectory";
import Directory from "./directory";
export default function FileTree({ rootDirectory }: FileTreeProps) {
  return (
    <>
      <style>
        {`
      #file-tree{
      --indent:12px;
      }
      `}
      </style>
      <div id="file-tree" className="space-y-0.5 text-[#202020]">
        {rootDirectory
          .sort(sortDirectory)
          .map((props, i) =>
            props.type === "file" ? (
              <File
                key={`level-0,id-${i}`}
                {...(props as EnhancedFile)}
                level={0}
              />
            ) : (
              <Directory
                key={`level-0,id-${i}`}
                {...(props as EnhancedDirectory)}
                level={0}
              />
            ),
          )}
      </div>
    </>
  );
}
