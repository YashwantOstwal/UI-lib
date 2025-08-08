"use client";
import { Transition, DOMKeyframesDefinition } from "motion/react";
import { motion } from "motion/react";
import { useState } from "react";

export default function TubelightText({
  maxDuration = 0.75,
  text = "Local Partner",
}: {
  maxDuration?: number;
  text?: string;
}) {
  const [state, setState] = useState(false);
  const handleClick = () => setState((prev) => !prev);

  return (
    <>
      <motion.div
        initial="initial"
        whileHover="whileHover"
        key={String(state)}
        className="flex max-w-[400px] flex-wrap text-6xl font-bold uppercase"
      >
        {text.split(" ").map((word, i) => (
          <div
            key={`words[${i}]=${word}`}
            className="flex flex-nowrap text-nowrap whitespace-pre after:content-['\00a0']"
          >
            {word.split("").map((letter, j) => {
              const duration = Math.random() * maxDuration;
              const delay = maxDuration - duration;
              const animation: DOMKeyframesDefinition = {};
              const transition: Transition = {
                duration,
                delay,
              };
              if (duration > (maxDuration * 85) / 100) {
                console.log(letter);
                animation.opacity = [null, 0.5, 0, 0, 1];
                // transition.times = [0, 0.4, 0.4, 0.5, 1];
              } else {
                animation.opacity = 1;
              }

              return (
                <motion.div
                  key={`${word}.chatAt(${j})=${letter}`}
                  variants={{
                    initial: {
                      opacity: 0,
                    },
                    whileHover: { opacity: 1, transition },
                  }}
                >
                  {letter}
                </motion.div>
              );
            })}
          </div>
        ))}
      </motion.div>
      <button onClick={handleClick}>Click me</button>
    </>
  );
}
