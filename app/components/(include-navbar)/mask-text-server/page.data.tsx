import SyntaxHighlighterServer from "@/components/syntax-highlighter/server";
import {
  type ActiveFile,
  type DirectoryItem,
} from "@/components/file-explorer/file-explorer.types";
import type { PropTableProps } from "@/app/components/_components/prop-table";
import {
  classNameProp,
  styleProp,
} from "@/app/components/_components/prop-table/commonly-used-props";

const MENU_WHEEL_TSX = `
"use client";

import * as React from "react";
import {
  useAnimate,
  motion,
  AnimatePresence,
  usePresence,
  useMotionValue,
  Transition,
  easeInOut,
} from "motion/react";

import { usePrevious } from "@/hooks/use-previous";
import { useDebouncedState } from "@/hooks/use-debounced-state";

import { type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

export interface DockItem extends Omit<HTMLMotionProps<"button">, "ref"> {
  icon: React.ReactNode;
  tooltip: string;
}

export interface MotionDockProps {
  dockItems: DockItem[];
  className?: string;
  style?: React.CSSProperties;
}

interface TooltipsContainerProps {
  dockRef: React.RefObject<HTMLDivElement>;
  mouseIn: number;
  tooltips: string[];
}

const TRANSITION: Transition = {
  duration: 0.225,
  ease: easeInOut,
};
export function MotionDock({ dockItems, className, style }: MotionDockProps) {
  const [mouseIn, setMouseIn] = useDebouncedState<number>(0, 125);
  const dockRef = React.useRef<HTMLDivElement>(null);
  const handleReset = () => setMouseIn(0);
  return (
    <div className={cn("w-fit", className, "!relative")} style={{ ...style }}>
      <div
        ref={dockRef}
        className="bg-secondary flex gap-1 rounded-xl border p-1.25 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]"
        onMouseLeave={handleReset}
        onBlur={() => mouseIn === dockItems?.length && handleReset()} //fix this blur
      >
        {dockItems.map(
          ({ icon, tooltip, onMouseEnter, onFocus, className, ...rest }, i) => (
            <motion.button
              key={tooltip}
              aria-label={tooltip}
              onFocus={(e) => {
                setMouseIn(i + 1);
                onFocus?.(e);
              }}
              onMouseEnter={(e) => {
                setMouseIn(i + 1);
                onMouseEnter?.(e);
              }}
              data-tab={i + 1}
              className={cn(
                "hover:bg-primary hover:text-primary-foreground focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:ring-ring bg-secondary text-secondary-foreground focus-visible:ring-offset-secondary cursor-pointer rounded-lg px-1 py-0.5 transition-colors duration-150 ease-out focus-visible:ring-1 focus-visible:ring-offset-2 focus-visible:outline-none sm:p-1 [&>svg]:size-5.5",
                className,
              )}
              {...rest}
            >
              {icon}
            </motion.button>
          ),
        )}
      </div>
      <AnimatePresence>
        {mouseIn && (
          <ToolTipsContainer
            mouseIn={mouseIn}
            dockRef={dockRef as React.RefObject<HTMLDivElement>}
            tooltips={dockItems?.map(({ tooltip }) => tooltip)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ToolTipsContainer({
  dockRef,
  mouseIn,
  tooltips,
}: TooltipsContainerProps) {
  const prevMouseIn = usePrevious<number>(mouseIn);
  const [isPresent, safeToRemove] = usePresence();
  const [tooltipContainerScope, animate] = useAnimate();
  const x = useMotionValue(0);

  const getTranslateX = React.useCallback(
    (mouseIn: number) => {
      const hoveredTab = dockRef.current.querySelector(
        \`[data-tab="\${mouseIn}"]\`,
      );
      const { left: tabLeft, width: tabWidth } =
        hoveredTab!.getBoundingClientRect();
      const finalPosition = tabLeft + tabWidth / 2;

      const correspondingTooltip = tooltipContainerScope.current.querySelector(
        \`[data-tooltip="\${mouseIn}"]\`,
      );
      const { left: tooltipLeft, width: tooltipWidth } =
        correspondingTooltip!.getBoundingClientRect();
      const currentPosition = tooltipLeft + tooltipWidth / 2;

      const relativeTranslateX = finalPosition - currentPosition;
      const translateX = relativeTranslateX + x.get();
      return translateX;
    },
    [x, dockRef, tooltipContainerScope],
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
      const clipPath = \`inset(0px \${right}px 0px \${left}px round var(--radius-sm))\`; //border-radius for tooltip
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
            TRANSITION,
          );
        };
        enterAnimation();
      } else {
        const intermediateAnimation = () => {
          animate(tooltipContainerScope.current, keyframes, TRANSITION);
        };
        intermediateAnimation();
      }
    } else {
      const exitAnimation = async () => {
        await animate(
          tooltipContainerScope.current,
          { opacity: 0 },
          TRANSITION,
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
      className="bg-primary text-primary-foreground absolute bottom-[calc(100%_+_var(--spacing))] flex flex-nowrap py-0.5 text-xs sm:py-1"
    >
      {tooltips.map((tooltip, i) => (
        <div
          key={tooltip + i}
          className="px-1.5 text-nowrap whitespace-nowrap sm:px-2"
          data-tooltip={i + 1}
        >
          {tooltip}
        </div>
      ))}
    </motion.div>
  );
}
`;

