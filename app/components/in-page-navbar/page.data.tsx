import {
  type ActiveFile,
  type DirectoryItem,
} from "@/components/file-explorer/file-explorer.types";
import { ListContainerProps } from "@/components/list-container";
import type { PropTableProps } from "@/components/prop-table/prop-table.types";
import SyntaxHighlighterServer from "@/components/syntax-highlighter/server";

const IN_PAGE_NAVBAR_DEMO_TSX = `import type { InPageNavbarProps } from "./in-page-navbar.types";
import InPageNavbar from "./index";

const LOGO = (
  <div className="cursor-pointer px-3 py-0.75 text-sm font-semibold">
    Acme Inc.
  </div>
);

const SECTIONS = [
  {
    label: "About",
    id: "about",
  },
  {
    label: "Pricing",
    id: "pricing",
  },
  {
    label: "File explorer",
    id: "file-explorer",
  },
  {
    label: "Props table",
    id: "prop-table",
  },
];

const DEMO_PROPS: InPageNavbarProps = {
  Logo: LOGO,
  sections: SECTIONS,
};
export default function InPageNavbarDemo() {
  return <InPageNavbar {...DEMO_PROPS} />;
}
`;
const INDEX_TSX = `"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";

import BurgerIcon from "./icons/burger.icon";
import CloseIcon from "./icons/close.icon";
import useIsServer from "@/hooks/use-is-server";

import type {
  InPageNavbarProps,
  NavButtonGroupProps,
  NavItemProps,
} from "./in-page-navbar.types";
import { usePathname } from "next/navigation";

const fadeVariants = {
  fadeIn: { opacity: 1 },
  fadeOut: { opacity: 0 },
};

export default function InPageNavbar({ Logo, sections }: InPageNavbarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isSmallScreen, setIsSmallScreen] = React.useState(false);
  const isServer = useIsServer();
  const pathname = usePathname();

  const navButtons = (
    <NavButtonGroup
      className="gap-2 max-sm:mx-auto max-sm:grid max-sm:max-w-fit max-sm:grid-rows-3 max-sm:py-8 max-sm:text-sm sm:flex sm:items-center sm:gap-2"
      sections={sections}
      isServer={isServer}
    />
  );

  React.useEffect(() => {
    // On screen resize, if the width exceeds 639px, the desktop version of the navbar will be rendered.
    const handleMediaQuery = ({ matches }: { matches: boolean }) =>
      setIsSmallScreen(matches);

    const mediaQuery = window.matchMedia("(max-width:639px)");

    mediaQuery.addEventListener("change", handleMediaQuery);
    return () => mediaQuery.removeEventListener("change", handleMediaQuery);
  }, []);

  return (
    <>
      <style>{\`
  [data-component="in-page-navbar"] {
    --nav-bg: #ffffffdd; 
    --nav-text: #101828;
    --nav-btn-bg: #f5f5f5;
    --nav-btn-text: #101828;
    --nav-progress-bg: #ababab60;
    --nav-progress-text: #4b5563;
  }
\`}</style>
      <div
        data-component="in-page-navbar"
        className="pointer-events-none fixed inset-x-4.5 top-1.5 z-[100]"
      >
        <motion.div
          initial={false}
          animate={isSidebarOpen && isSmallScreen ? "fadeOut" : "fadeIn"}
          variants={fadeVariants}
          className="pointer-events-auto mx-auto flex max-w-xl items-center justify-between rounded-lg bg-(--nav-bg) p-3 text-sm font-medium text-(--nav-text) shadow-md backdrop-blur-[2px] sm:rounded-xl"
        >
          <Link
            scroll={false}
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            href={pathname}
          >
            {Logo}
          </Link>
          <>
            <nav className="hidden sm:block">{navButtons}</nav>
            <button
              className="cursor-pointer sm:hidden"
              aria-label="open sidebar"
              onClick={() => {
                setIsSmallScreen(true);
                setIsSidebarOpen(true);
              }}
            >
              <BurgerIcon />
            </button>
          </>
        </motion.div>
      </div>
      <AnimatePresence>
        {isSmallScreen && isSidebarOpen && (
          <motion.div
            initial="fadeOut"
            animate="fadeIn"
            exit="fadeOut"
            variants={fadeVariants}
            data-component="in-page-navbar"
            className="fixed inset-x-4.5 top-1.5 z-[110] overflow-hidden rounded-lg bg-(--nav-bg)"
          >
            <button
              onClick={() => setIsSidebarOpen(false)}
              aria-label="close sidebar"
              className="absolute top-3.5 right-2 cursor-pointer"
            >
              <CloseIcon />
            </button>
            <nav>{navButtons}</nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavButtonGroup({
  sections,
  isServer,
  className,
}: NavButtonGroupProps) {
  const { scrollY } = useScroll();
  return (
    <ol className={className}>
      {sections.map((props) => (
        <NavItem
          key={props.id}
          scrollY={scrollY}
          isServer={isServer}
          {...props}
        />
      ))}
    </ol>
  );
}

const NavItem = ({ label, id, isServer, scrollY }: NavItemProps) => {
  const [targetElement, setTargetElement] = React.useState<HTMLElement | null>(
    null,
  );

  const sectionProgress = useTransform(scrollY, (latest) => {
    if (isServer || targetElement === null) return 0;
    const viewportHeight = window.innerHeight;
    const targetElementTop = targetElement.offsetTop;
    const targetElementHeight = targetElement.offsetHeight;
    const visibleRatio =
      (latest + viewportHeight - targetElementTop) / targetElementHeight;
    return Math.min(1, Math.max(visibleRatio, 0));
  });

  const clipPath = useTransform(
    sectionProgress,
    [0, 1],
    ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"],
  );

  React.useEffect(() => {
    const element = document.getElementById(id);
    if (!element) {
      console.warn(
        \`No section found with id="\${id}". In-Page Navbar component is rendered after all the sections it tracks.\`,
      );
    }
    setTargetElement(element);
  }, [id]);
  return (
    <Link
      href={"#" + id}
      scroll={false}
      onClick={() => {
        targetElement?.scrollIntoView({ behavior: "smooth" });
      }}
      className="relative overflow-hidden rounded-full border border-[#ababab60] bg-(--nav-btn-bg) font-medium text-(--nav-btn-text) capitalize transition-opacity duration-150 ease-in-out hover:opacity-75 sm:rounded-full sm:text-[13px]"
    >
      <div className="relative z-20 px-4 py-2.5 text-center leading-none sm:px-3 sm:py-2">
        {label}
      </div>
      {targetElement && (
        <motion.div
          initial="fadeOut"
          animate="fadeIn"
          variants={fadeVariants}
          className="absolute -inset-0.5 z-30 grid place-items-center rounded-[inherit] bg-(--nav-progress-bg) leading-none text-(--nav-progress-text)"
          style={{ clipPath }}
        >
          {label}
        </motion.div>
      )}
    </Link>
  );
};
`;
const IN_PAGE_NAVBAR_TYPES_TS = `import { MotionValue } from "motion";

interface NavSection {
  label: string;
  id: string;
}

interface NavButtonGroupProps {
  sections: NavSection[];
  isServer: boolean;
  className?: string;
}

interface NavItemProps extends NavSection {
  scrollY: MotionValue<number>;
  isServer: boolean;
}

interface InPageNavbarProps {
  Logo: React.ReactNode;
  sections: NavSection[];
}

export type { InPageNavbarProps, NavButtonGroupProps, NavItemProps };
`;
const BURGER_ICON_TSX = `const BurgerIcon = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
    <path
      stroke="var(--nav-text)"
      strokeLinecap="square"
      strokeWidth="2px"
      d="M2 4h12M2 12h12"
      fill="none"
    />
  </svg>
);

export default BurgerIcon;
`;
const CLOSE_ICON_TSX = `const CloseIcon = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path
      stroke="var(--nav-text)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M17.25 6.75L6.75 17.25"
    />
    <path
      stroke="var(--nav-text)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M6.75 6.75L17.25 17.25"
    />
  </svg>
);

export default CloseIcon;
`;
const TITLE = "In-Page Navbar";
const DESCRIPTION =
  "A smart navigation bar that tracks the section progress as you scroll down the page providing a clear visual indicator of your progress through each section.";
