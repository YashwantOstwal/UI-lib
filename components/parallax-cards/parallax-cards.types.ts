import { MotionValue } from "motion";

interface ParallaxCardsProps {
  maxStackedCards?: number;
  children: React.ReactNode[];
  top?: string;
}
interface CardProps {
  index: number;
  scrollYProgress: MotionValue<number>;
  maxStackedCards: number;
  totalCards: number;
  children: React.ReactNode | string;
  top: string;
  sticky: boolean;
}
export type { ParallaxCardsProps, CardProps };
