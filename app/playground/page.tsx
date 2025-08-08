"use client";
import useToggleState from "@/hooks/use-toggle-state";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import Image from "next/image";

const Page = () => {
  return (
    <>
      <TestimonialsClient />
    </>
  );
};

interface Testimonial {
  testimonial: string;
  name: string;
  occupation: string;
  profilePicture: string;
  brandLogo: string;
}

const testimonials: Testimonial[] = [
  {
    testimonial:
      "Just gave it a go and it's definitely the easiest meeting I've ever scheduled!",
    name: "Aria Minaei",
    occupation: "CEO, Theatre.JS",
    profilePicture: "/testimonials/Aria Minaei.png",
    brandLogo: "/testimonials/TheatreJSLogo.svg",
  },
  {
    testimonial:
      "I finally made the move to Cal after I couldn't find how to edit events in the Calendly dashboard.",
    name: "Ant Wilson",
    occupation: "Co-Founder & CTO, Supabase",
    profilePicture: "/testimonials/Ant Wilson.png",
    brandLogo: "/testimonials/SupaBaseLogo.png",
  },
  {
    testimonial: "I just migrated from Calendly to Cal.com",
    name: "Kent C. Dodds",
    occupation: "Founder of EpicWeb.dev",
    profilePicture: "/testimonials/Kent C. Dodds.png",
    brandLogo: "/testimonials/EpicWebLogo.png",
  },
  {
    testimonial:
      "I think Cal.com has a very good chance of creating a new category around being both great and well designed.",
    name: "Guillermo Rauch",
    occupation: "CEO, Vercel",
    profilePicture: "/testimonials/Guillermo Rauch.png",
    brandLogo: "/testimonials/VercelLogo.svg",
  },
  {
    testimonial: "Working hard is easy than not working hard.",
    name: "Yashwant",
    occupation: "lorem ipsul",
    profilePicture: "/testimonials/Guillermo Rauch.png",
    brandLogo: "/testimonials/VercelLogo.svg",
  },
];

const READ_TIME = 10000;
const ANIMATION_TIME = 4000;
function TestimonialsClient() {
  const ref = useRef(null);
  // const isInView = useInView(ref);
  const controlInterval = useRef<NodeJS.Timeout>(undefined);
  const [state, setState] = useState(0);
  const id = useId();
  // useEffect(() => {
  //   if (true) {
  //     controlInterval.current = setInterval(() => {
  //       setState((prev) => (prev + 1) % testimonials.length);
  //     }, READ_TIME + ANIMATION_TIME);
  //   }
  //   return () => clearInterval(controlInterval.current);
  // }, [true]);

  return (
    <>
      <div
        // ref={ref}
        className="relative isolate flex h-[360px] flex-nowrap justify-center overflow-x-hidden sm:h-[270px]"
      >
        <AnimatePresence>
          {Array.from({ length: 4 }, (_, i) => {
            const j = state + i;
            return j;
          }).map((j, index) => (
            <motion.div
              key={String(j % 4)}
              layoutId={String(j % 4)}
              initial={{
                opacity: index == 1 ? 1 : index === 3 ? 0 : 0.5,
              }}
              style={{
                position: index == 4 - 1 ? "absolute" : "relative",
                zIndex: -index,
              }}
              animate={{
                opacity: index == 1 ? 1 : index === 3 ? 0 : 0.5,
              }}
              transition={{
                layout: { ease: "easeInOut", duration: ANIMATION_TIME / 1000 },
                opacity: { ease: "easeInOut", duration: ANIMATION_TIME / 1000 },
              }}
              className="h-full w-[85%] shrink-0 bg-blue-300/50 p-3 sm:w-[75%] md:w-[65%] lg:w-[50%]"
            >
              <div className="flex h-full flex-col items-center justify-center rounded-2xl bg-white p-4 lg:p-6">
                {/* <p className="[text-indent:-6px] text-[20px] font-semibold text-[#141414] lg:[text-indent:-7px] lg:text-[24px]">
                &quot;{testimonial.testimonial}&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="size-[44px] rounded-lg bg-red-300" />
                <div className="text-[14px]">
                  <p className="font-medium text-[#111827]">
                    {testimonial.name}
                  </p>
                  <p className="text-[#6b7280]">{testimonial.occupation}</p>
                </div>
              </div> */}
                <motion.div
                  key={state}
                  exit={{
                    opacity: 1,
                    transition: { delay: ANIMATION_TIME / 1000 },
                  }}
                >
                  {testimonials[j % testimonials.length].name}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <button
        onClick={() => setState((prev) => (prev + 1) % testimonials.length)}
      >
        Click to toggle
      </button>
    </>
  );
}

export default Page;
