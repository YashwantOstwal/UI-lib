"use client";
import { useMotionValue } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
const suggestions = ["@gmail.com", "@yahoo.com", "@zeromail.com"];

// export default function LearnClient() {
//   const [value, setValue] = useState("");
//   const mirrorRef = useRef<HTMLDivElement>(null);
//   const [possibleSuggestions, setPossibleSuggestions] = useState<string[]>([]);
//   const [currentSuggestion, setCurrentSuggestion] = useState(0);

//   const x = useMotionValue(0);
//   const ref = useRef<HTMLInputElement>(null);
//   useEffect(() => {
//     const handleScroll = () => {
//       if (ref.current) {
//         console.log(ref.current.scrollLeft);
//         x.set(-1 * ref.current.scrollLeft);
//       }
//     };
//     if (ref.current) {
//       ref.current.addEventListener("scroll", handleScroll);
//     }
//     return () => {
//       if (ref.current) {
//         ref.current.removeEventListener("scroll", handleScroll);
//       }
//     };
//   }, []);
//   const handleChange = (e: any) => {
//     const newValue = e.target.value;
//     for (let i = 0; i < suggestions.length; i++) {
//       for (let j = newValue.length - 1; j >= 0; j--) {
//         if (suggestions[i].startsWith(newValue.slice(j))) {
//           setPossibleSuggestions((prev) => [...prev, suggestions[i]]);
//         }
//       }
//     }
//     setValue(newValue);
//   };
//   return (
//     <>
//       <div className="relative w-full max-w-[100px] overflow-hidden">
//         <input
//           value={value}
//           onChange={handleChange}
//           ref={ref}
//           type="text"
//           className="relative z-10 size-full border-b border-black text-transparent caret-amber-600 outline-none selection:bg-amber-200"
//         />
//         <motion.div
//           style={{ x }}
//           className="pointer-events-none absolute inset-y-0 left-0 z-30 w-fit whitespace-pre text-blue-400"
//         >
//           <div className="w-fit">
//             {value.split("").map((eachCharacter) => (
//               <span>{eachCharacter}</span>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </>
//   );
// }
export default function LearnClient({ sides = 2 }: { sides?: number }) {
  const customDistance = (x: number, y: number): number => {
    const chebyshev = Math.max(Math.abs(x), Math.abs(y));
    const manhattan = Math.abs(x) + Math.abs(y);
    return Math.max(0, chebyshev + manhattan - 1);
  };
  const order = 3 * sides + 1;
  const center = Math.ceil(order / 2);
  const pentagonContruct = () => {
    const arr: number[] = [];
    const rec = (newElement: number) => {
      if (newElement === order) {
        arr.push(...Array(arr.length + 1).fill(newElement));
        return;
      }
      arr.push(newElement);
      rec(newElement + 2);
      arr.push(newElement);
    };
    rec(sides + 1);
    return arr;
  };

  const pentagonArr = pentagonContruct();
  return (
    <>
      <div className="flex flex-nowrap gap-5">
        <div
          style={{
            gridTemplateColumns: `repeat(${order},1fr)`,
            gridTemplateRows: `repeat(${order},1fr)`,
          }}
          className="grid size-[350px] bg-red-400"
        >
          {Array.from({ length: order * order }, (_, i) => i).map((i, j) => (
            <div
              className="m-auto size-fit"
              key={`(${Math.ceil((i + 1) / order) - center},${(j % order) + 1 - center})`}
            >
              {`(${(j % order) + 1 - center},${center - Math.ceil((i + 1) / order)})`}
            </div>
          ))}
        </div>
        <div
          style={{
            gridTemplateColumns: `repeat(${order},1fr)`,
            gridTemplateRows: `repeat(${order},1fr)`,
          }}
          className="grid size-[350px] bg-red-400"
        >
          {Array.from({ length: order * order }, (_, i) => i).map((i, j) => (
            <div
              className="m-auto size-fit"
              key={`(${Math.ceil((i + 1) / order) - center},${(j % order) + 1 - center})`}
            >
              {customDistance(
                (j % order) + 1 - center,
                center - Math.ceil((i + 1) / order),
              )}
            </div>
          ))}
        </div>
        <div className="relative size-fit border-2 border-gray-500">
          <div
            className="absolute inset-0 z-10 grid"
            style={{
              gridTemplateColumns: `repeat(${order},1fr)`,
              gridTemplateRows: `repeat(${order},1fr)`,
              maskImage:
                "radial-gradient(circle at 50%, rgba(0,0,0,1), rgba(0,0,0,0))",
              WebkitMaskImage:
                "radial-gradient(circle at 50%, rgba(0,0,0,1), rgba(0,0,0,0))",
            }}
          >
            {pentagonArr.map((totalDotsInThisRow, rowIndex) =>
              Array.from({ length: totalDotsInThisRow }).map((_, j) => {
                const columnOffset = (order - totalDotsInThisRow) / 2;
                const gridRowStart = rowIndex + 1;
                const gridColumnStart = columnOffset + j + 1;
                return (
                  <motion.span
                    className="m-auto rounded-full bg-[#66ffbb]/40 p-0.25"
                    style={{
                      gridRowStart,
                      gridColumnStart,
                    }}
                  ></motion.span>
                );
              }),
            )}
          </div>
          <div
            style={{
              gridTemplateColumns: `repeat(${order},1fr)`,
              gridTemplateRows: `repeat(${order},1fr)`,
            }}
            className="relative z-20 grid size-[100px]"
          >
            {pentagonArr.map((totalDotsInThisRow, rowIndex) =>
              Array.from({ length: totalDotsInThisRow }).map((_, j) => {
                const columnOffset = (order - totalDotsInThisRow) / 2;
                const gridRowStart = rowIndex + 1;
                const gridColumnStart = columnOffset + j + 1;
                return (
                  <motion.div
                    className="m-auto rounded-full bg-[#66ffbb] p-0.25"
                    {...{
                      initial: {
                        scale: 1,
                        x: "0%",
                        y: "0%",
                      },
                      animate: {
                        scale: [null, 6, 1],
                        x: [null, `${100 * (gridColumnStart - center)}%`, "0%"],
                        y: [null, `${100 * (gridRowStart - center)}%`, "0%"],
                      },
                      transition: {
                        delay:
                          customDistance(
                            gridColumnStart - center,
                            gridRowStart - center,
                          ) * 1,
                        duration: 6,
                      },
                    }}
                    style={{
                      gridRowStart,
                      gridColumnStart,
                    }}
                  ></motion.div>
                );
              }),
            )}
          </div>
        </div>
      </div>
    </>
  );
}
