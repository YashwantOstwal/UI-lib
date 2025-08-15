import SyntaxHighlighterServer from "@/components/syntax-highlighter/server";
import {
  type ActiveFile,
  type DirectoryItem,
} from "@/components/file-explorer/file-explorer.types";
import type { PropTableProps } from "@/components/prop-table/prop-table.types";

const INDEX_TSX = `"use client";
import * as React from "react";
import usePrevious from "@/hooks/use-previous";
import useDebouncedState from "@/hooks/use-debounced-state";

import type {
  MotionToolbarProps,
  TooltipsContainerProps,
} from "./motion-toolbar.types";

import {
  useAnimate,
  motion,
  AnimatePresence,
  usePresence,
  useMotionValue,
  Transition,
  easeInOut,
} from "motion/react";

const ANIMATION_TRANSITION: Transition = {
  duration: 0.25,
  ease: easeInOut,
};
export default function MotionToolbar({ items }: MotionToolbarProps) {
  const [mouseIn, setMouseIn] = useDebouncedState<number>(0, 150);
  const toolBarRef = React.useRef<HTMLDivElement>(null);
  const handleReset = () => setMouseIn(0);
  return (
    <>
      <style>{\`
      [data-component="toolbar"] {
      --toolbar-bg: #1F2121;
      --tooltip-bg: oklch(0.3032 0.003 197.01);
      --icon-color: oklch(0.9304 0.003 106.45);
      --icon-hover-bg: #2D2F2F;
      --icon-focus-outline: #474747;
      --tooltip-text:#f5f5f5;
  }
  \`}</style>
      <div className="relative w-fit" data-component="toolbar">
        <div
          ref={toolBarRef}
          className="flex gap-1 rounded-xl border border-(--icon-color)/10 bg-(--toolbar-bg) p-1.5 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]"
          onMouseLeave={handleReset}
          onBlur={() => mouseIn === items?.length && handleReset()}
        >
          {items?.map(({ icon, tooltip, ...rest }, i) => (
            <motion.button
              key={tooltip}
              aria-label={tooltip}
              whileHover={{ backgroundColor: "var(--icon-hover-bg)" }}
              {...rest}
              onFocus={() => setMouseIn(i + 1)}
              onMouseEnter={() => setMouseIn(i + 1)}
              data-tab={i + 1}
              className="cursor-pointer rounded-lg p-1.5 px-2 outline-offset-1 focus:bg-(--icon-hover-bg) focus:outline-2 focus:outline-(--icon-focus-outline) focus-visible:bg-(--icon-hover-bg) [&>svg]:size-6"
            >
              {icon}
            </motion.button>
          ))}
        </div>
        <AnimatePresence>
          {mouseIn && (
            <ToolTipsContainer
              mouseIn={mouseIn}
              toolBarRef={toolBarRef as React.RefObject<HTMLDivElement>}
              tooltips={items?.map(({ tooltip }) => tooltip)}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

function ToolTipsContainer({
  toolBarRef,
  mouseIn,
  tooltips,
}: TooltipsContainerProps) {
  const prevMouseIn = usePrevious<number>(mouseIn);
  const [isPresent, safeToRemove] = usePresence();
  const [tooltipContainerScope, animate] = useAnimate();
  const x = useMotionValue(0);

  const getTranslateX = React.useCallback(
    (mouseIn: number) => {
      const hoveredTab = toolBarRef.current.querySelector(
        \`[data-tab="\${mouseIn}"]\`,
      );
      const { left: tabLeft, width: tabWidth } =
        hoveredTab?.getBoundingClientRect() as DOMRect;
      const finalPosition = tabLeft + tabWidth / 2;

      const correspondingTooltip = tooltipContainerScope.current.querySelector(
        \`[data-tooltip="\${mouseIn}"]\`,
      );
      const { left: tooltipLeft, width: tooltipWidth } =
        correspondingTooltip.getBoundingClientRect() as DOMRect;
      const currentPosition = tooltipLeft + tooltipWidth / 2;

      const relativeTranslateX = finalPosition - currentPosition;
      const translateX = relativeTranslateX + x.get();
      return translateX;
    },
    [x, toolBarRef, tooltipContainerScope],
  );

  const getClipPath = React.useCallback(
    (mouseIn: number) => {
      let left = 0;
      let right = 0;
      for (let j = 1; j <= tooltips.length; j++) {
        const { width } = tooltipContainerScope.current
          .querySelector(\`[data-tooltip="\${j}"]\`)
          .getBoundingClientRect();
        if (j < mouseIn) {
          left += width;
        } else if (j > mouseIn) {
          right += width;
        }
      }
      const clipPath = \`inset(0px \${right}px 0px \${left}px round 5px)\`;
      return clipPath;
    },
    [tooltips.length, tooltipContainerScope],
  );

  React.useEffect(() => {
    if (isPresent) {
      const keyframes = {
        clipPath: getClipPath(mouseIn),
        x: getTranslateX(mouseIn),
      };
      if (prevMouseIn === undefined) {
        const enterAnimation = async () => {
          await animate(tooltipContainerScope.current, keyframes, {
            duration: 0,
          });
          await animate(
            tooltipContainerScope.current,
            { opacity: 1 },
            ANIMATION_TRANSITION,
          );
        };
        enterAnimation();
      } else {
        const intermediateAnimation = () => {
          animate(
            tooltipContainerScope.current,
            keyframes,
            ANIMATION_TRANSITION,
          );
        };
        intermediateAnimation();
      }
    } else {
      const exitAnimation = async () => {
        await animate(
          tooltipContainerScope.current,
          { opacity: 0 },
          ANIMATION_TRANSITION,
        );
        safeToRemove();
      };
      exitAnimation();
    }
  }, [
    animate,
    safeToRemove,
    isPresent,
    prevMouseIn,
    mouseIn,
    getClipPath,
    getTranslateX,
    tooltipContainerScope,
  ]);

  return (
    <motion.div
      ref={tooltipContainerScope}
      style={{
        x,
      }}
      initial={{
        opacity: 0,
      }}
      className="absolute bottom-[110%] flex flex-nowrap bg-(--tooltip-bg) py-1 text-sm text-(--tooltip-text)"
    >
      {tooltips.map((tooltip, i) => (
        <div
          key={tooltip + i}
          className="px-2 text-nowrap whitespace-nowrap"
          data-tooltip={i + 1}
        >
          {tooltip}
        </div>
      ))}
    </motion.div>
  );
}
`;
const MOTION_TOOLBAR_PROPS_TSX = `import type { MotionToolbarProps } from "./motion-toolbar.types";

export const DEMO_PROPS: MotionToolbarProps = {
  items: [
    {
      icon: (
        <svg
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M5 5m0 1a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1z"
            stroke="var(--icon-color)"
            fill="none"
            strokeWidth="1.8px"
          />
          <path
            d="M9 9h6v6h-6z"
            stroke="var(--icon-color)"
            fill="none"
            strokeWidth="1.8px"
          />
          <path
            d="M3 10h2"
            stroke="var(--icon-color)"
            fill="none"
            strokeWidth="1.8px"
          />
          <path
            d="M3 14h2"
            stroke="var(--icon-color)"
            fill="none"
            strokeWidth="1.8px"
          />
          <path
            d="M10 3v2"
            stroke="var(--icon-color)"
            fill="none"
            strokeWidth="1.8px"
          />
          <path
            d="M14 3v2"
            stroke="var(--icon-color)"
            fill="none"
            strokeWidth="1.8px"
          />
          <path
            d="M21 10h-2"
            stroke="var(--icon-color)"
            fill="none"
            strokeWidth="1.8px"
          />
          <path
            d="M21 14h-2"
            stroke="var(--icon-color)"
            fill="none"
            strokeWidth="1.8px"
          />
          <path
            d="M14 21v-2"
            stroke="var(--icon-color)"
            fill="none"
            strokeWidth="1.8px"
          />
          <path
            d="M10 21v-2"
            stroke="var(--icon-color)"
            fill="none"
            strokeWidth="1.8px"
          />
        </svg>
      ),
      tooltip: "Choose a model",
    },
    {
      icon: (
        <svg
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"
            stroke="var(--icon-color)"
            fill="none"
            strokeWidth="1.8px"
          />
          <path
            d="M3.6 9h16.8"
            stroke="var(--icon-color)"
            fill="none"
            strokeWidth="1.8px"
          />
          <path
            d="M3.6 15h16.8"
            stroke="var(--icon-color)"
            fill="none"
            strokeWidth="1.8px"
          />
          <path
            d="M11.5 3a17 17 0 0 0 0 18"
            stroke="var(--icon-color)"
            fill="none"
            strokeWidth="1.8px"
          />
          <path
            d="M12.5 3a17 17 0 0 1 0 18"
            stroke="var(--icon-color)"
            fill="none"
            strokeWidth="1.8px"
          />
        </svg>
      ),
      tooltip: "Set sources for search",
    },
    {
      icon: (
        <svg
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="tabler-icon tabler-icon-paperclip"
        >
          <path
            d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9l6.5 -6.5"
            stroke="var(--icon-color)"
            fill="none"
            strokeWidth="1.8px"
          />
        </svg>
      ),
      tooltip: "Attach files",
    },

    {
      icon: (
        <svg
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="none"
          className="tabler-icon tabler-icon-microphone-filled"
        >
          <path
            d="M19 9a1 1 0 0 1 1 1a8 8 0 0 1 -6.999 7.938l-.001 2.062h3a1 1 0 0 1 0 2h-8a1 1 0 0 1 0 -2h3v-2.062a8 8 0 0 1 -7 -7.938a1 1 0 1 1 2 0a6 6 0 0 0 12 0a1 1 0 0 1 1 -1m-7 -8a4 4 0 0 1 4 4v5a4 4 0 1 1 -8 0v-5a4 4 0 0 1 4 -4"
            fill="var(--icon-color)"
          />
        </svg>
      ),
      tooltip: "Dictation",
    },
    {
      icon: (
        <svg
          width={16}
          height={16}
          viewBox="0 0 24 24"
          color="currentColor"
          fill="currentColor"
          fillRule="evenodd"
        >
          <path
            d="M0 12.6663C0 13.4018 0.59792 13.9997 1.33333 13.9997C2.06875 13.9997 2.66667 13.4018 2.66667 12.6663V11.333C2.66667 10.5975 2.06875 9.99967 1.33333 9.99967C0.59792 9.99967 0 10.5975 0 11.333V12.6663ZM6.66667 5.33301C7.40213 5.33301 8 5.93087 8 6.66634V17.333C8 18.0685 7.40213 18.6663 6.66667 18.6663C5.9312 18.6663 5.33333 18.0685 5.33333 17.333V6.66634C5.33333 5.93087 5.9312 5.33301 6.66667 5.33301ZM10.6667 21.333C10.6667 22.0685 11.2645 22.6663 12 22.6663C12.7355 22.6663 13.3333 22.0685 13.3333 21.333V2.66634C13.3333 1.93093 12.7355 1.33301 12 1.33301C11.2645 1.33301 10.6667 1.93093 10.6667 2.66634V21.333ZM17.3333 5.33301C18.0688 5.33301 18.6667 5.93087 18.6667 6.66634V17.333C18.6667 18.0685 18.0688 18.6663 17.3333 18.6663C16.5979 18.6663 16 18.0685 16 17.333V6.66634C16 5.93087 16.5979 5.33301 17.3333 5.33301ZM24 11.333C24 10.5975 23.4021 9.99967 22.6667 9.99967C21.9312 9.99967 21.3333 10.5975 21.3333 11.333V12.6663C21.3333 13.4018 21.9312 13.9997 22.6667 13.9997C23.4021 13.9997 24 13.4018 24 12.6663V11.333Z"
            fill="#31b8c6"
          />
        </svg>
      ),
      tooltip: "Voice mode",
    },
  ],
};
`;
const MOTION_TOOLBAR_DEMO_TSX = `import MotionToolbar from "./index";
import { DEMO_PROPS } from "./motion-toolbar.props";

export default function MotionToolbarDemo() {
  return <MotionToolbar items={DEMO_PROPS.items} />;
}
`;
const MOTION_TOOLBAR_TYPES_TS = `interface ToolbarItem {
  icon: React.ReactNode | string;
  tooltip: string;
}

interface MotionToolbarProps extends React.ComponentProps<"button"> {
  items: ToolbarItem[];
}

interface TooltipsContainerProps {
  toolBarRef: React.RefObject<HTMLDivElement>;
  mouseIn: number;
  tooltips: string[];
}
export type { MotionToolbarProps, TooltipsContainerProps };

`;
const UTILS_TS = `import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";

export const cn = (...args: ClassValue[]) => twMerge(clsx(args));
`;
const USE_DEBOUNCED_STATE_TS = `import * as React from "react";

export default function useDebouncedState<T>(initialValue: T, delay: number) {
  const [state, setState] = React.useState(initialValue);
  const timeoutRef = React.useRef<NodeJS.Timeout>(undefined);

  const setDebouncedState = React.useCallback(
    (newState: T) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setState(newState), delay);
    },
    [delay],
  );

  React.useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return [state, setDebouncedState] as const;
}
`;
const USE_PREVIOUS_TS = `import * as React from "react";

export default function usePrevious<T>(state: T): T | undefined {
  const prevState = React.useRef<T | undefined>(undefined);
  React.useEffect(() => {
    prevState.current = state;
  }, [state]);
  return prevState.current;
}
`;
export const ROOT_DIRECTORY: DirectoryItem[] = [
  {
    name: "components",
    type: "directory",
    items: [
      {
        name: "motion-toolbar",
        type: "directory",
        items: [
          {
            name: "index.tsx",
            type: "file",
            code: INDEX_TSX,
          },
          {
            name: "motion-toolbar.props.tsx",
            type: "file",
            code: MOTION_TOOLBAR_PROPS_TSX,
          },
          {
            name: "motion-toolbar.demo.tsx",
            type: "file",
            code: MOTION_TOOLBAR_DEMO_TSX,
          },
          {
            name: "motion-toolbar.types.ts",
            type: "file",
            code: MOTION_TOOLBAR_TYPES_TS,
          },
        ],
      },
    ],
  },
  {
    name: "hooks",
    type: "directory",
    items: [
      {
        name: "use-debounced-state.ts",
        type: "file",
        code: USE_DEBOUNCED_STATE_TS,
      },
      { name: "use-previous.ts", type: "file", code: USE_PREVIOUS_TS },
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
  absolutePath: "components/motion-toolbar/motion-toolbar.demo.tsx",
  code: MOTION_TOOLBAR_DEMO_TSX,
};

export const PROP_TABLE: PropTableProps = {
  data: [
    {
      prop: <code>items</code>,
      type: (
        <SyntaxHighlighterServer>
          {`{
  icon: React.ReactNode | string;
  tooltip: string;
  ...rest: React.ComponentProps<"button">;
}[];`}
        </SyntaxHighlighterServer>
      ),
      description: (
        <>
          <div className="mb-1">
            <code className="inline-block">icon:</code>&nbsp;The visual element
            for the button, such as an SVG icon or a text string.
          </div>
          <div className="mb-1">
            <code>tooltip:</code>&nbsp;The text that appears when a user hovers
            over or focuses on the button.
          </div>
          <div className="mb-1">
            <code>...rest:</code>&nbsp;Any standard HTML button properties,
            like&nbsp;
            <code>onClick</code>&nbsp;handlers or disabled states, which will be
            applied directly to the button.
          </div>
        </>
      ),
      defaultValue: (
        <SyntaxHighlighterServer>(required)</SyntaxHighlighterServer>
      ),
    },
  ],
};
export const TITLE = "Motion Toolbar";
export const DESCRIPTION =
  "A reusable component that smoothly transitions between tooltips with a sliding animation as you move between toolbar items, resulting in a polished and effortless flow.";
