import {
  type ActiveFile,
  type DirectoryItem,
} from "@/components/file-explorer/file-explorer.types";
import { ListContainerProps } from "@/components/list-container";
import type { PropTableProps } from "@/app/components/_components/prop-table";
import SyntaxHighlighterServer from "@/components/syntax-highlighter/server";
import {
  classNameProp,
  styleProp,
} from "../../_components/prop-table/commonly-used-props";

const PARALLAX_CARDS_DEMO_TSX = `import { PlusIcon } from "lucide-react";

import { ParallaxCards } from "./parallax-cards";

export function ParallaxCardsDemo() {
  return (
    <ParallaxCards maxStackedCards={3} top="50px">
      <PlaceholderCard index={0} />
      <PlaceholderCard index={1} />
      <PlaceholderCard index={2} />
      <PlaceholderCard index={3} />
      <PlaceholderCard index={4} />
    </ParallaxCards>
  );
}

function PlaceholderCard({ index }: { index: number }) {
  function Message({ children }: { children: string }) {
    return (
      <span className="absolute top-0.75 left-0.75 text-[9px] leading-none sm:text-xs">
        {children}
      </span>
    );
  }
  return (
    <div
      className="p-7 opacity-85 sm:p-10"
      style={{ backgroundColor: \`var(--chart-\${index + 1})\`, height: "500px" }}
    >
      <div className="border-foreground relative size-full border border-dashed p-4 sm:p-5">
        <Message>Parallax Cards</Message>
        <div className="size-full p-3.5 sm:p-5">
          <div className="border-foreground relative z-20 size-full border p-4 sm:px-6 sm:py-5">
            <Message>{\`Card # \${index + 1}\`}</Message>
            <div className="border-foreground relative grid size-full place-items-center overflow-hidden border border-dashed">
              <PlusIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`;

const TITLE = "Parallax cards";
const DESCRIPTION =
  "A reusable and responsive component that adds a modern parallax effect to your website, making it ideal for showcasing a list of content blocks or features.";
