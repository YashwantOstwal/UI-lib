"use client";
import {
  AnimatePresence,
  HTMLMotionProps,
  motion,
  MotionConfig,
  Transition,
  useAnimate,
} from "motion/react";
import { ComponentProps, ReactNode, useEffect, useRef, useState } from "react";
import { SunMoonIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const TRANSITION: Transition = {
  ease: "easeOut",
  duration: 0.25,
};

interface Item extends Omit<HTMLMotionProps<"button">, "ref"> {
  icon: ReactNode;
  onMouseUp: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
interface MenuWheelProps extends ComponentProps<"div"> {
  items: Item[];
  highlightCurrent?: boolean;
  className?: string;
}
export function MenuWheel({
  highlightCurrent = true,
  items,
  className,
  ...rest
}: MenuWheelProps) {
  if (items.length <= 1)
    throw new Error("There should be atleast two elements in the 'items'");

  const [open, setOpen] = useState(false);
  const activeMenuItem = useRef<number | null>(null);
  const [scope, animate] = useAnimate();
  const currentFocusMenuItem = useRef<{
    index: number | null;
    currentAngle: number;
  }>({
    index: null,
    currentAngle: 0,
  });

  useEffect(() => {
    const handleMouseUp = () => {
      currentFocusMenuItem.current.currentAngle = 0;
      currentFocusMenuItem.current.index = null;
      setOpen(false);
    };
    if (open) {
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, [open]);

  const handleMouseEnter = (newFocusMenuItem: number) => {
    if (currentFocusMenuItem.current.index == null) {
      const rotate = (newFocusMenuItem * 360) / items.length;
      const enterAnimation = async () => {
        await animate(
          scope.current,
          { rotate },
          {
            duration: 0,
          },
        );
        animate(scope.current, { opacity: 1 }, TRANSITION);
      };
      enterAnimation();
      currentFocusMenuItem.current.index = newFocusMenuItem;
      currentFocusMenuItem.current.currentAngle = rotate;
    } else {
      let i, j, forwardPath, backwardPath;
      const currentAngle = currentFocusMenuItem.current.currentAngle;
      forwardPath = backwardPath = 0;
      for (
        i = currentFocusMenuItem.current.index;
        i != newFocusMenuItem;
        i = (i + 1) % items.length
      ) {
        forwardPath += 360 / items.length;
      }
      for (
        j = currentFocusMenuItem.current.index;
        j != newFocusMenuItem;
        j = (j - 1 + items.length) % items.length
      ) {
        backwardPath -= 360 / items.length;
      }

      const shortestPath =
        Math.abs(forwardPath) <= Math.abs(backwardPath)
          ? forwardPath
          : backwardPath;
      const rotate = currentAngle + shortestPath;
      currentFocusMenuItem.current.index = newFocusMenuItem;
      currentFocusMenuItem.current.currentAngle = rotate;
      const transitionAnimation = async () => {
        animate(scope.current, { rotate }, TRANSITION);
      };
      transitionAnimation();
    }
  };
  const handleMouseLeave = async () => {
    //resetting the state so I can get the enter animation
    currentFocusMenuItem.current.index = null;
    currentFocusMenuItem.current.currentAngle = 0;
    animate(scope.current, { opacity: 0 });
  };

  return (
    <MotionConfig transition={TRANSITION}>
      <div
        className={cn(
          "relative grid place-items-center rounded-full",
          className,
        )}
        {...rest}
      >
        <motion.button
          onMouseDown={() => setOpen(true)}
          initial={{ scale: 1 }}
          whileTap={{ scale: 0.9 }}
          whileHover={{ opacity: 0.8 }}
          className={cn(
            "bg-secondary text-secondary-foreground ring-background dark:ring-background relative z-20 grid size-12 place-items-center rounded-[inherit] shadow-[0_0_6px_5px_rgba(0,0,0,0.09)_inset] ring-1 ring-inset dark:shadow-[0_0_6px_5px_rgba(255,255,255,0.09)_inset]",
            open ? "cursor-grabbing" : "cursor-grab",
          )}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {open ? (
              <motion.div
                key="close-icon"
                aria-label="close menu wheel"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="bg-destructive/75 text-destructive-foreground grid size-full place-items-center rounded-[inherit]"
              >
                <XIcon />
              </motion.div>
            ) : (
              <motion.div
                key="open-icon"
                aria-label="open menu wheel"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="relative grid size-full place-items-center rounded-[inherit]"
              >
                <SunMoonIcon />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{
                maskImage:
                  "conic-gradient(rgba(0,0,0,1) 0%,rgba(0,0,0,1) 0%,rgba(0,0,0,0) 0%,rgba(0,0,0,0) 100%)",
                scale: 0.93,
                opacity: 0.5,
              }}
              animate={{
                maskImage:
                  "conic-gradient(rgba(0,0,0,1) 0%,rgba(0,0,0,1) 100%,rgba(0,0,0,0) 100%,rgba(0,0,0,0) 100%)",
                scale: 1,
                opacity: 1,
              }}
              exit={{
                maskImage:
                  "conic-gradient(rgba(0,0,0,1) 0%,rgba(0,0,0,1) 0%,rgba(0,0,0,0) 0%,rgba(0,0,0,0) 100%)",
                scale: 0.93,
                opacity: 0.5,
              }}
              className="bg-muted/90 absolute z-10 flex size-[300%] rounded-[inherit] p-1 shadow-[0_0_2px_3px_rgba(0,0,0,0.09)_inset] backdrop-blur-[2px] dark:shadow-[0_0_2px_3px_rgba(255,255,255,0.09)_inset]"
            >
              <div
                onMouseLeave={handleMouseLeave}
                className="relative z-20 size-full overflow-hidden rounded-[inherit]"
              >
                {items.map(
                  ({ icon, onMouseUp, onMouseEnter, disabled, ...rest }, i) => (
                    <motion.button
                      key={`items[${i}]`}
                      onMouseEnter={(e) => {
                        if (!disabled) handleMouseEnter(i);
                        else handleMouseLeave();
                        onMouseEnter?.(e);
                      }}
                      onMouseUp={(e) => {
                        if (disabled) return;
                        activeMenuItem.current = i;
                        onMouseUp?.(e);
                      }}
                      whileHover={
                        disabled
                          ? undefined
                          : {
                              opacity: 0.8,
                            }
                      }
                      {...rest}
                      className={cn(
                        "bg-muted text-muted-foreground border-primary/20 disabled: absolute inset-y-0 left-0 w-1/2 origin-right border-r",
                        highlightCurrent &&
                          activeMenuItem.current === i &&
                          "text-secondary-foreground",
                        disabled
                          ? "cursor-default opacity-50"
                          : "cursor-grabbing",
                      )}
                      style={{
                        zIndex: i + 1,
                        clipPath: `polygon(100% 50%,100% 0%,0% 0%,0% ${50 - Math.tan(((90 - 360 / items.length) * Math.PI) / 180) * 50}%)`,
                        rotate: `${(i * 360) / items.length}deg`,
                      }}
                    >
                      <div
                        style={{
                          offsetPath: "circle(40% at 100% 50%)",
                          offsetDistance: `${((-90 - 360 / items.length / 2) / 360) * 100}%`,
                          offsetRotate: `${(-i * 360) / items.length}deg`,
                          offsetAnchor: "center",
                        }}
                        className="w-fit"
                      >
                        {icon}
                      </div>
                    </motion.button>
                  ),
                )}
              </div>
              <motion.div
                ref={scope}
                className="bg-primary absolute inset-y-0 left-0 z-10 w-1/2 origin-right opacity-0"
                style={{
                  clipPath: `polygon(100% 50%,100% 0%,0% 0%,0% ${50 - Math.tan(((90 - 360 / items.length) * Math.PI) / 180) * 50}%)`,
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
