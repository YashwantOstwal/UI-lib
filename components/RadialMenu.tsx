"use client";

//TODO: exit outside click close (useOutsideClick hook) ,conical gradient animation,render using useLayoutEffect for the scoped elemenet, and tooltip?

import React, { CSSProperties, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimate } from "motion/react";

const RadialMenu = () => {
  const currentActive = useRef<{ [key: string]: number }>({
    index: 0,
    angle: 0,
  });
  const [openRadialBar, setOpenRadialBar] = useState(false);
  const [scope, animate] = useAnimate();

  const handleMouseUp = (tabIndex: number, children: number) => {
    setOpenRadialBar(false);
    currentActive.current = {
      index: 0,
      angle: 0,
    };
    console.log(tabIndex, children);
  };

  const handleMouseEnterAnimation = (tabIndex: number) => {
    let i, j, forwardPath, backwardPath;
    forwardPath = backwardPath = currentActive.current.angle;
    for (i = currentActive.current.index; i != tabIndex; i = (i + 1) % 6) {
      forwardPath += 60;
    }
    for (j = currentActive.current.index; j != tabIndex; j = (j - 1 + 6) % 6) {
      backwardPath -= 60;
    }

    const shortestPath =
      Math.abs(forwardPath - currentActive.current.angle) <=
      Math.abs(backwardPath - currentActive.current.angle)
        ? forwardPath
        : backwardPath;
    scope.current.style.transform = `rotate(${shortestPath}deg)`;
    currentActive.current.index = tabIndex;
    currentActive.current.angle = shortestPath;
    animate(scope.current, {
      rotate: `${shortestPath}deg`,
      duration: 0.5,
    });
  };
  return (
    <div className="fixed top-20 left-20 flex size-12 items-center justify-center overflow-visible rounded-full">
      <motion.button
        onMouseDown={() => setOpenRadialBar(true)}
        onMouseUp={() => {
          currentActive.current = {
            index: 0,
            angle: 0,
          };
          setOpenRadialBar(false);
        }}
        className="border-gray relative z-10 w-full rounded-full border bg-[#f4f4f4] p-0.5"
      >
        <AddSVG openRadialBar={openRadialBar} />
      </motion.button>
      <AnimatePresence>
        {openRadialBar && (
          <motion.div
            initial={{
              maskImage:
                "conic-gradient(from -0.20833333333turn ,rgba(0,0,0,1) 0%,rgba(0,0,0,1) 0%,rgba(0,0,0,0) 0%,rgba(0,0,0,0) 100%)",
            }}
            animate={{
              maskImage:
                "conic-gradient(from -0.20833333333turn ,rgba(0,0,0,1) 0%,rgba(0,0,0,1) 100%,rgba(0,0,0,0) 100%,rgba(0,0,0,0) 100%)",
            }}
            exit={{
              maskImage:
                "conic-gradient(from -0.20833333333turn ,rgba(0,0,0,1) 0%,rgba(0,0,0,1) 0%,rgba(0,0,0,0) 0%,rgba(0,0,0,0) 100%)",
            }}
            className="absolute h-40 w-40 overflow-hidden rounded-full bg-[#fefefe] p-2"
          >
            <div
              className="absolute inset-0 z-0 bg-[#C0C2C4]/30"
              style={{
                maskImage:
                  "radial-gradient(circle at center,rgba(192, 194, 196,0) 0%,rgba(192, 194, 196,0) 74px,rgba(192, 194, 196,1) 74px)",
              }}
            >
              <motion.div
                ref={scope}
                className="border-gray h-1/2 w-1/2 border bg-[#C0C2C4]"
                style={{
                  transformOrigin: "100% 100%",
                  clipPath:
                    "polygon(100% 100%,0% 73.2%,0% 0%,73.2% 0%,100% 100%)",
                }}
              />
            </div>
            <div className="relative h-full cursor-pointer overflow-hidden rounded-full">
              {[1, 2, 3, 4, 5, 6].map((eachElement, i) => (
                <motion.div
                  onMouseUp={() => handleMouseUp(i, eachElement)}
                  onMouseEnter={() => handleMouseEnterAnimation(i)}
                  key={"menu-" + i}
                  className="absolute top-0 left-0 flex h-1/2 w-1/2 origin-bottom-right flex-col items-end justify-end bg-[#fefefe] pr-8 pb-6 text-black/50 hover:bg-[#f4f4f4] hover:text-[#000000]"
                  style={{
                    transform: `rotate(${i * 60}deg)`,
                    clipPath:
                      "polygon(100% 100%,0% 73.2%,0% 0%,73.2% 0%,100% 100%)",
                    boxShadow: "1px 1px solid black",
                  }}

                  // whileHover={{
                  //   backgroundColor: "#f4f4f4",
                  //   color: "#000000",
                  //   transition: { duration: 0 },
                  // }}
                >
                  <div style={{ transform: `rotate(-${i * 60}deg)` }}>
                    {eachElement}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
function AddSVG({
  width = "100%",
  height = "100%",
  style,
  openRadialBar,
}: {
  height?: string;
  width?: string;
  style?: CSSProperties;
  openRadialBar: boolean;
}) {
  return (
    <motion.svg
      animate={{
        transform: openRadialBar
          ? "rotate(45deg) scale(105%)"
          : "rotate(0deg) scale(100%)",
      }}
      height={height}
      width={width}
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 292.377 292.377"
      xmlSpace="preserve"
      style={{ borderRadius: "50%", ...style }}
      className="border-gray border [fill:#0a0a0a] hover:[fill:#262626]"
    >
      <g>
        <path
          d="M146.188,0C65.576,0,0,65.582,0,146.188s65.576,146.188,146.188,146.188
		s146.188-65.582,146.188-146.188S226.801,0,146.188,0z M194.962,152.155h-42.806v42.8c0,3.3-2.667,5.967-5.967,5.967
		c-3.3,0-5.967-2.667-5.967-5.967v-42.8H97.415c-3.294,0-5.967-2.673-5.967-5.967s2.673-5.967,5.967-5.967h42.806V97.415
		c0-3.294,2.667-5.967,5.967-5.967c3.3,0,5.967,2.673,5.967,5.967v42.806h42.806c3.3,0,5.967,2.673,5.967,5.967
		S198.261,152.155,194.962,152.155z"
        />
      </g>
    </motion.svg>
  );
}
// function RadialMenu() {
//   return (
//     <div className="relative m-10 size-40 overflow-hidden rounded-full bg-red-300">
//       <div
//         className="absolute left-0 top-0 h-1/2 w-1/2 bg-blue-400"
//         style={{
//           transformOrigin: "100% 100%",
//           transform: "rotate(15deg)",
//           clipPath: "polygon(100% 100%,0% 73.2%,0% 0%,73.2% 0%,100% 100%)",
//         }}
//       ></div>
//       <div
//         className="absolute left-0 top-0 h-1/2 w-1/2 bg-blue-300"
//         style={{
//           transformOrigin: "100% 100%",
//           transform: "rotate(75deg)",
//           clipPath: "polygon(100% 100%,0% 73.2%,0% 0%,73.2% 0%,100% 100%)",
//         }}
//       ></div>
//       <div
//         className="absolute left-0 top-0 h-1/2 w-1/2 bg-blue-300"
//         style={{
//           transformOrigin: "100% 100%",
//           transform: "rotate(135deg)",
//           clipPath: "polygon(100% 100%,0% 73.2%,0% 0%,73.2% 0%,100% 100%)",
//         }}
//       ></div>
//       <div
//         className="absolute left-0 top-0 h-1/2 w-1/2 bg-blue-300"
//         style={{
//           transformOrigin: "100% 100%",
//           transform: "rotate(195deg)",
//           clipPath: "polygon(100% 100%,0% 73.2%,0% 0%,73.2% 0%,100% 100%)",
//         }}
//       ></div>
//       <div
//         className="absolute left-0 top-0 h-1/2 w-1/2 bg-blue-300"
//         style={{
//           transformOrigin: "100% 100%",
//           transform: "rotate(255deg)",
//           clipPath: "polygon(100% 100%,0% 73.2%,0% 0%,73.2% 0%,100% 100%)",
//         }}
//       ></div>
//       <div
//         className="absolute left-0 top-0 flex h-1/2 w-1/2 flex-col items-end justify-end bg-blue-800"
//         style={{
//           transformOrigin: "100% 100%",
//           transform: "rotate(315deg)",
//           clipPath: "polygon(100% 100%,0% 73.2%,0% 0%,73.2% 0%,100% 100%)",
//         }}
//       >
//         <div
//           style={{
//             transform: "rotate(-315deg)",
//             padding: "30px",
//           }}
//         >
//           H
//         </div>
//       </div>
//     </div>
//   );
// }
export default RadialMenu;
