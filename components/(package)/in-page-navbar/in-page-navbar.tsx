"use client";

import * as React from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  Variants,
} from "motion/react";
import { EqualIcon, XIcon } from "lucide-react";

import { useIsServer } from "@/hooks/use-is-server";
import { type MotionValue } from "motion";

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

const fadeVariants: Variants = {
  fadeIn: { opacity: 1 },
  fadeOut: { opacity: 0 },
};

export function InPageNavbar({ logo, sections }: InPageNavbarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isSmallScreen, setIsSmallScreen] = React.useState(false);

  const isServer = useIsServer();

  const navButtons = (
    <NavButtonGroup
      sections={sections}
      isServer={isServer}
      className="gap-2 max-sm:mx-auto max-sm:grid max-sm:max-w-fit max-sm:grid-rows-3 max-sm:py-8 max-sm:text-sm sm:flex sm:items-center sm:gap-1"
    />
  );

  React.useEffect(() => {
    const handleMediaQuery = ({ matches }: { matches: boolean }) =>
      setIsSmallScreen(matches);

    const mediaQuery = window.matchMedia("(max-width:639px)");
    mediaQuery.addEventListener("change", handleMediaQuery);

    return () => mediaQuery.removeEventListener("change", handleMediaQuery);
  }, []);

  return (
    <>
      <div className="[&_*]:focus-visible:ring-ring pointer-events-none fixed inset-x-4.5 top-1.5 z-[100] focus-visible:ring-offset-current [&_*]:focus-visible:ring-1 [&_*]:focus-visible:ring-offset-2 [&_*]:focus-visible:outline-none">
        <motion.div
          initial={false}
          animate={isSidebarOpen && isSmallScreen ? "fadeOut" : "fadeIn"}
          variants={fadeVariants}
          className="bg-card/85 pointer-events-auto mx-auto flex max-w-xl items-center justify-between rounded-lg p-3 text-sm font-medium shadow-md backdrop-blur-[2px] sm:rounded-xl"
        >
          <a
            href="#"
            tabIndex={1}
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState(null, "", window.location.pathname);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            {logo}
          </a>
          <>
            <nav className="hidden sm:block">{navButtons}</nav>
            <button
              tabIndex={2}
              aria-label="open sidebar"
              onClick={() => {
                setIsSmallScreen(true);
                setIsSidebarOpen(true);
              }}
              className="-mr-2 cursor-pointer px-1 sm:hidden"
            >
              <EqualIcon className="stroke-foreground" />
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
            className="bg-card/85 fixed inset-x-4.5 top-1.5 z-[110] overflow-hidden rounded-lg"
          >
            <button
              tabIndex={3}
              aria-label="close sidebar"
              onClick={() => setIsSidebarOpen(false)}
              className="absolute top-3.5 right-2 cursor-pointer"
            >
              <XIcon className="stroke-foreground" />
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
    <nav className={className}>
      {sections.map((props) => (
        <NavItem
          key={props.id}
          scrollY={scrollY}
          isServer={isServer}
          {...props}
        />
      ))}
    </nav>
  );
}

function NavItem({ label, id, isServer, scrollY }: NavItemProps) {
  const [targetElement, setTargetElement] = React.useState<HTMLElement | null>(
    null,
  );

  const sectionProgress = useTransform(scrollY, (latest) => {
    if (isServer || !targetElement) return 0;

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
    <a
      tabIndex={2}
      href={`#${id}`}
      onClick={(e) => {
        e.preventDefault();
        window.history.pushState(null, "", `#${id}`);
        targetElement?.scrollIntoView({ behavior: "smooth" });
      }}
      className="bg-background border-border relative overflow-hidden rounded-full border font-medium capitalize transition-opacity duration-100 ease-in-out hover:opacity-70 sm:text-[13px]"
    >
      <span className="relative z-20 inline-block size-full px-4 py-2.5 text-center leading-none sm:px-3 sm:py-2">
        {label}
      </span>

      {targetElement && (
        <motion.span
          initial="fadeOut"
          animate="fadeIn"
          variants={fadeVariants}
          style={{ clipPath }}
          className="bg-muted text-muted-foreground absolute -inset-0.5 z-30 grid place-items-center rounded-[inherit] leading-none"
        >
          {label}
        </motion.span>
      )}
    </a>
  );
}
