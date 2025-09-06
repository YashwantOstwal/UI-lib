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
import type { ListContainerProps } from "@/components/list-container";

const TITLE = "Parallax Container";
const DESCRIPTION =
  "A reusable, fully responsive component that applies a smooth parallax effect to the provided child component. This popular design technique adds depth, creates an immersive experience, and makes your website feel more engaging.";
const ADDITIONAL_INFORMATION: ListContainerProps[] = [
  {
    title: "Good to know:",
    variant: "pro-tips",
    list: [
      <>
        The parallax effect is designed to work only when the Parallax Container
        fits entirely within the viewport. If the container&apos;s height ever
        exceeds the viewport&apos;s height, the component will
        automatically&nbsp;
        <span className="font-semibold">opt out</span>&nbsp;of the effect.
      </>,
      <>
        To ensure the animation works as intended, make sure your component
        within the container is never taller than the viewport.
      </>,
    ],
  },
];
const PARALLAX_CONTAINER_TSX = `"use client";

import * as React from "react";
import {
  useScroll,
  useTransform,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";

import { useIsServer } from "@/hooks/use-is-server";

export interface ParallaxContainerProps {
  children: React.ReactElement;
  maxScale?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function ParallaxContainer({
  children,
  maxScale = 1.1,
  className,
  style,
}: ParallaxContainerProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isServer = useIsServer();

  const scale = useMotionValue(1);
  const springifyScale = useSpring(scale, {
    mass: 1,
    damping: 45,
    stiffness: 350,
  });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scrollYOffset = useTransform(scrollYProgress, (latest) => {
    if (isServer || !containerRef.current) return 0;

    const viewportHeight = window.innerHeight;
    const { height: containerHeight } =
      containerRef.current.getBoundingClientRect();

    return latest * (viewportHeight + containerHeight);
  });

  const y = useTransform(scrollYOffset, (latest) => {
    if (isServer || !containerRef.current) return "0%";

    const viewportHeight = window.innerHeight;
    const { height: containerHeight } =
      containerRef.current.getBoundingClientRect();

    if (containerHeight >= viewportHeight) return "0%";

    const effectiveMaxScale = Math.min(
      maxScale,
      viewportHeight / containerHeight,
    );

    const percent =
      ((effectiveMaxScale % 1) / (viewportHeight - containerHeight)) *
      (latest - containerHeight) *
      100;

    return \`\${percent}%\`;
  });

  React.useEffect(() => {
    if (!containerRef.current) return;

    const updateScale = () => {
      const viewportHeight = window.innerHeight;
      const { height: containerHeight } =
        containerRef.current!.getBoundingClientRect();

      const effectiveMaxScale = Math.min(
        maxScale,
        viewportHeight / containerHeight,
      );

      scale.set(containerHeight >= viewportHeight ? 1 : effectiveMaxScale);
    };

    updateScale();

    window.addEventListener("resize", updateScale);

    return () => window.removeEventListener("resize", updateScale);
  }, [scale, maxScale]);

  return (
    <>
      <style>{\`html { scroll-behavior: smooth; }\`}</style>
      <div
        ref={containerRef}
        className={className}
        style={{ ...style, overflow: "hidden" }}
      >
        <motion.div
          style={{
            y,
            scale: springifyScale,
            transformOrigin: "bottom",
          }}
        >
          {children}
        </motion.div>
      </div>
    </>
  );
}`;
const PARALLAX_CONTAINER_DEMO_TSX = `import { ParallaxContainer } from "./parallax-container";

export function ParallaxContainerDemo() {
  return (
    <ParallaxContainer className="mx-auto my-24 max-w-xl">
      <img
        src="/lionel-messi-adidas-campaign.png"
        alt="Lionel Messi figures on a soccer field wearing Argentina jerseys, with the Adidas slogan 'impossible is nothing'"
        loading="eager"
      />
    </ParallaxContainer>
  );
}
`;
const USE_IS_SERVER = `import * as React from "react";

export function useIsServer() {
  const isServer = React.useRef(typeof window === "undefined");
  return isServer.current;
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
        name: "parallax-container.tsx",
        type: "file",
        code: PARALLAX_CONTAINER_TSX,
      },
    ],
  },
  {
    name: "hooks",
    type: "directory",
    items: [{ name: "use-is-server.ts", type: "file", code: USE_IS_SERVER }],
  },
  {
    name: "lib",
    type: "directory",
    items: [{ name: "utils.ts", type: "file", code: UTILS_TS }],
  },
];

const DEFAULT_ACTIVE_FILE: ActiveFile = {
  absolutePath: "components/parallax-container.tsx",
  code: PARALLAX_CONTAINER_TSX,
};

const PROP_TABLE: PropTableProps = {
  data: [
    {
      prop: <code>children</code>,
      type: (
        <SyntaxHighlighterServer>React.ReactElement</SyntaxHighlighterServer>
      ),
      description:
        "The ReactElement (e.g., an Image or a div) that will receive the parallax effect as you scroll.",
      defaultValue: (
        <SyntaxHighlighterServer>(required)</SyntaxHighlighterServer>
      ),
    },
    {
      prop: <code>maxScale?</code>,
      type: <SyntaxHighlighterServer>number</SyntaxHighlighterServer>,
      description:
        "The maximum scaling factor applied to the ReactElement passed as children to create the parallax effect.",
      defaultValue: <SyntaxHighlighterServer>1.1</SyntaxHighlighterServer>,
    },
    styleProp,
    classNameProp,
  ],
};
const USAGE = {
  code: PARALLAX_CONTAINER_DEMO_TSX,
  title: TITLE,
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