const PARALLAX_CARDS_TSX = `"use client";

import * as React from "react";
import { useScroll, useTransform, motion } from "motion/react";

import { cn } from "@/lib/utils";

import type { MotionValue } from "motion";

interface ParallaxCardsProps {
  children: React.ReactNode[];
  maxStackedCards?: number;
  top?: string;
  forceParallax?: boolean;
  style?: React.CSSProperties;
  className?: string;
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

export function ParallaxCards({
  maxStackedCards = 3,
  top = "30px",
  forceParallax = false,
  className,
  style,
  children,
}: ParallaxCardsProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [sticky, setSticky] = React.useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const totalCards = children.length;

  React.useEffect(() => {
    if (forceParallax) return;

    const element = containerRef.current;
    if (!element) return;

    const handleMediaQuery = ({ matches }: { matches: boolean }) =>
      setSticky(matches);

    const cardHeight = element.getBoundingClientRect().height / totalCards;
    const mediaQuery = window.matchMedia(\`(min-height : \${cardHeight}px)\`); // should add resize listener if child’s height is dynamic

    handleMediaQuery(mediaQuery);
    mediaQuery.addEventListener("change", handleMediaQuery);

    return () => mediaQuery.removeEventListener("change", handleMediaQuery);
  }, [totalCards, forceParallax]);

  return (
    <>
      <style>{\`
        html {
          scroll-behavior: smooth;
        }
      \`}</style>
      <motion.div
        ref={containerRef}
        className={cn("relative w-full !py-0", className)}
        style={{
          display: "grid",
          gridTemplateRows: \`repeat(\${totalCards},1fr)\`,
          ...style,
        }}
      >
        {children.map((child, index) => (
          <Card
            key={\`cards[\${index}]\`}
            index={index}
            scrollYProgress={scrollYProgress}
            totalCards={totalCards}
            maxStackedCards={maxStackedCards}
            top={top}
            sticky={sticky}
            forceParallax={forceParallax}
          >
            {child}
          </Card>
        ))}
      </motion.div>
    </>
  );
}

const Card = ({
  index,
  scrollYProgress,
  maxStackedCards,
  totalCards,
  children,
  top,
  sticky,
  forceParallax,
}: CardProps) => {
  const topMagnitude = parseFloat(top);
  const topUnit = top.slice(String(topMagnitude).length) || "px";

  if (topUnit == "%") throw new Error("% as spacing unit is not supported.");

  const fullTop = topMagnitude + topUnit;
  const scrollRatio = 1 / totalCards;

  const y = useTransform(
    scrollYProgress,
    [
      index * scrollRatio,
      (index + maxStackedCards - 1) * scrollRatio,
      (index + maxStackedCards) * scrollRatio,
    ],
    [
      "0",
      \`-\${fullTop}\`,
      \`\${-topMagnitude - topMagnitude / (maxStackedCards - 1)}\${topUnit}\`, // 0, -top, -top - top/(maxStackedCards - 1)
    ],
  );

  const scale = useTransform(
    scrollYProgress,
    [index * scrollRatio, (index + maxStackedCards) * scrollRatio],
    [1, 0.85],
  );

  const opacity = useTransform(
    scrollYProgress,
    [
      (index + maxStackedCards - 1) * scrollRatio,
      (index + maxStackedCards) * scrollRatio,
    ],
    [1, 0],
  );

  return (
    <motion.div
      style={{
        paddingTop: fullTop,
        position: sticky ? "sticky" : "relative",
      }}
      className="top-0 w-full px-3"
    >
      <motion.div
        style={
          sticky
            ? {
                scale,
                opacity,
                y,
                maxHeight: forceParallax
                  ? \`calc(100svh - \${fullTop})\`
                  : undefined,
              }
            : undefined
        }
        className="grid size-full origin-top overflow-hidden"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
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
        name: "parallax-cards.tsx",
        type: "file",
        code: PARALLAX_CARDS_TSX,
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
  absolutePath: "components/parallax-cards.tsx",
  code: PARALLAX_CARDS_TSX,
};

const PROP_TABLE: PropTableProps = {
  data: [
    {
      prop: <code>children</code>,
      type: (
        <SyntaxHighlighterServer>React.ReactNode[]</SyntaxHighlighterServer>
      ),
      description: (
        <div>
          An array of ReactNodes to be rendered as individual cards in the
          parallax sequence.
        </div>
      ),
      defaultValue: (
        <SyntaxHighlighterServer>(required)</SyntaxHighlighterServer>
      ),
    },
    {
      prop: <code>maxStackedCards?</code>,
      type: <SyntaxHighlighterServer>number</SyntaxHighlighterServer>,
      description:
        "The number of cards that remain visibly stacked on top of each other before the bottom-most card begins to fade and scroll out of view.",
      defaultValue: <SyntaxHighlighterServer>3</SyntaxHighlighterServer>,
    },
    {
      prop: <code>top?</code>,
      type: <SyntaxHighlighterServer>string</SyntaxHighlighterServer>,
      description: `The CSS top offset for the sticky cards. This determines how far from the top of the window each card "sticks" as you scroll.`,
      defaultValue: (
        <SyntaxHighlighterServer>&quot;50px&quot;</SyntaxHighlighterServer>
      ),
    },
    {
      prop: <code>forceParallax?</code>,
      type: <SyntaxHighlighterServer>boolean</SyntaxHighlighterServer>,
      description: (
        <div>
          If set to&nbsp;<code>true</code>, enforces the parallax effect even if
          the card is too tall to fully fit within the viewport (i.e., card
          height + top offset &gt; viewport height). Otherwise, the
          component&nbsp;
          <span className="font-semibold">opts out</span>&nbsp;of the parallax
          effect any time the viewport height changes and the card no longer
          fits, preventing the bottom part from being cut off due to the sticky
          property.
        </div>
      ),
      defaultValue: <SyntaxHighlighterServer>false</SyntaxHighlighterServer>,
    },
    styleProp,
    classNameProp,
  ],
};

const ADDITIONAL_INFORMATION: ListContainerProps[] = [
  {
    title: "Good to know:",
    variant: "pro-tips",
    list: [
      <>
        The Parallax effect is designed to prevent content clipping by
        automatically turning off if the card&apos;s height plus its top offset
        exceeds the viewport height. However, you can override this default
        behavior by setting&nbsp;<code>forceParallax</code>&nbsp;prop as &nbsp;
        <code>true</code>&nbsp;. This forces the parallax effect to run, but
        cards overflowing will be clipped by the bottom of the viewport.
      </>,
      <>
        Each child spans the height of its tallest sibling, keeping all children
        consistent in size to avoid odd visuals and deliver a smooth parallax
        effect.
      </>,
    ],
  },
];
const USAGE = {
  title: TITLE,
  code: PARALLAX_CARDS_DEMO_TSX,
};
export {
  TITLE,
  DESCRIPTION,
  ROOT_DIRECTORY,
  DEFAULT_ACTIVE_FILE,
  PROP_TABLE,
  ADDITIONAL_INFORMATION,
  USAGE,
};
