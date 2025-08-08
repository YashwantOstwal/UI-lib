"use client";

import { motion, useAnimate, useMotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
const allSuggestions = ["@google.com", "@yahoo.com", "@0mail.com"];

type InputValue = {
  trueValue: string;
  renderedSuggestion: string;
  fullValue: string;
  fullSuggestion: string;
  renderedSuggestionStartIndex: number | null;
};

interface Suggestion {
  fullSuggestion: string;
  renderedSuggestion: string;
  renderedSuggestionStartIndex: number;
}
export default function Input() {
  const inputRef = useRef<HTMLInputElement>(null);
  const characters = useRef<HTMLDivElement[]>([]);
  const [backgroundRef, animateBackground] = useAnimate();

  const x = useMotionValue(0);
  const [value, setValue] = useState<InputValue>({
    trueValue: "",
    renderedSuggestion: "",
    fullValue: "",
    fullSuggestion: "",
    renderedSuggestionStartIndex: null,
  });

  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const temp = useRef(false);
  const [caretPosition, setCaretPosition] = useState<number>(0);
  const getSuggestions = (value: string) => {
    const temp: Suggestion[] = [];
    if (value.length == 0) return temp;
    for (const eachSuggestion of allSuggestions) {
      for (
        let j = 0;
        j < eachSuggestion.length - 1 && j <= value.length - 1;
        j++
      ) {
        if (eachSuggestion.startsWith(value.slice(value.length - 1 - j))) {
          temp.push({
            fullSuggestion: eachSuggestion,
            renderedSuggestion: eachSuggestion.slice(j + 1),
            renderedSuggestionStartIndex: value.length - 1 - j,
          });
        }
      }
    }
    return temp;
  };
  const handleChange = (e) => {
    if (!temp.current) temp.current = true;
    const newFullValue = e.currentTarget.value;
    const newCaretPosition = e.currentTarget.selectionStart;
    const newTrueValue = newFullValue.slice(
      0,
      newFullValue.length - value.renderedSuggestion.length,
    );
    const suggestions = getSuggestions(newTrueValue);
    setSuggestions(suggestions);
    setValue({
      trueValue: newTrueValue,
      renderedSuggestion: suggestions[0]?.renderedSuggestion || "",
      fullValue: newTrueValue + (suggestions[0]?.renderedSuggestion || ""),
      fullSuggestion: suggestions[0]?.fullSuggestion || "",
      renderedSuggestionStartIndex:
        suggestions[0]?.renderedSuggestionStartIndex ?? null,
    });
    setCaretPosition(newCaretPosition);
  };
  const handleKeyUp = (e) => {
    //you enter handleKeyUp after performing the updates...any state value updated by onchange accessed here will be consistent

    // console.log(e.currentTarget.selectionStart);
    // e.currentTarget.selectionStart
    // you get the new in up and old in down

    if (temp.current) {
      temp.current = false;
      return;
    }
    if (e.currentTarget.selectionStart <= value.trueValue.length) {
      return;
    }
    const newTrueValue = value.fullValue.slice(
      0,
      e.currentTarget.selectionStart,
    );
    const newCaretPosition = e.currentTarget.selectionStart;
    setCaretPosition(newCaretPosition);
    const suggestions = getSuggestions(newTrueValue);
    setSuggestions(suggestions);
    setSuggestionIndex(0);
    setValue({
      trueValue: newTrueValue,
      renderedSuggestion: suggestions[0]?.renderedSuggestion || "",
      fullValue: newTrueValue + (suggestions[0]?.renderedSuggestion || ""),
      fullSuggestion: suggestions[0]?.fullSuggestion || "",
      renderedSuggestionStartIndex:
        suggestions[0]?.renderedSuggestionStartIndex ?? null,
    });
  };
  const handleBlur = (e) => {
    setValue((prev) => ({
      ...prev,
      fullValue: prev.trueValue,
      fullSuggestion: "",
      renderedSuggestion: "",
      renderedSuggestionStartIndex: null,
    }));
    setCaretPosition(e.currentTarget.selectionStart);
  };

  useEffect(() => {
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.setSelectionRange(caretPosition, caretPosition);
      // if (caretPosition === value.fullValue.length) {
      //   inputElement.scrollTo({
      //     left: 0,
      //   });
      // }
    }
  }, [caretPosition]);
  useEffect(() => {
    const handleScroll = () => {
      if (inputRef.current) {
        x.set(-1 * inputRef.current.scrollLeft);
      }
    };
    if (inputRef.current) {
      inputRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (backgroundRef.current === null) return;
    if (value.renderedSuggestionStartIndex !== null) {
      const { left } = backgroundRef.current.getBoundingClientRect() as DOMRect;
      const { left: characterLeft } = characters.current[
        value.renderedSuggestionStartIndex
      ].getBoundingClientRect() as DOMRect;
      const clipPathLeft = characterLeft - left;
      const enterAnimation = async () => {
        await animateBackground(
          backgroundRef.current,
          { clipPath: `inset(0px 0px 0px ${clipPathLeft}px)` },
          { duration: 0 },
        );
        await animateBackground(
          backgroundRef.current,
          { opacity: 1 },
          { duration: 1 },
        );
      };
      enterAnimation();
    } else {
      const exitAnimation = async () => {
        await animateBackground(backgroundRef.current, { opacity: 0 });
      };
      exitAnimation();
    }
  }, [value.renderedSuggestionStartIndex]);

  const handleKeyDown = (e) => {
    if (e.shiftKey && e.key === "Enter") {
      setSuggestions;
    }
  };
  return (
    <div className="overflow- relative w-full max-w-[100px] overflow-hidden">
      <motion.div
        ref={backgroundRef}
        style={{ x }}
        className="white-space-pre absolute inset-y-0 left-0 z-10 w-fit bg-neutral-300 whitespace-pre text-transparent opacity-0"
      >
        {value.fullValue}
      </motion.div>
      <input
        ref={inputRef}
        type="text"
        placeholder="type"
        value={value.fullValue}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        onMouseUp={handleKeyUp}
        onBlur={handleBlur}
        className="relative z-20 size-full border-b border-black text-transparent caret-amber-600 outline-none selection:bg-amber-200"
      />
      <motion.div
        style={{ x }}
        className="pointer-events-none absolute inset-y-0 left-0 z-30 w-fit whitespace-pre text-black"
      >
        <div className="flex w-fit">
          {value.trueValue.split("").map((eachCharacter, i) => (
            <div
              key={i}
              ref={(ref) => {
                if (ref) {
                  characters.current[i] = ref;
                }
              }}
            >
              {eachCharacter}
            </div>
          ))}
          <div className="opacity-40">{value.renderedSuggestion}</div>
        </div>
      </motion.div>
    </div>
  );
}
