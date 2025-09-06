import React from "react";
import SyntaxHighlighterClient from "../syntax-highlighter/client";
import { TailwindCSSClassname } from "./file-explorer.types";
import { cn } from "@/lib/utils";

export interface CodeCanvasProps extends TailwindCSSClassname {
  code: string;
}
export default function CodeCanvas({ code, className }: CodeCanvasProps) {
  return (
    // make sure to make changes in the terminal as well and also in the Container.Usage
    <div
      className={cn(
        "bg-card dark: relative flex h-[450px] overflow-clip rounded-[10px] shadow-[0px_8px_12px_-4px_rgba(16,12,12,0.08),0px_0px_2px_0px_rgba(16,12,12,0.10),0px_1px_2px_0px_rgba(16,12,12,0.10)] max-md:max-h-[60vh] md:h-[600px] md:rounded-[10px] dark:shadow-[0_4px_12px_rgba(0,0,0,0.35),0_1px_rgba(255,255,255,0.05)_inset] [&_pre]:min-h-full [&_pre]:w-full [&_pre]:overflow-auto [&_pre]:rounded-[6px] [&_pre]:p-3 [&_pre]:md:p-4",
        className,
      )}
    >
      <SyntaxHighlighterClient loader={<pre>{code}</pre>}>
        {code}
      </SyntaxHighlighterClient>
    </div>
  );
}
