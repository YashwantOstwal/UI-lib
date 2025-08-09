import {
  type ActiveFile,
  type DirectoryItem,
} from "@/components/file-explorer/file-explorer.types";
import type { PropTableProps } from "@/components/prop-table/prop-table.types";
import SyntaxHighlighterServer from "@/components/syntax-highlighter/server";

const IN_PAGE_NAVBAR_DEMO_TSX = `import { MOCK_PROPS_IN_PAGE_NAVBAR } from "./in-page-navbar.data";
import InPageNavbar from "./index";

export default function InPageNavbarDemo() {
  return (
    /* Make sure to place the component after the sections it tracks in 
     your component tree or in your page layout as last child." */
    <InPageNavbar {...MOCK_PROPS_IN_PAGE_NAVBAR} />
  );
}
`;
const INDEX_TSX = `"use client";

import * as React from "react";
import useIsServer from "@/hooks/use-is-server";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import BurgerIcon from "@/icons/burger.icon";
import CloseIcon from "@/icons/close.icon";

import type {
  InPageNavbarProps,
  NavButtonGroupProps,
  NavItemProps,
} from "./in-page-navbar.types";

const fadeVariants = {
  fadeIn: { opacity: 1 },
  fadeOut: { opacity: 0 },
};

export default function InPageNavbar({ logo, sections }: InPageNavbarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const pathname = usePathname();
  const isServer = useIsServer();
  const [isSmallScreen, setIsSmallScreen] = React.useState<boolean | null>(
    () => (isServer ? null : window.matchMedia("(max-width: 639px)").matches),
  );

  const navButtonsInstance = (
    <NavButtonGroup
      className="gap-2.5 max-sm:mx-auto max-sm:grid max-sm:max-w-fit max-sm:grid-rows-3 max-sm:py-8 max-sm:text-base sm:flex sm:items-center sm:gap-2"
      sections={sections}
      isServer={isServer}
    />
  );
  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width:639px)");
    const handleMediaQuery = ({ matches }: { matches: boolean }) =>
      setIsSmallScreen(matches);
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
    --nav-progress-text: #5D5D5D;
  }
\`}</style>
      <div
        data-component="in-page-navbar"
        className="font-poppins pointer-events-none fixed inset-x-4.5 top-1.5 z-[100]"
      >
        <motion.div
          initial={false}
          animate={!isSidebarOpen || !isSmallScreen ? "fadeIn" : "fadeOut"}
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
            {logo}
          </Link>
          <>
            <nav className="hidden sm:block">{navButtonsInstance}</nav>
            <button
              className="cursor-pointer sm:hidden"
              aria-label="open sidebar"
              onClick={() => setIsSidebarOpen(true)}
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
            data-component="InPageNavbar"
            className="fixed inset-x-4.5 top-1.5 z-[110] overflow-hidden rounded-lg bg-(--nav-bg)"
          >
            <button
              onClick={() => setIsSidebarOpen(false)}
              aria-label="close sidebar"
              className="absolute top-3.5 right-2 cursor-pointer"
            >
              <CloseIcon />
            </button>
            <nav>{navButtonsInstance}</nav>
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

const NavItem = ({ scrollY, isServer, label, id }: NavItemProps) => {
  const targetElement = React.useMemo(() => {
    if (isServer) {
      return null;
    }
    const element = document.getElementById(id);
    if (!element) {
      throw new Error(
        \`No section found with id="\${id}". Make sure the element is mounted.\`,
      );
    } else {
      return element;
    }
  }, [id, isServer]);

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

  return (
    <Link
      href={"#" + id}
      scroll={false}
      onClick={() => {
        targetElement?.scrollIntoView({ behavior: "smooth" });
      }}
      className="relative overflow-hidden rounded-full bg-(--nav-btn-bg) font-medium text-(--nav-btn-text) capitalize transition-opacity duration-150 ease-in-out hover:opacity-75 sm:rounded-full sm:text-[13px] lg:border lg:border-[#ababab60]"
    >
      <div className="relative z-20 px-4 py-2.5 text-center leading-none sm:px-3 sm:py-2">
        {label}
      </div>
      <motion.div
        className="absolute -inset-0.5 z-30 grid place-items-center rounded-[inherit] bg-(--nav-progress-bg) leading-none text-(--nav-progress-text)"
        style={{ clipPath }}
      >
        {label}
      </motion.div>
    </Link>
  );
};
`;
const IN_PAGE_NAVBAR_DATA_TSX = `import { InPageNavbarProps } from "./in-page-navbar.types";

export const MOCK_PROPS_IN_PAGE_NAVBAR: InPageNavbarProps = {
  logo: (
    <div className="cursor-pointer px-3 py-0.75 text-sm font-semibold">
      Acme Inc.
    </div>
  ),
  sections: [
    {
      label: "About",
      id: "about",
    },
    {
      label: "Features",
      id: "features",
    },
    {
      label: "Pricing",
      id: "pricing",
    },
  ],
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
  logo: React.ReactNode;
  sections: NavSection[];
}

export type { InPageNavbarProps, NavButtonGroupProps, NavItemProps };
`;

export const ROOT_DIRECTORY: DirectoryItem[] = [
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
            name: "in-page-navbar.data.tsx",
            type: "file",
            code: IN_PAGE_NAVBAR_DATA_TSX,
          },
          {
            name: "in-page-navbar.types.ts",
            type: "file",
            code: IN_PAGE_NAVBAR_TYPES_TS,
          },
        ],
      },
    ],
  },
];
export const DEFAULT_ACTIVE_FILE: ActiveFile = {
  absolutePath: "components/in-page-navbar/in-page-navbar.demo.tsx",
  code: IN_PAGE_NAVBAR_DEMO_TSX,
};

export const PROP_TABLE: PropTableProps = {
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
            <code>id:</code>&nbsp; The id of the section element to smooth
            scroll to when the link is clicked.
          </div>
        </>
      ),
      defaultValue: (
        <SyntaxHighlighterServer>(required)</SyntaxHighlighterServer>
      ),
    },
  ],
};
