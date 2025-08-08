"use client";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  animate,
  useMotionValue,
  usePresence,
  useInView,
  usePresenceData,
  MotionValue,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

import Image1 from "@/public/ImageContainer/image-1.png";
import Image2 from "@/public/ImageContainer/image-2.png";
import Image3 from "@/public/ImageContainer/image-3.png";
import Ilia from "@/public/ilia.png";
import Islam from "@/public/islam.png";
import Merab from "@/public/merab.png";
import Image from "next/image";
import useIsServer from "@/hooks/use-is-server";

const CLICK_TIMEOUT_INTERVAL = 1000;
const TOGGLE_INTERVAL = 4000;
const EXIT_DURATION = 750;
const EXIT_DELAY = 200;

const data = [
  { name: "Ilia Topuria", imgProps: { src: Ilia, alt: "Ilia Topuria" } },
  {
    name: "Islam Makhachev",
    imgProps: { src: Islam, alt: "Islam Makhachev" },
  },
  {
    name: "Merab Dvalishvili",
    imgProps: { src: Merab, alt: "Merab Dvalishvili" },
  },
];

export default function SoonToBeDeleted() {
  const [state, setState] = useState<number>(0);
  const prevState = usePrevious<number>(state);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef);

  const variants = {
    initial: {
      y: prevState !== undefined && state < prevState ? "-100%" : "100%",
    },
    animate: {
      y: "0%",
    },
    exit: (custom: boolean) => ({
      y: !custom ? "-100%" : "100%",
    }),
  };
  return (
    <div
      ref={containerRef}
      className="font-poppins relative z-10 min-h-fit w-full max-w-2xl overflow-hidden max-sm:h-[75%] sm:aspect-video" //max width?
    >
      <div className="absolute z-10 size-full overflow-hidden">
        <AnimatePresence
          mode="popLayout"
          custom={prevState !== undefined && state < prevState}
        >
          <ImageContainer key={String(state)} state={state} />
        </AnimatePresence>
      </div>
      {/* <div className="absolute inset-0 z-20 [background-image:linear-gradient(to_bottom,transparent_50%,#ff000075_100%)] mix-blend-multiply" /> */}
      <div className="relative z-30 flex size-full flex-col justify-between text-white">
        {/* <AnimatePresence
          mode="wait"
          initial={false}
          custom={prevState !== undefined && state < prevState}
        >
          <motion.h1
            key={String(state)}
            variants={{
              animate: {
                transition: { staggerChildren: 0.02 },
              },
              exit: {
                transition: { staggerChildren: 0.02 },
              },
            }}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-nowrap overflow-hidden text-[clamp(30px,15vw,80px)] leading-none font-semibold tracking-[-0.02em] whitespace-pre"
            //             [text-shadow:0px_3px_3px_rgba(0,0,0,0.5)]
          >
            {data[state].name.split("").map((char, idx) => (
              <motion.span
                key={idx}
                transition={{
                  ease: [0.24, 0.43, 0.15, 0.97],
                }}
                variants={variants}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
        </AnimatePresence> */}
        <Toggler
          state={state}
          prevState={prevState}
          isInView={isInView}
          setState={setState}
        />
      </div>
    </div>
  );
}
function ImageContainer({ state }: { state: number }) {
  const [isPresent, safeToRemove] = usePresence();
  const val = useMotionValue(0);
  const custom = usePresenceData();
  const maskImage = useMaskImage(val, custom);
  useEffect(() => {
    if (!isPresent) {
      const exitAnimation = async () => {
        await animate(val, 1, {
          duration: EXIT_DURATION / 1000,
          delay: EXIT_DELAY / 1000,
          ease: [0.24, 0.43, 0.15, 0.97],
        });
        safeToRemove();
      };
      exitAnimation();
    }
  }, [isPresent]);

  return (
    <motion.div
      className={cn(
        "absolute inset-0 origin-top bg-[#19191E]",
        isPresent ? "z-10" : "z-20",
      )}
      style={{ maskImage }}
      animate={{
        scale: 1.1,
        transition: {
          duration: (TOGGLE_INTERVAL + EXIT_DURATION) / 1000,
          delay: EXIT_DELAY / 1000,
          ease: [0.24, 0.43, 0.15, 0.97],
        },
      }}
    >
      <Image
        {...data[state].imgProps}
        priority
        className="size-full object-contain object-top"
      />
    </motion.div>
  );
}

interface TogglerProps {
  state: number;
  prevState: number | undefined;
  isInView: boolean;
  setState: React.Dispatch<React.SetStateAction<number>>;
}

