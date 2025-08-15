import { MotionValue } from "motion";

interface ParallaxCardsProps {
  maxStackedCards?: number;
  children: React.ReactNode[];
  top?: string;
  forceParallax?: boolean;
}
interface CardProps {
  index: number;
  scrollYProgress: MotionValue<number>;
  maxStackedCards: number;
  totalCards: number;
  children: React.ReactNode | string;
  top: string;
  sticky: boolean;
  forceParallax: boolean;
}
export type { ParallaxCardsProps, CardProps };
