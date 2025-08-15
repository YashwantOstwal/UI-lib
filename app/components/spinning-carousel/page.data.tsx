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
import { motion, MotionProps, useInView } from "motion/react";
import { cn } from "@/lib/utils";
import type { SpinningCarouselProps } from "./spinning-carousel.types";

const CARD_STATES = [
  { opacity: 0.6, zIndex: 2, x: "-100%" },
  { opacity: 1, zIndex: 3, x: "0%" },
  { opacity: 0.6, zIndex: 2, x: "100%" },
  { opacity: 0, zIndex: 1, x: "0%" },
];

const TOTAL_CARDS = 4;

export default function SpinningCarousel({
  children,
  readTimeInSec = 3.5,
  animationTimeInSec = 0.8,
  className,
  style,
}: SpinningCarouselProps) {
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef);
  const intervalRef = React.useRef<NodeJS.Timeout>(undefined);

  const [carouselState, setCarouselState] = React.useState({
    index: 0,
    visibleCardIndices: Array.from(
      { length: TOTAL_CARDS },
      (_, i) => i % children.length,
    ),
  });

  React.useEffect(() => {
    if (isInView) {
      intervalRef.current = setInterval(
        () => {
          setCarouselState(({ index, visibleCardIndices }) => {
            const nextIndex = index + 1;

            const updatedVisibleIndices = visibleCardIndices.map(
              (cardIndex, i) =>
                (i - (nextIndex % TOTAL_CARDS) + TOTAL_CARDS) % TOTAL_CARDS ===
                2
                  ? (index + TOTAL_CARDS - 1) % children.length
                  : cardIndex,
            );

            return {
              index: nextIndex,
              visibleCardIndices: updatedVisibleIndices,
            };
          });
        },
        (readTimeInSec + animationTimeInSec) * 1000,
      );
    }

    return () => clearInterval(intervalRef.current);
  }, [animationDurationInSec, children.length, readTimeInSec, isInView]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative isolate flex h-72 justify-center overflow-hidden sm:h-68.5 lg:h-65",
        className,
      )}
      style={style}
    >
      {carouselState.visibleCardIndices.map((cardIndex, i) => {
        const newState =
          (i - (carouselState.index % TOTAL_CARDS) + TOTAL_CARDS) % TOTAL_CARDS;

        return (
          <CarouselCard
            key={\`carouselCards[\${i}]\`}
            initial={CARD_STATES[i]}
            animate={CARD_STATES[newState]}
            transition={{
              duration: animationTimeInSec,
              ease: [0.33, 1, 0.68, 1], // easeInOutCubic
            }}
          >
            {children[cardIndex]}
          </CarouselCard>
        );
      })}
    </div>
  );
}

function CarouselCard({ children, ...motionProps }: MotionProps) {
  return (
    <motion.div
      {...motionProps}
      className="absolute inset-y-0 w-4/5 p-3 sm:w-3/5 lg:w-1/2 [&>*]:size-full"
    >
      {children}
    </motion.div>
  );
}
`;
const SPINNING_CAROUSEL_DEMO_TSX = `import SpinningCarousel from "./index";

export default function SpinningCarouselDemo() {
  return (
    <SpinningCarousel className="my-16">
      {testimonials.map((t) => (
        <TestimonialCard key={t.name} {...t} />
      ))}
    </SpinningCarousel>
  );
}

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "This SaaS cut our onboarding time from days to hours, all without messy spreadsheets.",
    name: "Sarah Mitchell",
    role: "Operations Manager at FlowBridge",
    avatar: "#FCA5A5",
  },
  {
    quote:
      "The dashboard delivers real-time insights, helping us make faster, smarter decisions.",
    name: "James Carter",
    role: "CEO at BrightPath",
    avatar: "#93C5FD",
  },
  {
    quote:
      "We replaced three tools with this one. It’s clean, intuitive, and a joy to use.",
    name: "Priya Desai",
    role: "Product Lead at QuantumEdge",
    avatar: "#A5B4FC",
  },
  {
    quote:
      "Setup took less than a day, and productivity improved immediately across teams.",
    name: "Daniel Kim",
    role: "CTO at Nexora",
    avatar: "#FDBA74",
  },
  {
    quote:
      "Support is fast, friendly, and the product keeps getting better with each update.",
    name: "Elena Rodriguez",
    role: "Head of Marketing at OrbitIQ",
    avatar: "#86EFAC",
  },
];

const TestimonialCard = ({ quote, name, role, avatar }: Testimonial) => (
  <div className="flex flex-col justify-between rounded-2xl bg-white px-5 py-4 shadow-[0px_8px_12px_-4px_rgba(15,12,12,0.08),0px_0px_2px_0px_rgba(15,12,12,0.10),0px_1px_2px_0px_rgba(15,12,12,0.10)] lg:px-7 lg:py-6">
    <p className="-indent-[6px] text-lg leading-snug font-medium text-gray-900 sm:text-xl lg:-indent-2 lg:text-2xl">
      &quot;{quote}&quot;
    </p>
    <div className="flex items-center gap-4">
      <div
        className="aspect-square w-12 rounded-full"
        style={{ backgroundColor: avatar }}
      />
      <div>
        <p className="text-base font-medium text-gray-900">{name}</p>
        <p className="text-sm text-gray-700">{role}</p>
      </div>
    </div>
  </div>
);
`;
const SPINNING_CAROUSEL_TYPES_TS = `interface SpinningCarouselProps {
  children: React.ReactNode[];
  readTimeInSec?: number;
  animationTimeInSec?: number;
  className?: string;
  style?: React.CSSProperties;
}

export type { SpinningCarouselProps };
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
        name: "spinning-carousel",
        type: "directory",
        items: [
          {
            name: "index.tsx",
            type: "file",
            code: INDEX_TSX,
          },
          {
            name: "spinning-carousel.demo.tsx",
            type: "file",
            code: SPINNING_CAROUSEL_DEMO_TSX,
          },
          {
            name: "spinning-carousel.types.ts",
            type: "file",
            code: SPINNING_CAROUSEL_TYPES_TS,
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
  absolutePath: "components/spinning-carousel/spinning-carousel.demo.tsx",
  code: SPINNING_CAROUSEL_DEMO_TSX,
};

const PROP_TABLE: PropTableProps = {
  data: [
    {
      prop: <code>children</code>,
      type: (
        <SyntaxHighlighterServer>
          {"Array<React.ReactNode>"}
        </SyntaxHighlighterServer>
      ),
      description: "An array of React nodes to be rendered as carousel cards.",
      defaultValue: (
        <SyntaxHighlighterServer>(required)</SyntaxHighlighterServer>
      ),
    },
    {
      prop: <code>animationDurationInSec?</code>,
      type: <SyntaxHighlighterServer>number</SyntaxHighlighterServer>,
      description:
        "Duration (in seconds) of the transition animation between carousel cards.",
      defaultValue: <SyntaxHighlighterServer>0.8</SyntaxHighlighterServer>,
    },
    {
      prop: <code>readTimeInSec?</code>,
      type: <SyntaxHighlighterServer>number</SyntaxHighlighterServer>,
      description: `Time (in seconds) each card stays visible before moving to the next. This allows the user time to read and view the content.`,
      defaultValue: <SyntaxHighlighterServer>3.5</SyntaxHighlighterServer>,
    },
    styleProp,
    classNameProp,
  ],
};

const TITLE = "Spinning Carousel";
const DESCRIPTION =
  "A reusable, responsive carousel that loops through any number of cards in a smooth spinning motion, automatically showcasing content in compact spaces, perfect for testimonials, product highlights, or feature lists.";
export { TITLE, DESCRIPTION, ROOT_DIRECTORY, DEFAULT_ACTIVE_FILE, PROP_TABLE };
