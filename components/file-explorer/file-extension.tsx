import React from "react";
import TypescriptIcon from "./icons/Typescript";
import ReactIcon from "./icons/React";

const fileExtensionIcons = {
  ts: <TypescriptIcon />,
  tsx: <ReactIcon />,
};
export default function FileExtensionIcon({ fileName }: { fileName: string }) {
  return (
    <>
      {
        fileExtensionIcons[
          fileName.split(".").pop() as keyof typeof fileExtensionIcons
        ]
      }
    </>
  );
}
