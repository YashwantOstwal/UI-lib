"use client";
import { useRef, useState } from "react";
import Button from "./file-explorer/button";
import TextMorph from "./text-morph";
const CopyButton = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);
  const controlInterval = useRef<NodeJS.Timeout>(undefined);

  const handleCopy = async (code: string) => {
    clearTimeout(controlInterval.current);
    await navigator.clipboard.writeText(code);
    setCopied(true);
    controlInterval.current = setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Button className="relative h-9 w-20 p-0" onClick={() => handleCopy(code)}>
      <TextMorph copied={copied}>{copied ? "Copied!" : "Copy"}</TextMorph>
    </Button>
  );
};

export default CopyButton;
