import { cn } from "@/lib/utils";
import * as React from "react";
import { PropTableProps } from "./prop-table.types";

const COLUMN_HEADERS = ["Props", "Type", "Description", "Default value"];

export default function PropTable({
  data,
  className,
  ...rest
}: PropTableProps) {
  return (
    <div className="overflow-x-auto">
      <table
        className={cn(
          "w-full min-w-2xl border border-dashed border-[#c6c6c6] bg-[#EFEFF2] text-left text-[15px] leading-[1.4286]",
          className,
        )}
        {...rest}
      >
        <thead>
          <tr className="divide-x divide-dashed divide-[#c6c6c6] text-[#202020]">
            {COLUMN_HEADERS.map((eachColumnHeader, j) => (
              <th
                key={"column-" + (j + 1)}
                className="p-2 text-left font-medium capitalize md:py-3"
              >
                {eachColumnHeader}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-dashed divide-[#c6c6c6] border border-dashed border-[#c6c6c6] bg-[#F9F9FB] text-gray-700">
          {data.map((eachRowData, i) => (
            <tr
              key={"row-" + (i + 1)}
              className="divide-x divide-dashed divide-[#c6c6c6]"
            >
              {Object.values(eachRowData).map((eachItem, j) => (
                <td
                  key={`table[${i}][${j}]`}
                  className={cn(
                    "px-2 py-1.5 [&_pre]:!bg-[inherit]",
                    i == 2 && "min-w-full",
                  )}
                >
                  {eachItem}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