function Toggler({ state, prevState, isInView, setState }: TogglerProps) {
  const totalImages = data.length;
  const flag = useRef<boolean>(true);
  const clickTimeout = useRef<NodeJS.Timeout>(undefined);
  const controlInterval = useRef<NodeJS.Timeout>(undefined);

  const handleClick = (newState: number) => {
    if (flag.current && newState != state) {
      flag.current = false;
      setState(newState);
      clickTimeout.current = setTimeout(
        () => (flag.current = true),
        CLICK_TIMEOUT_INTERVAL,
      );
      clearInterval(controlInterval.current);
      controlInterval.current = setInterval(
        () => setState((prev) => (prev + 1) % totalImages),
        TOGGLE_INTERVAL,
      );
    }
  };
  useEffect(() => {
    if (!isInView) return;
    // controlInterval.current = setInterval(
    //   () => setState((prev) => (prev + 1) % images.length),
    //   TOGGLE_INTERVAL,
    // );
    // return () => {
    //   clearInterval(controlInterval.current);
    // };
  }, [isInView]);

  const variants = {
    animate: (custom: boolean) => ({
      left: `calc(${state} * var(--gap) + ${state} * var(--width))`,
      right: `calc(${totalImages - (state + 1)} * var(--gap) + ${totalImages - (state + 1)} * var(--width))`,
      transition: {
        left: {
          delay: custom ? 0 : EXIT_DURATION / 1000,
          // ease: [0.24, 0.43, 0.15, 0.97],
        },
        right: {
          delay: custom ? EXIT_DURATION / 1000 : 0,
          // ease: [0.24, 0.43, 0.15, 0.97],
        },
      },
    }),
  };

  useEffect(() => {
    return () => clearTimeout(clickTimeout.current);
  }, []);
  return (
    <>
      <style>
        {`
        #toggle-container{
        --gap:4px;
        --width:100px;
        }

.overflowing-content::-webkit-scrollbar-thumb {
  background: red; /* A lighter gray for the handle */
  border-radius: 5px;
}

/* Target the handle on hover */
.overflowing-content::-webkit-scrollbar-thumb:hover {
  background: #777;
}

/* --- For Firefox --- */
.overflowing-content {
  scrollbar-width: thin;
  scrollbar-color: #555 #2d2d2d; /* thumb-color track-color */
}
        }
        `}
      </style>
      <div id="toggle-container" className="flex shrink-0 justify-end">
        <div className="overflowing-content overflow-x-auto">
          <div className="w-fit space-y-1 px-2 py-1">
            <div className="flex gap-1">
              {data.map(({ imgProps }, i) => (
                <div className="flex w-25 shrink-0 flex-col gap-0.5 text-sm font-medium">
                  <span
                    className={cn(
                      "after:content-['.']",
                      i + 1 < 10 && "before:content-['0']",
                    )}
                  >
                    {i + 1}
                  </span>
                  <button
                    onClick={() => handleClick(i)}
                    className="aspect-[1.65] flex-1 cursor-pointer overflow-hidden bg-[#19191E]"
                  >
                    <motion.div
                      className="size-full"
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        ease: [0.24, 0.43, 0.15, 0.97],
                        duration: 0.6,
                      }}
                    >
                      <Image
                        {...imgProps}
                        className="size-full object-contain"
                      />
                    </motion.div>
                  </button>
                </div>
              ))}
            </div>
            <div className="relative h-0.5 w-full">
              <motion.div
                initial={false}
                animate="animate"
                variants={variants}
                custom={prevState !== undefined && state < prevState}
                className="absolute inset-y-0 bg-white/50"
              >
                <motion.div
                  key={`images[${state}]`}
                  initial={{ width: "0px" }}
                  animate={{
                    width: "var(--width)",
                    transition: {
                      duration: (TOGGLE_INTERVAL - EXIT_DURATION) / 1000,
                      delay: EXIT_DURATION / 1000,
                    },
                  }}
                  className="h-full bg-[#D20A0A]"
                ></motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
function usePrevious<T>(state: T): T | undefined {
  const prevState = useRef<T | undefined>(undefined);
  useEffect(() => {
    prevState.current = state;
  }, [state]);
  return prevState.current;
}

function useMaskImage(
  localProgress: MotionValue<number>,
  custom: boolean,
  config?: {
    cuts: number;
    inset: number;
    breadth: number;
  },
) {
  const isServer = useIsServer();

  const [isMobile, setIsMobile] = useState(() =>
    isServer ? undefined : window.matchMedia("(max-width:768px)").matches,
  );
  const { cuts = 25, inset = 0, breadth = 0.5 } = config ?? {};
  const func = (i: number, latest: number) => {
    const buffer = (1 - 2 * inset - breadth) / (cuts - 1);
    if (inset + i * buffer > latest) return 0;
    if (inset + breadth + i * buffer < latest) return 1;
    return (latest - (inset + i * buffer)) / breadth;
  };

  const maskImage = useTransform(localProgress, (latest) => {
    if (isServer) return;
    const direction = custom ? "bottom" : "top";
    if (isMobile) {
      return `linear-gradient(to ${direction},rgba(0,0,0,0) 0%,rgba(0,0,0,0) ${latest * 100}% ,rgba(0,0,0,1) ${latest * 100}%,rgba(1,1,1,1) 100%)`;
    }
    let temp = "";

    for (let i = 0; i < cuts; i++) {
      temp += `,rgba(0,0,0,0) ${i * (100 / cuts)}% ,rgba(0,0,0,0) ${func(i, latest) * (100 / cuts) + i * (100 / cuts)}%,rgba(0,0,0,1) ${func(i, latest) * (100 / cuts) + i * (100 / cuts)}%,rgba(0,0,0,1) ${(i + 1) * (100 / cuts)}%`;
    }
    return `linear-gradient(to ${direction}${temp})`;
  });

  useEffect(() => {
    const handleMediaQuery = ({ matches }: { matches: boolean }) => {
      setIsMobile(matches);
    };
    const mediaQuery = window.matchMedia("(max-width:768px)");
    mediaQuery.addEventListener("change", handleMediaQuery);
    return () => mediaQuery.removeEventListener("change", handleMediaQuery);
  }, []);

  return maskImage;
}
