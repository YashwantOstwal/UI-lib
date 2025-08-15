interface ToolbarItem {
  icon: React.ReactNode | string;
  tooltip: string;
}

interface MotionToolbarProps extends React.ComponentProps<"button"> {
  items: ToolbarItem[];
}

interface TooltipsContainerProps {
  toolBarRef: React.RefObject<HTMLDivElement>;
  mouseIn: number;
  tooltips: string[];
}
export type { MotionToolbarProps, TooltipsContainerProps };
