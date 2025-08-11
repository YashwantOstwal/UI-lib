import { cn } from "@/lib/utils";
import { TailwindCSSClassname } from "./file-explorer/file-explorer.types";

type ListContainerProps = TailwindCSSClassname &
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
        variant === "pro-tips" && "bg-[#F5FEFA]",
        variant === "caveats" && "bg-[#FFFDF5]",
        className,
      )}
      {...rest}
    >
      <span
        className={cn(
          "font-medium text-[#0a1d08] capitalize",
          variant === "pro-tips" && "text-green-900",
          variant === "caveats" && "text-orange-900",
        )}
      >
        {title}
      </span>
      <div
        className={cn(
          "space-y-1 p-4",
          variant === "pro-tips" && "text-green-800",
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
