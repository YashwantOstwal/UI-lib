import { TailwindCSSClassname } from "@/components/file-explorer/file-explorer.types";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export type PreviewProps = TailwindCSSClassname & ComponentProps<"div">;

export default function Preview({
  children,
  className,
  ...rest
}: PreviewProps) {
  return (
    <div
      className={cn(
        "relative mx-auto flex min-h-[400px] w-full max-w-5xl items-center justify-center overflow-hidden rounded-[10px] bg-[#fcfcfc] py-20 shadow-[0px_8px_12px_-4px_rgba(15,12,12,0.08),_0px_0px_2px_0px_rgba(15,12,12,0.10),_0px_1px_2px_0px_rgba(15,12,12,0.10)]",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
