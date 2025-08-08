import { cn } from "@/lib/utils";
import React, { CSSProperties } from "react";

export default function PlaceHolder({
  className,
  msg1,
  msg2,
  msg3,
  style,
  center = (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path
        stroke="#141414"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5px"
        d="M12 5.75V18.25"
        fill="none"
      ></path>
      <path
        stroke="#141414"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5px"
        d="M18.25 12L5.75 12"
        fill="none"
      ></path>
    </svg>
  ),
  index = 0,
  ...props
}: {
  className?: string;
  msg1?: React.ReactNode | string;
  msg2?: React.ReactNode | string;
  msg3?: React.ReactNode | string;
  style?: CSSProperties;
  index?: number;
  center?: React.ReactNode | string;
} & React.ComponentProps<"div">) {
  const shadesOfWhite = ["#E7E7E7", "#D8D8D8", "#C9C9C9", "#BABABA", "#ABABAB"];

  return (
    <div
      {...props}
      className={cn("size-full p-7 sm:p-10", className)}
      style={{ backgroundColor: shadesOfWhite[index], ...style }}
    >
      <div className="relative size-full border border-dashed p-4 sm:p-5">
        <span className="absolute top-0.75 left-0.75 text-[9px] leading-none sm:text-[11px]">
          {msg1}
        </span>
        <div className="size-full p-3.5 sm:p-5">
          <div className="relative z-20 size-full border p-4 sm:px-6 sm:py-5">
            <span className="absolute top-0.75 left-0.75 text-[9px] leading-none sm:text-[11px]">
              {msg2}
            </span>
            <div className="relative grid size-full place-items-center overflow-hidden border border-dashed">
              <span className="absolute top-0.75 left-0.75 text-[9px] leading-none sm:text-[11px]">
                {msg3}
              </span>
              {center}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