const MASK_TEXT_SERVER_DEMO_TSX = `import { MaskTextServer } from "./mask-text-server";

export function MaskTextServerDemo() {
  return (
    <div className="box-content flex max-w-md flex-col px-5">
      <MaskTextServer.ByLines
        render={() => ({
          "0px":
            "Lorem ipsum dolor sit\\namet, consectetur\\nadipisicing elit.\\nNecessitatibus fugiat\\nquidem tenetur\\nconsequatur, placeat\\npossimus ducimus qui\\nnatus optio vel!",
          "375px":
            "Lorem ipsum dolor sit amet,\\nconsectetur adipisicing elit.\\nNecessitatibus fugiat quidem\\ntenetur consequatur, placeat\\npossimus ducimus qui natus optio\\nvel!",
          "532px":
            "Lorem ipsum dolor sit amet, consectetur adipisicing\\nelit. Necessitatibus fugiat quidem tenetur consequatur,\\nplaceat possimus ducimus qui natus optio vel!",
        })}
      />
      <MaskTextServer.ByWords
        className="mt-5"
        render={() =>
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus fugiat quidem tenetur consequatur, placeat possimus ducimus qui natus optio vel!"
        }
        textAlign="left"
      />
      <MaskTextServer.ByLetters
        className="mt-5"
        render={() =>
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus fugiat quidem tenetur consequatur, placeat possimus ducimus qui natus optio vel!"
        }
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
const USE_DEBOUNCED_STATE_TS = `import * as React from "react";

export function useDebouncedState<T>(initialValue: T, delay: number) {
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

export function usePrevious<T>(state: T): T | undefined {
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
        name: "motion-dock.tsx",
        type: "file",
        code: MENU_WHEEL_TSX,
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
  absolutePath: "components/motion-dock.tsx",
  code: MENU_WHEEL_TSX,
};

export const PROP_TABLE: PropTableProps = {
  data: [
    {
      prop: <code>dockItems</code>,
      type: (
        <SyntaxHighlighterServer>{`{
  icon: React.ReactNode;
  tooltip: string;
  ...rest: Omit<HTMLMotionProps<"button">, "ref">;
}[];`}</SyntaxHighlighterServer>
      ),
      description: (
        <>
          <div className="mb-1">
            <code className="inline-block">icon:</code>&nbsp;The visual element
            for the button, such as an SVG icon or a text string.
          </div>
          <div className="mb-1">
            <code>tooltip:</code>&nbsp;The text that shows up when a user hovers
            over the button or focuses on it with keyboard navigation.
          </div>
          <div className="mb-1">
            <code>...rest:</code>&nbsp;Any standard HTML button properties,
            like&nbsp;
            <code>onClick</code>&nbsp;handlers or <code>disabled</code> states,
            which will be applied directly to the button.
          </div>
        </>
      ),
      defaultValue: (
        <SyntaxHighlighterServer>(required)</SyntaxHighlighterServer>
      ),
    },
    classNameProp,
    styleProp,
  ],
};
export const TITLE = "Mask text server";
export const DESCRIPTION =
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam facilis commodi atque quasi earum optio incidunt quidem eum molestiae cum!";
export const USAGE = {
  code: MASK_TEXT_SERVER_DEMO_TSX,
  title: TITLE,
};
