"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const StickyShowcaseContext = createContext<null | {
  state: number;
  handleClick: (index: number) => void;
}>(null);
export default function StickyShowcaseProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [state, setState] = useState(0);
  const refs = useRef<HTMLDivElement[]>([]);

  const handleClick = (index: number) => {
    setState(index);
    refs.current[index].scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    refs.current = Array.from(
      document.querySelectorAll<HTMLDivElement>("[data-stickyid]"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const dataStickyid = entry.target.getAttribute("data-stickyid");

            setState(Number(dataStickyid as string));
          }
        });
      },
      {
        rootMargin: "-50% 0% -50% 0%",
      },
    );

    refs.current.forEach((el) => {
      observer.observe(el);
    });

    // return () => {
    //   refs.current.forEach((el) => {
    //     observer.unobserve(el);
    //   });
    // };
    return () => observer.disconnect();
  }, []);
  return (
    <StickyShowcaseContext value={{ state, handleClick }}>
      {children}
    </StickyShowcaseContext>
  );
}

export function useStickyShowcase() {
  const obj = useContext(StickyShowcaseContext);
  if (obj === null) throw new Error();
  return obj;
}
