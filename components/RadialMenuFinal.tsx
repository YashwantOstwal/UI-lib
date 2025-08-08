"use client";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useAnimate,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Sun, MoonStar, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";
const themes = [
  <Sun key="sun-icon" />,
  <MoonStar key="moon-star-icon" />,
  <Monitor key="monitor-icon" />,
];
export default function RadialMenuFinal() {
  const [open, setOpen] = useState(true);
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
      setOpen(false);
    };
    if (open) {
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, [open]);
  const handleMouseEnter = (newFocusMenuItem: number) => {
    if (currentFocusMenuItem.current.index == null) {
      const rotate = (newFocusMenuItem * 360) / themes.length;
      const enterAnimation = async () => {
        await animate(
          scope.current,
          { rotate },
          {
            duration: 0,
          },
        );
        await animate(scope.current, { opacity: 1 });
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
        i = (i + 1) % themes.length
      ) {
        forwardPath += 360 / themes.length;
      }
      for (
        j = currentFocusMenuItem.current.index;
        j != newFocusMenuItem;
        j = (j - 1 + themes.length) % themes.length
      ) {
        backwardPath -= 360 / themes.length;
      }

      const shortestPath =
        Math.abs(forwardPath) <= Math.abs(backwardPath)
          ? forwardPath
          : backwardPath;
      const rotate = currentAngle + shortestPath;
      currentFocusMenuItem.current.index = newFocusMenuItem;
      currentFocusMenuItem.current.currentAngle = rotate;
      const func = async () => {
        await animate(scope.current, { rotate }, { ease: "easeInOut" });
      };
      func();
    }
  };
  const handleMouseLeave = async () => {
    currentFocusMenuItem.current.index = null;
    currentFocusMenuItem.current.currentAngle = 0;
    await animate(scope.current, { opacity: 0 });
  };
  return (
    <>
      <style>
        {`
          #radial-menu {
            --default: #F9F9F9;
            --focus: #F0F0F0;
            --white: #ffffff;
            --border: #e5e5e5;
            --dial:#297BF6;
            --button:#404040;
          }
        `}
      </style>
      <MotionConfig transition={{ ease: "easeInOut", duration: 0.2 }}>
        <div
          id="radial-menu"
          onMouseUp={() => {
            currentFocusMenuItem.current.currentAngle = 0;
            currentFocusMenuItem.current.index = null;
          }}
          className={cn(
            "relative grid size-12 place-items-center rounded-full bg-(--white)",
          )}
          style={{ cursor: open ? "grabbing" : "grab" }}
        >
          <div className="relative z-20 size-full rounded-full">
            <motion.button
              onMouseDown={() => setOpen(true)}
              initial={{ scale: 0.925, backgroundColor: "var(--button)" }}
              animate={{ scale: open ? 1 : 0.925 }}
              style={{ cursor: open ? "grabbing" : "grab" }}
              className="text-bold user-select-none size-full rounded-full text-lg text-white shadow-[0px_8px_12px_-4px_rgba(16,_12,_12,_0.08),_0px_0px_2px_0px_rgba(16,_12,_12,_0.10),_0px_1px_2px_0px_rgba(16,_12,_12,_0.10)]"
              whileHover={{ backgroundColor: "var(--button)" }}
            >
              +
            </motion.button>
          </div>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{
                  maskImage:
                    "conic-gradient(rgba(0,0,0,1) 0%,rgba(0,0,0,1) 0%,rgba(0,0,0,0) 0%,rgba(0,0,0,0) 100%)",
                }}
                animate={{
                  maskImage:
                    "conic-gradient(rgba(0,0,0,1) 0%,rgba(0,0,0,1) 100%,rgba(0,0,0,0) 100%,rgba(0,0,0,0) 100%)",
                }}
                exit={{
                  maskImage:
                    "conic-gradient(rgba(0,0,0,1) 0%,rgba(0,0,0,1) 0%,rgba(0,0,0,0) 0%,rgba(0,0,0,0) 100%)",
                }}
                className="absolute z-10 flex size-[400%] overflow-hidden rounded-full bg-(--white) p-1.5"
              >
                <div
                  className="relative z-20 size-full overflow-hidden rounded-full border-(--border) bg-(--white) p-1"
                  style={{
                    boxShadow:
                      "rgba(30, 31, 37, 0.10) 3px 3px 5px 0px inset, rgba(30, 31, 37, 0.10) -3px -3px 5px 0px inset",
                  }}
                >
                  <div
                    onMouseLeave={handleMouseLeave}
                    className="relative size-full overflow-hidden rounded-full"
                    style={{
                      boxShadow:
                        "rgba(30, 31, 37, 0.10) 0px 0px 2px 1px, rgba(60, 64, 67, 0.15) 0px 0px 5px 2px",
                    }}
                  >
                    {themes.map((icon, index) => (
                      <motion.div
                        key={`background[${index}]`}
                        onMouseEnter={() => handleMouseEnter(index)}
                        className="absolute inset-y-0 left-0 w-1/2 origin-right border-r border-(--border) bg-white"
                        whileHover={{ backgroundColor: "#e5e5e5" }}
                        style={{
                          zIndex: index + 1,
                          clipPath: `polygon(100% 50%,100% 0%,0% 0%,0% ${50 - Math.tan(((90 - 360 / themes.length) * Math.PI) / 180) * 50}%)`,
                          rotate: `${(index * 360) / themes.length}deg`,
                        }}
                      >
                        <div
                          style={{
                            offsetPath: "circle(40% at 100% 50%)",
                            offsetDistance: `${((-90 - 360 / themes.length / 2) / 360) * 100}%`,
                            offsetRotate: `${(-index * 360) / themes.length}deg`,
                            offsetAnchor: "center",
                          }}
                          className="w-fit [&>svg]:size-5"
                        >
                          {icon}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div
                  ref={scope}
                  className="absolute inset-y-0 left-0 z-10 w-1/2 origin-right bg-(--button) opacity-0"
                  style={{
                    clipPath: `polygon(100% 50%,100% 0%,0% 0%,0% ${50 - Math.tan(((90 - 360 / themes.length) * Math.PI) / 180) * 50}%)`,
                  }}
                ></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </MotionConfig>
    </>
  );
}

function Menu({ length }: { length: number }) {
  return (
    <>
      {Array.from({ length }, (_, i) => themes[i]).map(
        (backgroundColor, index) => {
          const a = (90 - 360 / themes.length) / 2;
          const style = {
            zIndex: index + 1,
            clipPath: `polygon(100% 50%,100% 0%,0% 0%,0% ${50 - Math.tan(((90 - 360 / themes.length) * Math.PI) / 180) * 50}%)`,
            rotate: `${(index * 360) / themes.length}deg`,
          };
          return (
            <motion.div
              key={`background[${index}]`}
              whileHover={{ opacity: 0.5 }}
              className="absolute inset-y-0 left-0 w-1/2 origin-right border-r border-r-black"
              style={{
                ...style,
              }}
            >
              <div
                className="size-5 bg-red-100"
                style={{
                  offsetPath: "circle(40% at 100% 50%)",
                  offsetDistance: `${((-90 - 360 / themes.length / 2) / 360) * 100}%`,
                  offsetRotate: `${(-index * 360) / themes.length}deg`,
                  offsetAnchor: "center",
                }}
              ></div>
            </motion.div>
          );
        },
      )}
    </>
  );
}
