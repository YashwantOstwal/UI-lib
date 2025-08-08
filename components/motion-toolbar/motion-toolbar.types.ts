export interface ToolbarItem {
  icon: React.ReactNode | string;
  tooltip: string;
}

export interface MotionToolbarProps extends React.ComponentProps<"button"> {
  items: ToolbarItem[];
}

export interface TooltipsContainerProps {
  toolBarRef: React.RefObject<HTMLDivElement>;
  mouseIn: number;
  tooltips: string[];
}
