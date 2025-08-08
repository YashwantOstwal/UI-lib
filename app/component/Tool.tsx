"use client";
// import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { SetStateAction, useState } from "react";
type RangeValue = {
  value: number;
  min: number;
  max: number;
};
type BoxShadow = {
  offsetX: RangeValue;
  offsetY: RangeValue;
  blur: RangeValue;
  spread: RangeValue;
  inset: boolean;
  color: string;
};
export default function Tool() {
  const [boxShadowProps, setBoxShadowProps] = useState<BoxShadow>({
    offsetX: {
      value: 0,
      min: 0,
      max: 10,
    },
    offsetY: {
      value: 0,
      min: 0,
      max: 10,
    },
    blur: {
      value: 0,
      min: 0,
      max: 10,
    },
    spread: {
      value: 0,
      min: 0,
      max: 10,
    },
    inset: false,
    color: "#000000",
  });
  const getBoxShadow = ({
    offsetX,
    offsetY,
    blur,
    spread,
    inset,
    color,
  }: BoxShadow) => {
    const temp = `${offsetX}px ${offsetY}px ${blur}px ${spread}px ${color}`;
    return inset ? temp + " inset" : temp;
  };
  const boxShadow = getBoxShadow(boxShadowProps);
  return (
    <>
      <div className="flex gap-10">
        <div className="max-w-[320px] rounded-xl bg-white p-4 text-[15px] shadow-[0px_8px_12px_-4px_rgba(15,12,12,0.08),_0px_0px_2px_0px_rgba(15,12,12,0.10),_0px_1px_2px_0px_rgba(15,12,12,0.10)]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
          provident ab quidem commodi. Saepe ea voluptatibus est odio
          exercitationem
        </div>
        <div
          style={{ boxShadow }}
          className="flex max-w-[320px] flex-col gap-6 rounded-xl bg-white p-4 text-[15px]"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
          provident ab quidem commodi. Saepe ea voluptatibus est odio
          exercitationem
        </div>
      </div>
      <div className="rounded-xl bg-amber-200 p-4">
        <Slider
          label="offsetX"
          setBoxShadowProps={setBoxShadowProps}
          boxShadowProps={boxShadowProps}
        />
        <Slider
          label="offsetY"
          setBoxShadowProps={setBoxShadowProps}
          boxShadowProps={boxShadowProps}
        />
        <Slider
          label="blur"
          setBoxShadowProps={setBoxShadowProps}
          boxShadowProps={boxShadowProps}
        />
        <Slider
          label="spread"
          setBoxShadowProps={setBoxShadowProps}
          boxShadowProps={boxShadowProps}
        />
        <Toggle
          label="inset"
          setBoxShadowProps={setBoxShadowProps}
          // boxShadowProps={boxShadowProps}
        ></Toggle>
      </div>
    </>
  );
}
function Toggle({
  label,
  setBoxShadowProps,
}: {
  label: string;
  setBoxShadowProps: React.Dispatch<SetStateAction<BoxShadow>>;
}) {
  return (
    <div className="flex gap-1">
      <span className="capitalize">{label}:</span>
      <button
        onClick={() =>
          setBoxShadowProps((prev) => ({ ...prev, inset: !prev.inset }))
        }
      >
        toggle
      </button>
    </div>
  );
}
function Slider({
  label,
  min = 0,
  max = 10,
  boxShadowProps,
  setBoxShadowProps,
}: {
  label: "offsetX" | "offsetY" | "blur" | "spread" | "color";
  min?: number;
  max?: number;
  boxShadowProps: BoxShadow;
  setBoxShadowProps: React.Dispatch<SetStateAction<BoxShadow>>;
}) {
  return (
    <div className="flex gap-2">
      <span className="capitalize">{label}:</span>
      <div className="flex gap-1">
        <input type="number" className="w-[40px]" />
        <input
          type="range"
          defaultValue={0}
          min={min}
          max={max}
          onChange={(e) =>
            setBoxShadowProps((prev) => ({
              ...prev,
              [label]: parseInt(e.target.value),
            }))
          }
        />
        <input type="number" />
      </div>
    </div>
  );
}
/* <>
      <motion.div
        drag
        className="flex size-40 justify-center rounded-xl bg-red-300"
        dragMomentum={false}
        dragElastic={0}
        dragControls={controls}
        dragListener={false}
      >
        <div
          className="mx-auto h-fit cursor-grab bg-red-400 p-1 select-none"
          onPointerDown={(event) => controls.start(event)}
          style={{ touchAction: "none" }}
        >
          ...
        </div>
      </motion.div>
    </> */
