import { cn } from "@/lib/utils";
import * as React from "react";

const COLUMN_HEADERS = ["Props", "Type", "Description", "Default value"];

import { TailwindCSSClassname } from "@/components/file-explorer/file-explorer.types";

interface RowData {
  prop: React.ReactNode;
  type: React.ReactNode;
  description?: React.ReactNode;
  defaultValue: React.ReactNode;
}
type PropTableProps = React.PropsWithChildren &
  TailwindCSSClassname &
  React.ComponentProps<"div"> & {
    data: RowData[];
  };

export type { RowData, PropTableProps };
export default function PropTable({
  data,
  className,
  children,
  ...rest
}: PropTableProps) {
  return (
    <div
      className={cn("-mx-3 overflow-x-auto outline-none lg:-mx-4", className)}
      {...rest}
    >
      <div className="w-fit min-w-full px-3 text-[15px] leading-[1.4286] lg:px-4 [&>*]:w-full">
        <table className="border-border min-w-2xl border border-dashed text-left">
          <thead>
            <tr className="divide-border bg-muted divide-x divide-dashed">
              {COLUMN_HEADERS.map((eachColumnHeader, j) => (
                <th
                  key={"column-" + (j + 1)}
                  className="p-2 text-left font-medium capitalize"
                >
                  {eachColumnHeader}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="border-border bg-layout divide-border divide-y divide-dashed border border-dashed">
            {data.map((eachRowData, i) => (
              <tr
                key={"row-" + (i + 1)}
                className="divide-border divide-x divide-dashed"
              >
                {Object.values(eachRowData).map((eachItem, j) => (
                  <td
                    key={`table[${i}][${j}] `}
                    className={cn(
                      "p-2 [&_pre]:!bg-[inherit]",
                      i == 2 && "min-w-full whitespace-pre",
                    )}
                  >
                    <>{eachItem}</>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {children}
      </div>
    </div>
  );
}
