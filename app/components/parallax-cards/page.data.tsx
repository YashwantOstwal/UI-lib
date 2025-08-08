import {
  type ActiveFile,
  type DirectoryItem,
} from "@/components/file-explorer/file-explorer.types";
import type { PropTableProps } from "@/components/prop-table/prop-table.types";

const PARALLAX_CARDS_DEMO_TSX = `import ParallaxCards from "./parallax-cards";
import { MOCK_PROPS_PARALLAX_CARDS } from "./parallax-cards.data";

export default function ParallaxCardsPreview() {
  return <ParallaxCards {...MOCK_PROPS_PARALLAX_CARDS} />;
}
`;
const INDEX_TSX = `"use client";
import * as React from "react";
import { useScroll, useTransform, motion } from "motion/react";
import { ParallaxCardsProps, CardProps } from "./parallax-cards.types";

const ParallaxCards = ({
  maxStackedCards = 3,
  top = "30px",
  children,
}: ParallaxCardsProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [sticky, setSticky] = React.useState(true);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const childrenCount = children.length;

  React.useEffect(() => {
    const handleResize = ({ matches }: { matches: boolean }) =>
      setSticky(matches);
    let mediaQuery: MediaQueryList;
    if (ref.current) {
      const cardHeight =
        ref.current.getBoundingClientRect().height / childrenCount;
      mediaQuery = window.matchMedia(\`(min-height : \${cardHeight}px)\`);
      handleResize(mediaQuery);
      mediaQuery.addEventListener("change", handleResize);
    }
    return () => {
      ref.current && mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);
  return (
    <>
      <style>
        {\`
      html{
      scroll-behaviour:smooth;}
      \`}
      </style>
      <motion.div
        ref={ref}
        className="relative mb-8 grid !p-0"
        style={{
          gridTemplateRows: \`repeat(\${childrenCount}, minmax(0, 1fr))\`,
        }}
      >
        {children.map((child, index) => (
          <Card
            key={index}
            index={index}
            scrollYProgress={scrollYProgress}
            totalCards={childrenCount}
            maxStackedCards={maxStackedCards}
            top={top}
            sticky={sticky}
          >
            {child}
          </Card>
        ))}
      </motion.div>
    </>
  );
};
const Card = ({
  index,
  scrollYProgress,
  maxStackedCards,
  totalCards,
  children,
  top,
  sticky,
}: CardProps) => {
  const r = 1 / totalCards;

  const topMagnitude = parseFloat(top);
  const topUnit = top.slice(String(topMagnitude).length) || "px";
  if (topUnit == "%") throw new Error("% as spacing unit is not supported.");
  const fullTop = topMagnitude + topUnit;
  const y = useTransform(
    scrollYProgress,
    [index * r, (index + maxStackedCards - 1) * r, (index + maxStackedCards) * r],
    [
      "0",
      \`-\${fullTop}\`,
      \`\${-topMagnitude - topMagnitude / (maxStackedCards - 1)}\${topUnit}\`,
    ],
    // 0 , -top,- top - top/(maxStackedCards - 1)
  );
  const scale = useTransform(
    scrollYProgress,
    [index * r, (index + maxStackedCards) * r],
    [1, 0.85],
  );
  const opacity = useTransform(
    scrollYProgress,
    [(index + maxStackedCards - 1) * r, (index + maxStackedCards) * r],
    [1, 0],
  );
  return (
    <>
      <style>{\`
          [data-component="card"]{
          --max-h: calc(100vh - \${fullTop});
          }
      \`}</style>
      <motion.div
        data-component="card"
        style={{
          paddingTop: fullTop,
          position: sticky ? "sticky" : "relative",
        }}
        className="top-0 px-3 not-last:[&>div]:max-h-(--max-h)"
      >
        <motion.div
          style={
            sticky
              ? {
                  scale,
                  opacity,
                  y,
                }
              : {
                  scale: 1,
                  opacity: 1,
                  y: "0px",
                }
          }
          className="grid size-full origin-top overflow-hidden"
        >
          {children}
        </motion.div>
      </motion.div>
    </>
  );
};
export default ParallaxCards;
`;
const PARALLAX_CARDS_DATA_TSX = `import { ParallaxCardsProps } from "./parallax-cards.types";

export const MOCK_PROPS_PARALLAX_CARDS: ParallaxCardsProps = {
  maxStackedCards: 3,
  top: "50px",
  children: ["#E7E7E7", "#D8D8D8", "#C9C9C9", "#BABABA", "#ABABAB"].map(
    (backgroundColor, i) => (
      <div
        className="size-full p-7 opacity-85 sm:p-10"
        style={{ backgroundColor, height: "450px" }}
      >
        <div className="relative size-full border border-dashed p-4 sm:p-5">
          <span className="absolute top-0.75 left-0.75 text-[9px] leading-none sm:text-[11px]">
            Parallax Cards
          </span>
          <div className="size-full p-3.5 sm:p-5">
            <div className="relative z-20 size-full border p-4 sm:px-6 sm:py-5">
              <span className="absolute top-0.75 left-0.75 text-[9px] leading-none sm:text-[11px]">
                Card #{i + 1}
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
    ),
  ),
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
export const ROOT_DIRECTORY: DirectoryItem[] = [
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
            name: "parallax-cards.data.tsx",
            type: "file",
            code: PARALLAX_CARDS_DATA_TSX,
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
export const DEFAULT_ACTIVE_FILE: ActiveFile = {
  absolutePath: "components/parallax-cards/parallax-cards.demo.tsx",
  code: PARALLAX_CARDS_DEMO_TSX,
};

export const PROP_TABLE: PropTableProps = {
  data: [
    {
      prop: <code>maxStackedCards?</code>,
      type: "number",
      description:
        "The number of cards that remain visibly stacked on top of each other before the bottom-most card begins to fade and scroll out of view.",
      defaultValue: "3",
    },
    {
      prop: <code>top?</code>,
      type: "string",
      description: `The CSS top offset for the sticky cards. This determines how far from the top of the window each card "sticks" as you scroll.`,
      defaultValue: "50px",
    },
    {
      prop: <code>children</code>,
      type: "React.ReactNode",
      description:
        "An array of React components or elements to be rendered as individual cards in the parallax sequence.",
      defaultValue: "50px",
    },
  ],
};
