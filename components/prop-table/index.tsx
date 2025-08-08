import { cn } from "@/lib/utils";
import * as React from "react";
import { PropTableProps } from "./prop-table.types";

const COLUMN_HEADERS = ["Props", "Type", "Description", "Default value"];

const EXAMPLE_TABLE_DATA = [
  {
    prop: "src",
    required: "true",
    type: "string",
    description: "Source URL for the MacBook screen image.",
    defaultValue: "undefined",
  },
  {
    prop: "showGradient",
    required: "false",
    type: "boolean",
    description: "Flag to show/hide the gradient overlay.",
    defaultValue: "undefined",
  },
  {
    prop: "title",
    required: "false",
    type: "string | ReactNode",
    description: "Title text or React node displayed above the MacBook.",
    defaultValue: "undefined",
  },
  {
    prop: "badge",
    required: "false",
    type: "ReactNode",
    description: "Sticker displayed at the bottom left of the Macbook",
    defaultValue: "undefined",
  },
];
export default function PropTable({
  data = EXAMPLE_TABLE_DATA,
  className,
  ...rest
}: PropTableProps) {
  return (
    <div className="overflow-x-auto">
      <table
        className={cn(
          "w-full min-w-150 border border-dashed border-[#c6c6c6] bg-[#EFEFF2] text-left text-[15px] leading-[1.4286]",
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
                    "px-2 py-1 [&_pre]:!bg-[inherit]",
                    i == 2 && "min-w-xs",
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