const ROOT_DIRECTORY: DirectoryItem[] = [
  {
    name: "components",
    type: "directory",
    items: [
      {
        name: "in-page-navbar",
        type: "directory",
        items: [
          {
            name: "in-page-navbar.demo.tsx",
            type: "file",
            code: IN_PAGE_NAVBAR_DEMO_TSX,
          },
          {
            name: "index.tsx",
            type: "file",
            code: INDEX_TSX,
          },

          {
            name: "in-page-navbar.types.ts",
            type: "file",
            code: IN_PAGE_NAVBAR_TYPES_TS,
          },
          {
            name: "icons",
            type: "directory",
            items: [
              { name: "burger.icon.tsx", type: "file", code: BURGER_ICON_TSX },
              { name: "close.icon.tsx", type: "file", code: CLOSE_ICON_TSX },
            ],
          },
        ],
      },
    ],
  },
];
const DEFAULT_ACTIVE_FILE: ActiveFile = {
  absolutePath: "components/in-page-navbar/in-page-navbar.demo.tsx",
  code: IN_PAGE_NAVBAR_DEMO_TSX,
};

const PROP_TABLE: PropTableProps = {
  data: [
    {
      prop: <code>logo</code>,
      type: <SyntaxHighlighterServer>React.ReactNode</SyntaxHighlighterServer>,
      description:
        "The logo to be displayed, typically on the left side of the navbar. Accepts any renderable React element.",
      defaultValue: (
        <SyntaxHighlighterServer>(required)</SyntaxHighlighterServer>
      ),
    },
    {
      prop: <code>sections</code>,
      type: (
        <SyntaxHighlighterServer>
          {`{
  label: string;
  id: string;
}[]`}
        </SyntaxHighlighterServer>
      ),
      description: (
        <>
          <div className="mb-1">
            <code className="inline-block">label:</code>&nbsp;The text displayed
            for the navigation link.
          </div>
          <div className="mb-1">
            <code>id:</code>&nbsp;The id of the section element used for
            progress tracking and as a link target for smooth scrolling.
          </div>
        </>
      ),
      defaultValue: (
        <SyntaxHighlighterServer>(required)</SyntaxHighlighterServer>
      ),
    },
  ],
};

const ADDITIONAL_INFORMATION: ListContainerProps[] = [
  {
    title: "Good to know:",
    variant: "pro-tips",
    list: [
      "Place the component at the end of your component tree or page layout to guarantee that all the target sections are already mounted and accessible.",
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
