import SyntaxHighlighterServer from "@/components/syntax-highlighter/server";
import type {
  ActiveFile,
  DirectoryItem,
  File,
} from "@/components/file-explorer/file-explorer.types";
import type { PropTableProps } from "@/app/components/_components/prop-table";
import {
  styleProp,
  classNameProp,
} from "@/app/components/_components/prop-table/commonly-used-props";

const SPINNING_CAROUSEL_TSX = `"use client";

import * as React from "react";
import { motion, MotionProps, useInView } from "motion/react";

import { cn } from "@/lib/utils";

const CARD_STATES = [
  { opacity: 0.6, zIndex: 2, x: "-100%" },
  { opacity: 1, zIndex: 3, x: "0%" },
  { opacity: 0.6, zIndex: 2, x: "100%" },
  { opacity: 0, zIndex: 1, x: "0%" },
];
const TOTAL_CARDS = 4;

export interface SpinningCarouselProps {
  children: React.ReactNode[];
  readTimeInSec?: number;
  animationDurationInSec?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function SpinningCarousel({
  children,
  readTimeInSec = 4,
  animationDurationInSec = 0.8,
  className,
  style,
}: SpinningCarouselProps) {
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef);
  const intervalRef = React.useRef<NodeJS.Timeout>(undefined);

  const [carouselState, setCarouselState] = React.useState<{
    index: number;
    visibleCardIndices: number[];
  }>({
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
        (readTimeInSec + animationDurationInSec) * 1000,
      );
    }

    return () => clearInterval(intervalRef.current);
  }, [animationDurationInSec, children.length, readTimeInSec, isInView]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "grid w-full grid-cols-7 !overflow-hidden lg:grid-cols-4",
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
              duration: animationDurationInSec,
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
      className="col-span-5 col-start-2 row-start-1 grid p-1.5 sm:p-2 lg:col-span-2 lg:col-start-2 lg:p-3"
    >
      {children}
    </motion.div>
  );
}
`;
const SPINNING_CAROUSEL_DEMO_TSX = `import { SpinningCarousel } from "./spinning-carousel";

export function SpinningCarouselDemo() {
  return (
    <SpinningCarousel className="mt-16">
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
  <div className="bg-card text-card-foreground flex flex-col justify-between gap-10 rounded-3xl px-5 py-4 shadow-[0px_8px_12px_-4px_rgba(15,12,12,0.08),0px_0px_2px_0px_rgba(15,12,12,0.10),0px_1px_2px_0px_rgba(15,12,12,0.10)] lg:px-7 lg:py-6 dark:shadow-[0_4px_12px_rgba(0,0,0,0.35),0_1px_rgba(255,255,255,0.05)_inset]">
    <p className="-indent-[6px] text-lg leading-snug font-medium sm:text-xl lg:-indent-2 lg:text-2xl">
      &quot;{quote}&quot;
    </p>
    <div className="flex items-center gap-4">
      <div
        className="aspect-square w-12 rounded-full"
        style={{ backgroundColor: avatar }}
      />

      <div>
        <p className="text-base font-medium">{name}</p>
        <p className="text-muted-foreground text-sm">{role}</p>
      </div>
    </div>
  </div>
);
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
        name: "spinning-carousel.tsx",
        type: "file",
        code: SPINNING_CAROUSEL_TSX,
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
  absolutePath: "components/spinning-carousel.tsx",
  code: SPINNING_CAROUSEL_TSX,
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
      defaultValue: <SyntaxHighlighterServer>4</SyntaxHighlighterServer>,
    },
    styleProp,
    classNameProp,
  ],
};
const USAGE: File = {
  name: "components/spinning-carousel.demo.tsx",
  code: SPINNING_CAROUSEL_DEMO_TSX,
  type: "file",
};
const TITLE = "Spinning carousel";
const DESCRIPTION =
  "A reusable, responsive carousel that loops through any number of cards in a smooth spinning motion, automatically showcasing content in compact spaces, perfect for testimonials, product highlights, or feature lists.";
export {
  USAGE,
  TITLE,
  DESCRIPTION,
  ROOT_DIRECTORY,
  DEFAULT_ACTIVE_FILE,
  PROP_TABLE,
};
