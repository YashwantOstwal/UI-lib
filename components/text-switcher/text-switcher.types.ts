interface TextSwitcherProps {
  words: Array<string>;
  readTimeInSec?: number;
  animationDurationInSec?: number;
  className?: string;
  dotRestColor: string;
  dotMotionColor: string;
  style?: React.CSSProperties;
}

export type { TextSwitcherProps };
