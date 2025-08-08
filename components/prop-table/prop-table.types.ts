import { TailwindCSSClassname } from "../file-explorer/file-explorer.types";

interface RowData {
  prop: React.ReactNode;
  type: React.ReactNode;
  description?: React.ReactNode;
  defaultValue: React.ReactNode;
}
type PropTableProps = TailwindCSSClassname &
  React.ComponentProps<"table"> & {
    data: RowData[];
  };
export type { RowData, PropTableProps };
