"use client";
import * as React from "react";
import usePrevious from "@/hooks/use-previous";
import useDebouncedState from "@/hooks/use-debounced-state";

import type {
  MotionToolbarProps,
  TooltipsContainerProps,
} from "./motion-toolbar.types";

import {
  useAnimate,
  motion,
  AnimatePresence,
  usePresence,
  useMotionValue,
  Transition,
  easeInOut,
} from "motion/react";

const ANIMATION_TRANSITION: Transition = {
  duration: 0.25,
  ease: easeInOut,
};
export default function MotionToolbar({ items }: MotionToolbarProps) {
  const [mouseIn, setMouseIn] = useDebouncedState<number>(0, 150);
  const toolBarRef = React.useRef<HTMLDivElement>(null);
  const handleReset = () => setMouseIn(0);
  return (
    <>
      <style>{`
      [data-component="toolbar"] {
      --toolbar-bg: #1F2121;
      --tooltip-bg: oklch(0.3032 0.003 197.01);
      --icon-color: oklch(0.9304 0.003 106.45);
      --icon-hover-bg: #2D2F2F;
      --icon-focus-outline: #474747;
      --tooltip-text:#f5f5f5;
  }
  `}</style>
      <div className="relative w-fit" data-component="toolbar">
        <div
          ref={toolBarRef}
          className="flex gap-1 rounded-xl border border-(--icon-color)/10 bg-(--toolbar-bg) p-1.5 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]"
          onMouseLeave={handleReset}
          onBlur={() => mouseIn === items?.length && handleReset()}
        >
          {items?.map(({ icon, tooltip, ...rest }, i) => (
            <motion.button
              key={tooltip}
              aria-label={tooltip}
              whileHover={{ backgroundColor: "var(--icon-hover-bg)" }}
              {...rest}
              onFocus={() => setMouseIn(i + 1)}
              onMouseEnter={() => setMouseIn(i + 1)}
              data-tab={i + 1}
              className="cursor-pointer rounded-lg p-1.5 px-2 outline-offset-1 focus:!bg-(--icon-hover-bg) focus:!outline-2 focus:!outline-(--icon-focus-outline) focus-visible:!bg-(--icon-hover-bg) [&>svg]:size-6"
            >
              {icon}
            </motion.button>
          ))}
        </div>
        <AnimatePresence>
          {mouseIn && (
            <ToolTipsContainer
              mouseIn={mouseIn}
              toolBarRef={toolBarRef as React.RefObject<HTMLDivElement>}
              tooltips={items?.map(({ tooltip }) => tooltip)}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

function ToolTipsContainer({
  toolBarRef,
  mouseIn,
  tooltips,
}: TooltipsContainerProps) {
  const prevMouseIn = usePrevious<number>(mouseIn);
  const [isPresent, safeToRemove] = usePresence();
  const [tooltipContainerScope, animate] = useAnimate();
  const x = useMotionValue(0);

  const getTranslateX = React.useCallback(
    (mouseIn: number) => {
      const hoveredTab = toolBarRef.current.querySelector(
        `[data-tab="${mouseIn}"]`,
      );
      const { left: tabLeft, width: tabWidth } =
        hoveredTab?.getBoundingClientRect() as DOMRect;
      const finalPosition = tabLeft + tabWidth / 2;

      const correspondingTooltip = tooltipContainerScope.current.querySelector(
        `[data-tooltip="${mouseIn}"]`,
      );
      const { left: tooltipLeft, width: tooltipWidth } =
        correspondingTooltip.getBoundingClientRect() as DOMRect;
      const currentPosition = tooltipLeft + tooltipWidth / 2;

      const relativeTranslateX = finalPosition - currentPosition;
      const translateX = relativeTranslateX + x.get();
      return translateX;
    },
    [x, toolBarRef, tooltipContainerScope],
  );

  const getClipPath = React.useCallback(
    (mouseIn: number) => {
      let left = 0;
      let right = 0;
      for (let j = 1; j <= tooltips.length; j++) {
        const { width } = tooltipContainerScope.current
          .querySelector(`[data-tooltip="${j}"]`)
          .getBoundingClientRect();
        if (j < mouseIn) {
          left += width;
        } else if (j > mouseIn) {
          right += width;
        }
      }
      const clipPath = `inset(0px ${right}px 0px ${left}px round 5px)`;
      return clipPath;
    },
    [tooltips.length, tooltipContainerScope],
  );

  React.useEffect(() => {
    if (isPresent) {
      const keyframes = {
        clipPath: getClipPath(mouseIn),
        x: getTranslateX(mouseIn),
      };
      if (prevMouseIn === undefined) {
        const enterAnimation = async () => {
          await animate(tooltipContainerScope.current, keyframes, {
            duration: 0,
          });
          await animate(
            tooltipContainerScope.current,
            { opacity: 1 },
            ANIMATION_TRANSITION,
          );
        };
        enterAnimation();
      } else {
        const intermediateAnimation = () => {
          animate(
            tooltipContainerScope.current,
            keyframes,
            ANIMATION_TRANSITION,
          );
        };
        intermediateAnimation();
      }
    } else {
      const exitAnimation = async () => {
        await animate(
          tooltipContainerScope.current,
          { opacity: 0 },
          ANIMATION_TRANSITION,
        );
        safeToRemove();
      };
      exitAnimation();
    }
  }, [
    animate,
    safeToRemove,
    isPresent,
    prevMouseIn,
    mouseIn,
    getClipPath,
    getTranslateX,
    tooltipContainerScope,
  ]);

  return (
    <motion.div
      ref={tooltipContainerScope}
      style={{
        x,
      }}
      initial={{
        opacity: 0,
      }}
      className="absolute bottom-[110%] flex flex-nowrap bg-(--tooltip-bg) py-1 text-sm text-(--tooltip-text)"
    >
      {tooltips.map((tooltip, i) => (
        <div
          key={tooltip + i}
          className="px-2 text-nowrap whitespace-nowrap"
          data-tooltip={i + 1}
        >
          {tooltip}
        </div>
      ))}
    </motion.div>
  );
}
