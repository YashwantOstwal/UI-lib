import SpinningCarouselDemo from "@/components/spinning-carousel/spinning-carousel.demo";
import * as React from "react";
// export default function page() {
//   const [count, setCount] = useState(0);
//   const ref = useRef<HTMLDivElement>(null);
//   const [style, setStyle] = useState({ x: 0, y: 0 });
//   const handleClick = () => {
//     const newCount = (count + 1) % 5;
//     if (ref.current) {
//       const {
//         width: containerWidth,
//         height: containerHeight,
//         left: containerLeft,
//         top: containerTop,
//       } = ref.current.getBoundingClientRect() as DOMRect;
//       const centerX = containerLeft + containerWidth / 2;
//       const centerY = containerTop + containerHeight / 2;
//       const element = ref.current.querySelector(
//         `[data-index="${newCount}"]`,
//       ) as HTMLDivElement;
//       if (element) {
//         const {
//           width: elementWidth,
//           height: elementHeight,
//           left: elementLeft,
//           top: elementTop,
//         } = element.getBoundingClientRect() as DOMRect;
//         const elementCenterX = elementLeft + elementWidth / 2;
//         const elementCenterY = elementTop + elementHeight / 2;
//         const translateX = centerX - elementCenterX;
//         const translateY = centerY - elementCenterY;
//         setStyle({ x: translateX, y: translateY });
//         setCount(newCount);
//       }
//     }
//   };
//   return (
//     <div className="flex h-screen flex-col items-center justify-center bg-white">
//       <div className="overflow-hidden">
//         <motion.div
//           style={style}
//           layoutId="lorem"
//           ref={ref}
//           className="grid aspect-square h-[300px] scale-125 grid-cols-12 grid-rows-6 gap-2 p-2 [&_div]:rounded-3xl"
//         >
//           <div
//             data-index="0"
//             className="z-10 col-span-4 col-start-1 row-span-2 row-start-2 grid place-items-center bg-amber-300"
//           >
//             0
//           </div>
//           <div
//             data-index="1"
//             className="z-10 col-span-3 col-start-2 row-span-3 row-start-4 grid place-items-center bg-amber-300"
//           >
//             1
//           </div>
//           <div
//             data-index="2"
//             className="z-10 col-span-4 col-start-5 row-span-3 row-start-1 grid place-items-center bg-amber-300"
//           >
//             2
//           </div>
//           <div
//             data-index="3"
//             className="z-10 col-span-4 col-start-5 row-span-3 row-start-4 grid place-items-center bg-amber-300"
//           >
//             3
//           </div>
//           <div
//             data-index="4"
//             className="z-10 col-span-4 col-start-9 row-span-4 row-start-2 grid place-items-center bg-amber-300"
//           >
//             4
//           </div>
//           {/* <div
//             className="z-30 col-span-12 col-start-1 row-span-6 row-start-1"
//             style={{
//               backgroundImage:
//                 "radial-gradient(circle at 50%,rgba(255,255,255,0.3), rgba(255,255,255,1))",
//             }}
//           ></div> */}
//         </motion.div>
//       </div>
//       <button onClick={handleClick}>Click to render</button>
//     </div>
//   );
// }

export default function Page() {
  return (
    <>
      <SpinningCarouselDemo />
      {/* <div className=""> */}

      {/* </div> */}
    </>
  );
}
