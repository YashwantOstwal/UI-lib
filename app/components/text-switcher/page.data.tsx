import SyntaxHighlighterServer from "@/components/syntax-highlighter/server";
import {
  type ActiveFile,
  type DirectoryItem,
} from "@/components/file-explorer/file-explorer.types";
import type { PropTableProps } from "@/components/prop-table/prop-table.types";
import {
  styleProp,
  classNameProp,
} from "@/components/prop-table/commonly-used-props";

const INDEX_TSX = `"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  useVelocity,
} from "motion/react";
import type { TextSwitcherProps } from "./text-switcher.types";

export default function TextSwitcher({
  words,
  animationDurationInSec = 0.4,
  readTimeInSec = 2,
  dotRestColor,
  dotMotionColor,
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
    [dotMotionColor, dotRestColor, dotMotionColor],
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
      className={cn("relative inline-block w-fit", className)}
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
const TEXT_SWITCHER_DEMO_TSX = `import TextSwitcher from "./index";

export default function TextSwitcherDemo() {
  return (
    <div className="text-sm text-gray-900 sm:text-base md:text-xl lg:text-2xl">
      As someone who styles divs and <br className="md:hidden" /> solves backend{" "}
      <br className="max-md:hidden" />
      nightmares, I write <br className="md:hidden" />
      code that&nbsp;
      <TextSwitcher
        words={["compiles", "ships", "breaks", "runs anyway"]}
        className="font-medium"
        dotRestColor="#101828"
        dotMotionColor="#FB2C36"
      />
    </div>
  );
}
`;
const TEXT_SWITCHER_TYPES_TS = `interface TextSwitcherProps {
  words: Array<string>;
  readTimeInSec?: number;
  animationDurationInSec?: number;
  className?: string;
  dotRestColor: string;
  dotMotionColor: string;
  style?: React.CSSProperties;
}

export type { TextSwitcherProps };
`;
const UTILS_TS = `import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";

export const cn = (...args: ClassValue[]) => twMerge(clsx(args));
`;
const ROOT_DIRECTORY: DirectoryItem[] = [
  {
    name: "components",
    type: "directory",
    items: [
      {
        name: "text-switcher",
        type: "directory",
        items: [
          {
            name: "index.tsx",
            type: "file",
            code: INDEX_TSX,
          },
          {
            name: "text-switcher.demo.tsx",
            type: "file",
            code: TEXT_SWITCHER_DEMO_TSX,
          },
          {
            name: "text-switcher.types.ts",
            type: "file",
            code: TEXT_SWITCHER_TYPES_TS,
          },
        ],
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
  absolutePath: "components/text-switcher/text-switcher.demo.tsx",
  code: TEXT_SWITCHER_DEMO_TSX,
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
      prop: <code>dotRestColor</code>,
      type: <SyntaxHighlighterServer>string</SyntaxHighlighterServer>,
      description: "The CSS color of the animated dot when it is at rest.",
      defaultValue: (
        <SyntaxHighlighterServer>(required)</SyntaxHighlighterServer>
      ),
    },
    {
      prop: <code>dotMotionColor</code>,
      type: <SyntaxHighlighterServer>string</SyntaxHighlighterServer>,
      description:
        "The color of the dot while it is in motion, allowing for a color transition.",
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

export { ROOT_DIRECTORY, DEFAULT_ACTIVE_FILE, PROP_TABLE };
