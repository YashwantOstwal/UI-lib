"use client";

import { cn } from "@/lib/utils";
import {
  MotionValue,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import Link from "next/link";
import { CSSProperties, useEffect, useRef, useState } from "react";
import useIsServer from "@/hooks/use-is-server";
const DEFAULT_NAVS = [
  {
    name: "about",
    id: "about",
  },
  {
    name: "Features",
    id: "features",
  },
  {
    name: "Pricing",
    id: "pricing",
  },
];
interface NavsType {
  name: string;
  id: string;
}
export default function InPageNavbar({
  navs = DEFAULT_NAVS,
}: {
  navs?: NavsType[];
}) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const { scrollY } = useScroll();
  const isServer = useIsServer();

  const handleClick = () => setOpenSidebar((prev) => !prev);

  return (
    <>
      <style>
        {`
      #in-page-navbar{
      --nav-bg: #ffffff;
      --nav-item-bg:#f7f7f7;
      --nav-item-text:#171717;
      }
      `}
      </style>
      <div
        id="in-page-navbar"
        className="fixed inset-x-0 top-0 flex justify-center"
      >
        <div className="font-poppins flex items-center justify-between gap-2 overflow-hidden bg-(--nav-bg) text-[13px] font-medium shadow-[0px_1px_0px_0px_rgba(0,0,0,0.05),0px_3px_8px_0px_rgba(0,0,0,0.06)] max-sm:w-full max-sm:py-3.5 max-sm:pl-2 sm:my-2 sm:justify-center sm:rounded-full sm:p-2">
          <Link
            href="/"
            scroll={false}
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="aspect-square size-10 rounded-full bg-(--nav-item-text)"
          ></Link>
          <button onClick={handleClick} className="px-3 sm:hidden">
            <Burger />
          </button>
          <NavGroup
            className="hidden flex-nowrap items-center justify-center gap-px sm:flex"
            scrollY={scrollY}
            isServer={isServer}
            navs={navs}
          />
        </div>
      </div>
      {openSidebar && (
        <div className="font-poppins fixed inset-x-1.5 top-1.5 flex h-fit flex-col items-center justify-center rounded-[9px] bg-white/50 py-16 font-medium shadow-[0px_-1px_1px_0px_rgba(255,255,255,0.45)_inset,0px_1px_1.5px_0px_rgba(32,32,32,0.16),0px_0px_1.5px_0px_rgba(0,0,0,0.24)] backdrop-blur-sm sm:hidden">
          <button className="absolute top-2 right-0.5" onClick={handleClick}>
            <Close className="box-content size-5.5 p-2.5" />
          </button>
          <NavGroup
            className="flex flex-col gap-y-1.5 text-base"
            scrollY={scrollY}
            isServer={isServer}
            navs={navs}
          />
        </div>
      )}
    </>
  );
}
function NavGroup({
  navs,
  scrollY,
  isServer,
  className,
  style,
}: {
  navs: NavsType[];
  scrollY: MotionValue<number>;
  isServer: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div style={{ ...style }} className={cn(className)}>
      {navs.map((rest, i) => (
        <NavItem scrollY={scrollY} isServer={isServer} {...rest} />
      ))}
    </div>
  );
}
function Close({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      className={className}
      style={{ ...style }}
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M17.25 6.75L6.75 17.25"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6.75 6.75L17.25 17.25"
      ></path>
    </svg>
  );
}
function Burger({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      style={{ ...style }}
      className={cn(className)}
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M4.75 5.75H19.25"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M4.75 18.25H19.25"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M4.75 12H19.25"
      ></path>
    </svg>
  );
}

interface NavItemProps {
  name: string;
  id: string;
  scrollY: MotionValue<number>;
  isServer: boolean;
  className?: string;
}
const NavItem = ({ scrollY, isServer, name, id, className }: NavItemProps) => {
  const [element] = useState(() => {
    if (isServer) {
      return null;
    } else {
      return document.getElementById(id);
    }
  });

  const localProgress = useTransform(scrollY, (latest) => {
    if (isServer || element === null) return 0;
    const viewportHeight = window.innerHeight;
    const elementPositionFromTopOfDocument = element.offsetTop;
    const elementHeight = element.offsetHeight;
    const value =
      (latest + viewportHeight - elementPositionFromTopOfDocument) /
      elementHeight;
    const clamppedValue = Math.min(1, Math.max(value, 0));
    return clamppedValue;
  });

  const clipPath = useTransform(
    localProgress,
    [0, 1],
    ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"],
  );

  const handleSmoothScroll = () => {
    if (element === null) return;
    window.scrollTo({
      top: element.offsetTop,
      behavior: "smooth",
    });
  };
  return (
    <Link
      href={"#" + id}
      scroll={false}
      onClick={handleSmoothScroll}
      className="relative overflow-hidden bg-(--nav-item-bg) text-base text-(--nav-item-text) capitalize max-sm:rounded-full sm:text-[13px] sm:first:rounded-l-full sm:last:rounded-r-full [&>div]:px-8.5 [&>div]:py-1 [&>div]:sm:py-2"
    >
      <div className="relative z-20">{name}</div>
      <motion.div
        className="absolute inset-0 z-20 bg-(--nav-item-text) text-(--nav-item-bg)"
        // style={{ scale, borderRadius }}
        style={{ clipPath }}
      >
        {name}
      </motion.div>
    </Link>
  );
};
