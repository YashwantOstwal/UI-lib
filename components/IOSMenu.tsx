"use client";

import { useState } from "react";
import { motion } from "motion/react";
export default function IOSMenu() {
  const [state, setState] = useState(false);
  return (
    <div className="bg-cyan-400">
      <motion.div
        animate={{
          scale: state ? 0.95 : 1,
        }}
        className="flex flex-col bg-red-300"
      >
        <motion.button
          onClick={() => setState(!state)}
          className="relative z-40 w-[250px] cursor-pointer bg-red-400"
          animate={{
            scale: state ? 1 / 0.95 : 1,
          }}
        >
          <span className="">ELEMENT 4</span>
          {state && (
            <motion.div
              initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              className="absolute inset-x-0 top-full bg-red-400 text-nowrap whitespace-nowrap"
            >
              <div>SUB-ITEM OF ELEMENT 1</div>
              <div>SUB-ITEM OF ELEMENT 4</div>
            </motion.div>
          )}
        </motion.button>
        <motion.button
          className="relative z-30"
          animate={{ opacity: state ? 0.75 : 1 }}
        >
          ELEMENT 1
        </motion.button>
        <motion.button
          className="relative z-20"
          animate={{ opacity: state ? 0.75 : 1 }}
        >
          ELEMENT 2
        </motion.button>
        <motion.button
          className="relative z-10"
          animate={{ opacity: state ? 0.75 : 1 }}
        >
          ELEMENT 3
        </motion.button>
      </motion.div>
    </div>
  );
}
