import { MotionValue, useTransform } from "motion/react";

export default function useParallaxEffect({  index,
  maxCardsStack,
  totalCards,
  scrollYProgress,
  top}:{index:number,maxCardsStack:number,totalCards:number,top:string,scrollYProgress:MotionValue<number>}) {
    const r = 1/totalCards
      const y = useTransform(
        scrollYProgress,
        [index * r, (index + maxCardsStack - 1) * r, (index + maxCardsStack) * r],
        [
          "0",
          `-${fullTop}`,
          `${-topMagnitude - topMagnitude / (maxCardsStack - 1)}${topUnit}`,
        ],
        // 0 , -top,- top - top/(maxCardsStack - 1)
      );
      const scale = useTransform(
        scrollYProgress,
        [index * r, (index + maxCardsStack) * r],
        [1, 0.85],
      );
      const opacity = useTransform(
        scrollYProgress,
        [(index + maxCardsStack - 1) * r, (index + maxCardsStack) * r],
        [1, 0],
      );
    return ();
}
