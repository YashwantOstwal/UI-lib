import { CSSProperties } from "react";

interface TextSwitcherProps {
  words: Array<string>;
  readTimeInSec?: number;
  animationDurationInSec?: number;
  className?: string;
  dotRestColor: string;
  dotMotionColor: string;
  style?: CSSProperties;
}

export type { TextSwitcherProps };
