import SyntaxHighlighterServer from "@/components/syntax-highlighter/server";
import {
  type ActiveFile,
  type DirectoryItem,
} from "@/components/file-explorer/file-explorer.types";
import type { PropTableProps } from "@/app/components/_components/prop-table";
import {
  styleProp,
  classNameProp,
} from "@/app/components/_components/prop-table/commonly-used-props";

const TEXT_SWITCHER_TSX = `"use client";

import * as React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  useVelocity,
} from "motion/react";

import { cn } from "@/lib/utils";

interface TextSwitcherProps {
  words: Array<string>;
  readTimeInSec?: number;
  animationDurationInSec?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function TextSwitcher({
  words,
  animationDurationInSec = 0.4,
  readTimeInSec = 2,
  className,
  style,
}: TextSwitcherProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const dotX = useMotionValue("100%");
  const dotXAsFloat = useTransform(dotX, (latest) => parseFloat(latest));
  const dotVelocity = useVelocity(dotXAsFloat);

  const dotScaleX = useTransform(dotVelocity, [-125, 0, 125], [3, 1, 3]);
  const dotColor = useTransform(
    dotVelocity,
    [-100, 0, 100],
    ["var(--destructive)", "currentColor", "var(--destructive)"],
  );

  React.useEffect(() => {
    const totalCycleTimeInMs =
      (readTimeInSec + 2 * animationDurationInSec) * 1000;
    const controlInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, totalCycleTimeInMs);

    return () => clearInterval(controlInterval);
  }, [words.length, readTimeInSec, animationDurationInSec]);

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: animationDurationInSec / words[currentIndex].length,
      },
    },
    exit: {
      transition: {
        staggerChildren: animationDurationInSec / words[currentIndex].length,
        staggerDirection: -1,
      },
    },
  };

  const letterVariants = {
    initial: { scaleX: 0, opacity: 0 },
    animate: { scaleX: 1, opacity: 1 },
    exit: { scaleX: 0, opacity: 0 },
  };

  return (
    <div
      className={cn("!relative inline-block", className)}
      style={{ ...style }}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          className="flex flex-nowrap whitespace-pre"
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {words[currentIndex].split("").map((letter, index) => (
            <motion.div
              key={\`\${currentIndex}-\${index}\`}
              className="origin-left"
              variants={letterVariants}
              transition={{
                duration: animationDurationInSec / words[currentIndex].length,
              }}
            >
              {letter}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={\`\${currentIndex}-dot\`}
          style={{ left: dotX, scaleX: dotScaleX, color: dotColor }}
          className="absolute inset-y-0"
          variants={{
            initial: { left: "0%" },
            animate: {
              left: "100%",
              transformOrigin: "100% 50%",
              transition: {
                duration: animationDurationInSec,
                ease: [0.33, 1, 0.68, 1],
              },
            },
            exit: {
              left: "0%",
              transformOrigin: "0% 50%",
              transition: {
                duration: animationDurationInSec,
                ease: [0.32, 0, 0.67, 0],
              },
            },
          }}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          .
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
`;

const TEXT_SWITCHER_DEMO_TSX = `import { TextSwitcher } from "./text-switcher";

export function TextSwitcherDemo() {
  return (
    <div className="text-sm sm:text-base md:text-xl lg:text-2xl">
      As someone who styles divs and <br className="md:hidden" /> solves
      backend&nbsp;
      <br className="max-md:hidden" />
      nightmares, I write <br className="md:hidden" />
      code that&nbsp;
      <TextSwitcher
        words={["compiles", "ships", "breaks", "runs anyway"]}
        className="font-medium"
      />
    </div>
  );
}
`;
const UTILS_TS = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as React from "react";
import { isValidElement } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function assertOnlyChild(children: React.ReactNode) {
  if (Array.isArray(children))
    throw new Error(
      "A single child is required, but received multiple siblings.",
    );
  if (
    children &&
    isValidElement(children) &&
    children.type === React.Fragment &&
    Array.isArray((children.props as React.FragmentProps).children)
  )
    throw new Error(
      "A single child is required; fragments that render multiple siblings are not allowed.",
    );
}
`;
const ROOT_DIRECTORY: DirectoryItem[] = [
  {
    name: "components",
    type: "directory",
    items: [
      {
        name: "text-switcher.tsx",
        type: "file",
        code: TEXT_SWITCHER_TSX,
      },
    ],
  },
  {
    name: "lib",
    type: "directory",
    items: [
      {
        name: "utils.ts",
        type: "file",
        code: UTILS_TS,
      },
    ],
  },
];
const DEFAULT_ACTIVE_FILE: ActiveFile = {
  absolutePath: "components/text-switcher.tsx",
  code: TEXT_SWITCHER_TSX,
};

const PROP_TABLE: PropTableProps = {
  data: [
    {
      prop: <code>words</code>,
      type: (
        <SyntaxHighlighterServer>{`Array<string>`}</SyntaxHighlighterServer>
      ),
      description: "An array of strings that the component will cycle through.",
      defaultValue: (
        <SyntaxHighlighterServer>(required)</SyntaxHighlighterServer>
      ),
    },
    {
      prop: <code>animationDurationInSec?</code>,
      type: <SyntaxHighlighterServer>number</SyntaxHighlighterServer>,
      description: `The duration, in seconds, of the enter and exit animations for each word.`,
      defaultValue: <SyntaxHighlighterServer>0.4</SyntaxHighlighterServer>,
    },
    {
      prop: <code>readTimeInSec?</code>,
      type: <SyntaxHighlighterServer>number</SyntaxHighlighterServer>,
      description:
        "The display duration, in seconds, for each word before its exit animation starts.",
      defaultValue: <SyntaxHighlighterServer>2</SyntaxHighlighterServer>,
    },
    styleProp,
    classNameProp,
  ],
};
const TITLE = "Text switcher",
  DESCRIPTION =
    "A reusable component that creates an engaging animation effect by smoothly transitioning between a list of words. The animation, driven by a moving dot, makes it ideal for dynamically completing a sentence or tagline.",
  USAGE = { title: TITLE, code: TEXT_SWITCHER_DEMO_TSX };
export {
  TITLE,
  DESCRIPTION,
  ROOT_DIRECTORY,
  DEFAULT_ACTIVE_FILE,
  PROP_TABLE,
  USAGE,
};
