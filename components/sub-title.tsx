import React from "react";
import { TailwindCSSClassname } from "./file-explorer/file-explorer.types";
import { cn } from "@/lib/utils";

const SubTitle = ({
  children,
  className,
}: { children: string } & TailwindCSSClassname) => (
  <h2
    className={cn(
      "mt-12 mb-3 text-xl font-semibold tracking-tight sm:text-2xl",
      className,
    )}
  >
    {children}
  </h2>
);

export default SubTitle;
