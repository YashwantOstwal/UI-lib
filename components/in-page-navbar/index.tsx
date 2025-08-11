"use client";

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
  const [isSmallScreen, setIsSmallScreen] = React.useState(false);
  const pathname = usePathname();
  const isServer = useIsServer();

  const navButtonsInstance = (
    <NavButtonGroup
      className="gap-2 max-sm:mx-auto max-sm:grid max-sm:max-w-fit max-sm:grid-rows-3 max-sm:py-8 max-sm:text-sm sm:flex sm:items-center sm:gap-2"
      sections={sections}
      isServer={isServer}
    />
  );

  React.useEffect(() => {
    //on screen resize, if it exceeds the width of 639px it would consider to render the navbar of the desktop version

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
    --nav-progress-text: #4b5563;
  }
`}</style>
      <div
        data-component="in-page-navbar"
        className="font-poppins pointer-events-none fixed inset-x-4.5 top-1.5 z-[100]"
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
            {logo}
          </Link>
          <>
            <nav className="hidden sm:block">{navButtonsInstance}</nav>
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
      console.warn(`No section found with id="${id}".`);
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
