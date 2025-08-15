import {
  type ActiveFile,
  type DirectoryItem,
} from "@/components/file-explorer/file-explorer.types";
import { ListContainerProps } from "@/components/list-container";
import type { PropTableProps } from "@/components/prop-table/prop-table.types";
import SyntaxHighlighterServer from "@/components/syntax-highlighter/server";

const PARALLAX_CARDS_DEMO_TSX = `import ParallaxCards from "./index";

export default function ParallaxCardsDemo() {
  const shadesOfGray = ["#E7E7E7", "#D8D8D8", "#C9C9C9", "#BABABA", "#ABABAB"];
  return (
    <ParallaxCards maxStackedCards={3} top="50px">
      {shadesOfGray.map((backgroundColor, i) => (
        <PlaceHolderCard
          key={\`placeholderCards[\${i}]\`}
          style={{ backgroundColor }}
          sNo={i + 1}
        />
      ))}
    </ParallaxCards>
  );
}

const PlaceHolderCard = ({
  style,
  sNo,
}: {
  style: React.CSSProperties;
  sNo: number;
}) => (
  <div
    className="size-full p-7 opacity-85 sm:p-10"
    style={{ ...style, height: "500px" }}
  >
    <div className="relative size-full border border-dashed p-4 sm:p-5">
      <span className="absolute top-0.75 left-0.75 text-[9px] leading-none sm:text-[11px]">
        Parallax Cards
      </span>
      <div className="size-full p-3.5 sm:p-5">
        <div className="relative z-20 size-full border p-4 sm:px-6 sm:py-5">
          <span className="absolute top-0.75 left-0.75 text-[9px] leading-none sm:text-[11px]">
            Card #{sNo}
          </span>
          <div className="relative grid size-full place-items-center overflow-hidden border border-dashed">
            <svg
              data-icon="+"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="#141414"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5px"
                d="M12 5.75V18.25"
                fill="none"
              ></path>
              <path
                stroke="#141414"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5px"
                d="M18.25 12L5.75 12"
                fill="none"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
);
`;
const TITLE = "Parallax Cards";
const DESCRIPTION =
  "A reusable and responsive component that adds a modern parallax effect to your website, making it ideal for showcasing a list of content blocks or features.";
const INDEX_TSX = `"use client";
import * as React from "react";
import { useScroll, useTransform, motion } from "motion/react";
import type { ParallaxCardsProps, CardProps } from "./parallax-cards.types";

export default function ParallaxCards({
  maxStackedCards = 3,
  top = "30px",
  forceParallax = false,
  children,
}: ParallaxCardsProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [sticky, setSticky] = React.useState(true);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const childrenCount = children.length;

  React.useEffect(() => {
    if (forceParallax) return;

    const element = containerRef.current;

    if (!element) return;
    const handleMediaQuery = ({ matches }: { matches: boolean }) =>
      setSticky(matches);

    const cardHeight = element.getBoundingClientRect().height / childrenCount;
    const mediaQuery = window.matchMedia(\`(min-height : \${cardHeight}px)\`);
    handleMediaQuery(mediaQuery);
    mediaQuery.addEventListener("change", handleMediaQuery);

    return () => mediaQuery.removeEventListener("change", handleMediaQuery);
  }, [childrenCount, forceParallax]);
  return (
    <>
      <style>
        {\`
      html{
      scroll-behaviour:smooth;}
      \`}
      </style>
      <motion.div
        ref={containerRef}
        className="relative mb-8 grid !py-0"
        style={{
          gridTemplateRows: \`repeat(\${childrenCount},1fr)\`,
        }}
      >
        {children.map((child, index) => (
          <Card
            key={\`cards[\${index}]\`}
            index={index}
            scrollYProgress={scrollYProgress}
            totalCards={childrenCount}
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
      \`\${-topMagnitude - topMagnitude / (maxStackedCards - 1)}\${topUnit}\`, // 0 , -top,- top - top/(maxStackedCards - 1)
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
    <>
      <motion.div
        style={{
          paddingTop: fullTop,
          position: sticky ? "sticky" : "relative",
        }}
        className="top-0 px-3"
      >
        <motion.div
          style={
            sticky
              ? {
                  scale,
                  opacity,
                  y,
                  maxHeight: forceParallax
                    ? \`calc(100vh - \${fullTop})\`
                    : undefined,
                }
              : undefined
          }
          className="grid size-full origin-top overflow-hidden"
        >
          {children}
        </motion.div>
      </motion.div>
    </>
  );
};
`;
const PARALLAX_CARDS_TYPES_TS = `interface ParallaxCardsProps {
  maxStackedCards?: number;
  children: React.ReactNode[];
  top?: string;
}
interface CardProps {
  index: number;
  scrollYProgress: any;
  maxStackedCards: number;
  totalCards: number;
  children: React.ReactNode | string;
  top: string;
  sticky: boolean;
}
export type { ParallaxCardsProps, CardProps };
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
        name: "parallax-cards",
        type: "directory",
        items: [
          {
            name: "parallax-cards.demo.tsx",
            type: "file",
            code: PARALLAX_CARDS_DEMO_TSX,
          },
          {
            name: "index.tsx",
            type: "file",
            code: INDEX_TSX,
          },

          {
            name: "parallax-cards.types.ts",
            type: "file",
            code: PARALLAX_CARDS_TYPES_TS,
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
  absolutePath: "components/parallax-cards/parallax-cards.demo.tsx",
  code: PARALLAX_CARDS_DEMO_TSX,
};

const PROP_TABLE: PropTableProps = {
  data: [
    {
      prop: <code>children</code>,
      type: <SyntaxHighlighterServer>React.ReactNode</SyntaxHighlighterServer>,
      description: (
        <div>
          An array of React components or elements to be rendered as individual
          cards in the parallax sequence.
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
  ],
};

const ADDITIONAL_INFORMATION: ListContainerProps[] = [
  {
    title: "Pro Tips:",
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
        Behind the scenes, the component handles this by setting each
        card&apos;s&nbsp;<code>max-height</code>&nbsp;to &nbsp;
        <code>{"calc(100vh - ${top})"}</code>&nbsp;, which makes this override
        useful for decorative or non-critical content.
      </>,
    ],
  },
];
export {
  TITLE,
  DESCRIPTION,
  ROOT_DIRECTORY,
  DEFAULT_ACTIVE_FILE,
  PROP_TABLE,
  ADDITIONAL_INFORMATION,
};
