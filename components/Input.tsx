"use client";

import { motion, useAnimate, useMotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
const allSuggestions = ["@google.com", "@yahoo.com", "@0mail.com"];

type InputValue = {
  trueValue: string;
};

interface Suggestion {
  fullSuggestion: string;
  renderedSuggestion: string;
  renderedSuggestionStartIndex: number | null;
}
const DEFAULT_SUGGESTION = {
  fullSuggestion: "",
  renderedSuggestion: "",
  renderedSuggestionStartIndex: null,
};
export default function Input() {
  const inputRef = useRef<HTMLInputElement>(null);
  const characters = useRef<HTMLDivElement[]>([]);
  const [backgroundRef, animateBackground] = useAnimate();

  const x = useMotionValue(0);
  const [trueValue, setTrueValue] = useState<string>("");

  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    DEFAULT_SUGGESTION,
  ]);
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
      newFullValue.length -
        (suggestions[suggestionIndex].renderedSuggestion.length ?? 0),
    );
    const newSuggestions = getSuggestions(newTrueValue);
    if (newSuggestions.length) {
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([DEFAULT_SUGGESTION]);
    }
    setTrueValue(newTrueValue);
    setCaretPosition(newCaretPosition);
    setSuggestionIndex(0);
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
    if (e.shiftKey && e.key === "Enter") {
      console.log("rendered");
      setSuggestionIndex((prev) => (prev + 1) % suggestions.length);
      return;
    }
    if (e.currentTarget.selectionStart > trueValue.length) {
      const newTrueValue = (
        trueValue + suggestions[suggestionIndex].renderedSuggestion
      ).slice(0, e.currentTarget.selectionStart);
      const newCaretPosition = e.currentTarget.selectionStart;
      setCaretPosition(newCaretPosition);
      const newSuggestions = getSuggestions(newTrueValue);
      if (newSuggestions.length) {
        setSuggestions(newSuggestions);
      } else {
        setSuggestions([DEFAULT_SUGGESTION]);
      }
      setSuggestionIndex(0);
      setTrueValue(newTrueValue);
    }
  };
  const handleBlur = (e) => {
    setSuggestions([DEFAULT_SUGGESTION]);
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
  }, [caretPosition, suggestionIndex]);
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
    if (suggestions[suggestionIndex].renderedSuggestionStartIndex !== null) {
      const { left } = backgroundRef.current.getBoundingClientRect() as DOMRect;
      const { left: characterLeft } = characters.current[
        suggestions[suggestionIndex].renderedSuggestionStartIndex
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
  }, [suggestions[suggestionIndex].renderedSuggestionStartIndex]);

  // const handleKeyDown = (e) => {

  // };
  return (
    <div className="overflow- relative w-full max-w-[100px] overflow-hidden">
      <motion.div
        ref={backgroundRef}
        style={{ x }}
        className="white-space-pre absolute inset-y-0 left-0 z-10 w-fit bg-neutral-300 whitespace-pre text-transparent opacity-0"
      >
        {trueValue + suggestions[suggestionIndex].renderedSuggestion}
      </motion.div>
      <input
        ref={inputRef}
        type="text"
        placeholder="type"
        value={trueValue + suggestions[suggestionIndex].renderedSuggestion}
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
          {trueValue.split("").map((eachCharacter, i) => (
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
          <div className="opacity-40">
            {suggestions[suggestionIndex].renderedSuggestion}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
