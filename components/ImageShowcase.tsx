"use client";

import { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { motion, animate, useMotionValue } from "motion/react";

import useMaskImage from "@/hooks/use-mask-image";
import Image1 from "@/public/ImageContainer/image-1.png";
import Image2 from "@/public/ImageContainer/image-2.png";
import Image3 from "@/public/ImageContainer/image-3.png";
import Image4 from "@/public/ImageContainer/image-4.png";
import Image5 from "@/public/ImageContainer/image-5.png";
import { cn } from "@/lib/utils";
const images: any[] = [Image1, Image2, Image3, Image4, Image5];
export default function ImageShowcase() {
  const [state, setState] = useState(0);
  const controlInterval = useRef<NodeJS.Timeout>(undefined);
  useEffect(() => {
    controlInterval.current = setInterval(() => {
      setState((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(controlInterval.current);
  }, []);
  return (
    <div className="relative aspect-[1.5] w-full max-w-[600px] bg-red-300">
      <ImageShowcase.Image key={state} src={images[state]} state={state} />
      <motion.div className="absolute inset-0 z-10">
        <Image
          src={images[(state + 1) % images.length]}
          className="h-full w-full object-cover"
          alt=""
        />
      </motion.div>
    </div>
  );
}

ImageShowcase.Image = function Image2({
  src,
  state,
}: {
  src: StaticImageData;
  state: number;
}) {
  const val = useMotionValue(0);
  const maskImage = useMaskImage(val, false);
  useEffect(() => {
    val.set(0);
    animate(val, 1, { duration: 1, delay: 1 });
  }, []);
  return (
    <motion.div
      style={{
        maskImage,
      }}
      className="pointer-events-none absolute inset-0 z-20"
    >
      <Image src={src} priority className="h-full w-full object-cover" alt="" />
    </motion.div>
  );
};
