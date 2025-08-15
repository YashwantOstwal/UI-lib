import { cn } from "@/lib/utils";
import { TailwindCSSClassname } from "./file-explorer/file-explorer.types";

export type ListContainerProps = TailwindCSSClassname &
  React.ComponentProps<"div"> & {
    title: string;
    list: React.ReactNode[];
    variant: "pro-tips" | "caveats";
  };
export default function ListContainer({
  className,
  variant,
  title,
  list,
  ...rest
}: ListContainerProps) {
  return (
    <div
      className={cn(
        "border border-t-0 border-dashed border-[#c6c6c6] px-1.5 py-3",
        variant === "pro-tips" && "bg-green-100/15",
        variant === "caveats" && "bg-[#FFFDF5]/15",
        className,
      )}
      {...rest}
    >
      <span
        className={cn(
          "font-medium capitalize",
          variant === "pro-tips" && "text-green-900",
          variant === "caveats" && "text-orange-900",
        )}
      >
        {title}
      </span>
      <div
        className={cn(
          "space-y-4 p-5",
          variant === "pro-tips" && "text-green-900",
          variant === "caveats" && "text-orange-800",
        )}
      >
        {list.map((eachListItem, i) => (
          <li key={`list-item-${i}`}>{eachListItem}</li>
        ))}
      </div>
    </div>
  );
}
