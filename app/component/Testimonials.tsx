"use client";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
interface Testimonial {
  testimonial: string;
  name: string;
  occupation: string;
}

const colors = [
  "bg-[#FF6B6B]",
  "bg-[#6BCB77]",
  "bg-[#4D96FF]",
  "bg-[#FFD93D]",
  // "bg-[#FF6F91]",
  // "bg-[#845EC2]",
  // "bg-[#00C9A7]",
  // "bg-[#F9F871]",
  // "bg-[#0081CF]",
  // "bg-[#FFC75F]",
];

const testimonials: Testimonial[] = [
  {
    testimonial:
      "Just gave it a go and it's definitely the easiest meeting I've ever scheduled!",
    name: "Aria Minaei",
    occupation: "CEO, Theatre.JS",
  },
  {
    testimonial:
      "I finally made the move to Cal after I couldn't find how to edit events in the Calendly dashboard.",
    name: "Ant Wilson",
    occupation: "Co-Founder & CTO, Supabase",
  },
  {
    testimonial: "I just migrated from Calendly to Cal.com",
    name: "Kent C. Dodds",
    occupation: "Founder of EpicWeb.dev",
  },
  {
    testimonial:
      "I think Cal.com has a very good chance of creating a new category around being both great and well designed.",
    name: "Guillermo Rauch",
    occupation: "CEO, Vercel",
  },
];
export default function TestimonialsClient() {
  //   const { ref, state } = useToggleState<HTMLDivElement>(
  //     { from: 0, to: testimonials.length },
  //     5000,
  //   );
  const [state, setState] = useState(0);
  const orderedTestimonials: Testimonial[] = useMemo(() => {
    const orderedTestimonials: Testimonial[] = [];
    let i = state;
    do {
      orderedTestimonials.push(testimonials[i]);
      i = (i + 1) % testimonials.length;
    } while (i != state);
    return orderedTestimonials;
  }, [state]);
  const ids: string[] = useMemo(() => {
    const ids: string[] = [];
    let i = state;
    do {
      ids.push("card-" + i);
      i = (i + 1) % 4;
    } while (i != state);
    return ids;
  }, [state]);
  return (
    <>
      <div
        //   ref={ref}
        className="relative flex h-[270px] w-[90%] justify-center overflow-x-hidden"
      >
        {orderedTestimonials.map((testimonial, index) => (
          <motion.div
            key={ids[index]}
            // layoutId={ids[index]}
            // initial={{
            //   opacity: index == 2 ? 0 : index == 0 ? 1 : 0.5,
            // }}
            style={{
              position: index == 2 ? "absolute" : "relative",
              // display: index == 2 ? "hidden" : "block",
              zIndex: index == 2 ? 1 : 2,
              // order: index == 0 ? 2 : index,
            }}
            // animate={{
            //   opacity: index == 2 ? 0 : index == 0 ? 1 : 0.5,
            // }}
            transition={{
              duration: 0.8,
            }}
            className={cn(
              "flex h-full w-[85%] shrink-0 flex-col items-center justify-between border bg-red-400 p-1 sm:w-[75%] md:w-[65%] lg:w-1/2",
            )}
          >
            <p className="[text-indent:-6px] text-[20px] font-semibold text-[#141414] lg:[text-indent:-7px] lg:text-[24px]">
              {index} &nbsp; {testimonial.name}
            </p>
            <div className="flex items-center gap-3">
              <div className="size-11 bg-red-300"></div>
              <div className="text-[14px]">
                <p className="font-medium text-[#111827]">{testimonial.name}</p>
                <p className="text-[#6b7280]">{testimonial.occupation}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <button
        onClick={() => setState((prev) => (prev + 1) % testimonials.length)}
      >
        Click me
      </button>
    </>
  );
}

// export default function Testimonials() {
//   const [state, setState] = useState(0);
//   const handleIncrement = () =>
//     setState((prev) => (prev + 1) % testimonials.length);
//   return (
//     <>
//       <style>{`
//     #testimonial{
//     --h:200px
//     }
//     `}</style>
//       <div id="testimonial" className="flex h-(--h) w-[400px] justify-center">
//         {Array.from(
//           { length: 3 },
//           (_, i) => colors[(state + i) % colors.length],
//         ).map((color, j) => (
//           <motion.div
//             key={color}
//             initial={{ x: "100%" }}
//             animate={{ x: "0%" }}
//             // exit = {{x:'-100%'}}
//             layoutId={color}
//             className={cn("w-1/2 shrink-0", color)}
//             data-slot="card"
//           >
//             {color}
//           </motion.div>
//         ))}
//       </div>
//       <button onClick={handleIncrement}>Click to increment</button>
//     </>
//   );
// }
