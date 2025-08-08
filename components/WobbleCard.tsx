"use client";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useMotionTemplate,
} from "motion/react";
import Image from "next/image";
import Image1 from "@/public/Introduction.png";
export default function WobbleCard() {
  const xProgress = useMotionValue(1);
  const yProgress = useMotionValue(0);

  //   clipPath: "polygon(7% 7.75%,93% 0%,93% 100%,7% 92.25%)",
  //   const clipPath = useMotionTemplate`polygon(7% ${}%,93% 7.75%,93% 92.25%,7% 100%)`;

  const clipPath = useTransform(xProgress, (latest) => {
    return `polygon(7% ${latest * 7.75}%,93% ${(1 - latest) * 7.75}%,93% ${100 - (1 - latest) * 7.75}%,7% ${100 - latest * 7.75}%)`;
  });
  const rotateY = useTransform(xProgress, [0, 1], ["-20deg", "20deg"]);
  const xChild = useTransform(xProgress, [0, 1], ["4%", "-4%"]);
  const x = useTransform(xProgress, [0, 1], ["-4%", "4%"]);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const cardLeft = rect.left;
    const cardTop = rect.top;
    const cardWidth = rect.width;
    const cardHeight = rect.height;

    const mouseX = e.clientX - cardLeft;
    const mouseY = e.clientY - cardTop;
    const mouseXProgress = mouseX / cardWidth;
    const mouseYProgress = mouseY / cardHeight;

    if (mouseXProgress >= 0) {
      xProgress.set(1 - mouseXProgress);
    }
    if (mouseYProgress >= 0) {
      yProgress.set(1 - mouseYProgress);
    }
  };
  const handleMouseMoveTemp = () => {};
  //   const handleMouseLeave = () => {
  //     animate(xProgress, 0.5);
  //     animate(yProgress, 0.5);
  //   };
  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-center gap-10">
        {/* <div
          className="//perspective-[1000px] relative aspect-[2] w-[500px] bg-red-300"
          onMouseMove={handleMouseMove}
        >
          <motion.div
            className="size-full bg-gray-600/50"
            style={{
              clipPath,
              x,
            }}
          >
            <motion.div style={{ x: xChild }} className="size-full">
              <Image
                src={Image1}
                alt=""
                className="size-full object-cover"
              ></Image>
            </motion.div>
          </motion.div>
        </div> */}
        <div className="grid aspect-[2] w-[500px] cursor-pointer place-items-center bg-gray-600/50">
          <motion.div
            className="h-[110%] w-[110%] bg-red-300/50"
            style={{
              clipPath: "polygon(2.5% 0%,90% 10%,90% 90%,2.5% 100%)",
            }}
          ></motion.div>
        </div>
        <div
          onMouseMove={handleMouseMove}
          className="grid aspect-[2] w-[500px] cursor-pointer place-items-center bg-gray-600/50 perspective-[1000px]"
        >
          <motion.div
            style={{ rotateY }}
            className="size-full bg-red-300/50"
          ></motion.div>
        </div>
      </div>
      {/* <div className="flex justify-center gap-20">
        <div className="bg-red-300 perspective-[1000px]">
          <motion.div
            className="aspect-[2] w-[500px] cursor-pointer bg-gray-600/50"
            style={{
              rotateY: "-20deg",
            }}
          ></motion.div>
        </div>
        <div className="bg-red-300">
          <motion.div
            className="aspect-[2] w-[500px] cursor-pointer bg-gray-600/50"
            style={{
              scale: 1.1,
              clipPath,
            }}
          ></motion.div>
        </div>
      </div>

      <div className="flex justify-center gap-20">
        <div className="bg-red-300 perspective-[1000px]">
          <motion.div
            className="aspect-[2] w-[500px] cursor-pointer bg-gray-600/50"
            style={{
              rotateX: "20deg",
            }}
          ></motion.div>
           <div className="absolute inset-y-0 right-0 w-[35px] bg-black/40"></div> 
        </div>
        <div className="relative bg-red-300">
          <motion.div
            className="aspect-[2] w-[500px] cursor-pointer bg-gray-600/50"
            style={{
              scale: 1.1,
              clipPath: "polygon(0% 100%,100% 100%,100% 0%, 0% 0%)",
            }}
          ></motion.div>

          <div className="absolute inset-x-0 top-0 h-[10px] bg-black/40"></div>
          <div className="absolute inset-y-0 right-0 w-[35px] bg-black/40"></div> 
        </div>
      </div> */}
    </div>
  );
}
