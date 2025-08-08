import SyntaxHighlighterServer from "@/components/syntax-highlighter/server";
import {
  type ActiveFile,
  type DirectoryItem,
} from "@/components/file-explorer/file-explorer.types";
import type { PropTableProps } from "@/components/prop-table/prop-table.types";
import {
  classNameProp,
  styleProp,
} from "@/components/prop-table/commonly-used-props";

const INDEX_TSX = `"use client";

import * as React from "react";
import { useScroll, useTransform, motion, useMotionValue } from "motion/react";
import useIsServer from "@/hooks/use-is-server";
import type { ParallaxContainerProps } from "./parallax-container.types";
export default function ParallaxContainer({
  children,
  maxScale = 1.1,
  className,
  style,
}: ParallaxContainerProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isServer = useIsServer();
  const scale = useMotionValue(1);

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
    const setMotionScale = ({ matches }: { matches: boolean }) => {
      const { height: containerHeight } =
        containerRef.current!.getBoundingClientRect();
      if (matches) {
        const effectiveMaxScale = Math.min(
          maxScale,
          window.innerHeight / containerHeight,
        );
        scale.set(effectiveMaxScale);
      } else {
        scale.set(1);
      }
    };
    const { height: containerHeight } =
      containerRef.current!.getBoundingClientRect();
    const mediaQuery = window.matchMedia(\`(min-height : \${containerHeight}px)\`);

    setMotionScale(mediaQuery);
    mediaQuery.addEventListener("change", setMotionScale);

    return () => mediaQuery.removeEventListener("change", setMotionScale);
  }, [maxScale]);

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
            scale,
            transformOrigin: "bottom",
          }}
        >
          {children}
        </motion.div>
      </div>
    </>
  );
}
`;
const PARALLAX_CONTAINER_DEMO_TSX = `import ParallaxContainer from "./index";
export default function ParallaxContainerDemo() {
  return (
    <ParallaxContainer className="mx-auto my-24 max-w-xs rounded-2xl">
      <img
        loading="eager"
        src="/yonex-play-full-power-ad.png"
        alt="Yonex 'Play Full Power' campaign advertisement."
      />
    </ParallaxContainer>
  );
}
  `;
const PARALLAX_CONTAINER_TYPES_TS = `interface ParallaxContainerProps {
  children: React.ReactNode;
  maxScale?: number;
  className?: string;
  style?: React.CSSProperties;
}
export type { ParallaxContainerProps };
`;
const USE_IS_SERVER = `import { useRef } from "react";

const useIsServer = () => {
  const isServer = useRef(
    typeof window === "undefined" || typeof document === "undefined",
  );
  return isServer.current;
};
export default useIsServer;
`;
export const ROOT_DIRECTORY: DirectoryItem[] = [
  {
    name: "components",
    type: "directory",
    items: [
      {
        name: "parallax-container",
        type: "directory",
        items: [
          {
            name: "index.tsx",
            type: "file",
            code: INDEX_TSX,
          },
          {
            name: "parallax-container.demo.tsx",
            type: "file",
            code: PARALLAX_CONTAINER_DEMO_TSX,
          },
          {
            name: "parallax-container.types.ts",
            type: "file",
            code: PARALLAX_CONTAINER_TYPES_TS,
          },
        ],
      },
    ],
  },
  {
    name: "hooks",
    type: "directory",
    items: [{ name: "use-is-server.ts", type: "file", code: USE_IS_SERVER }],
  },
];
export const DEFAULT_ACTIVE_FILE: ActiveFile = {
  absolutePath: "components/parallax-container/parallax-container.demo.tsx",
  code: PARALLAX_CONTAINER_DEMO_TSX,
};

export const PROP_TABLE: PropTableProps = {
  data: [
    {
      prop: <code>children</code>,
      type: <SyntaxHighlighterServer>React.ReactNode</SyntaxHighlighterServer>,
      description:
        "The content (e.g., an Image or a div) that will receive the parallax effect as you scroll.",
      defaultValue: (
        <SyntaxHighlighterServer>(required)</SyntaxHighlighterServer>
      ),
    },
    {
      prop: <code>maxScale?</code>,
      type: <SyntaxHighlighterServer>number</SyntaxHighlighterServer>,
      description:
        "The maximum scaling factor applied to the child content to create the parallax effect.",
      defaultValue: <SyntaxHighlighterServer>1.1</SyntaxHighlighterServer>,
    },
    styleProp,
    classNameProp,
  ],
};
