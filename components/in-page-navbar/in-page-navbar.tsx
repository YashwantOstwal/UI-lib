"use client";

import * as React from "react";
import useIsServer from "@/hooks/use-is-server";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  MotionValue,
  useScroll,
  useTransform,
} from "motion/react";

const fadeVariants = {
  fadeIn: { opacity: 1 },
  fadeOut: { opacity: 0 },
};

const EXAMPLE_LOGO = (
  <div className="pointer rounded-full px-3 py-0.75 text-sm font-semibold">
    Acme Inc.
  </div>
);
const EXAMPLE_NAV_SECTIONS = [
  {
    label: "about",
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
];

interface NavSection {
  label: string; // text shown in the button
  id: string; // id of the section to scroll to and track progress
}

interface InPageNavbarProps {
  Logo?: React.ReactNode;
  sections?: NavSection[];
}
export default function InPageNavbar({
  Logo = EXAMPLE_LOGO,
  sections = EXAMPLE_NAV_SECTIONS,
}: InPageNavbarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const pathname = usePathname();
  const isServer = useIsServer();
  const [isSmallScreen, setIsSmallScreen] = React.useState<boolean | null>(
    () => (isServer ? null : window.matchMedia("(max-width: 639px)").matches),
  );
  const [burgerIcon, closeIcon] = React.useMemo(() => {
    return [
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
        <path
          stroke="var(--nav-text)"
          strokeLinecap="square"
          strokeWidth="2px"
          d="M2 4h12M2 12h12"
          fill="none"
        />
      </svg>,
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
      </svg>,
    ] as const;
  }, []);

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
      <style>{`
  [data-component="in-page-navbar"] {
    --nav-bg: #ffffffdd; 
    --nav-text: #101828;
    --nav-btn-bg: #f5f5f5;
    --nav-btn-text: #101828;
    --nav-progress-bg: #ababab60;
    --nav-progress-text: #5D5D5D;
  }
`}</style>
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
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            href={pathname}
          >
            {Logo}
          </Link>
          <>
            <nav className="hidden sm:block">{navButtonsInstance}</nav>
            <button
              className="cursor-pointer sm:hidden"
              aria-label="open sidebar"
              onClick={() => setIsSidebarOpen(true)}
            >
              {burgerIcon}
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
              {closeIcon}
            </button>
            <nav>{navButtonsInstance}</nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

interface NavButtonGroupProps {
  sections: NavSection[];
  isServer: boolean;
  className?: string;
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

interface NavItemProps extends NavSection {
  scrollY: MotionValue<number>;
  isServer: boolean;
}
const NavItem = ({ scrollY, isServer, label, id }: NavItemProps) => {
  const targetElement = React.useMemo(() => {
    if (isServer) {
      return null;
    }
    const element = document.getElementById(id);
    if (!element) {
      throw new Error(
        `No section found with id="${id}". Make sure the element is mounted.`,
      );
    } else {
      return element;
    }
  }, []);

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
      href={`#${id}`}
      scroll={false}
      onClick={() => targetElement?.scrollIntoView({ behavior: "smooth" })}
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
