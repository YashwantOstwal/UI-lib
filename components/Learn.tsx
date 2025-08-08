"use client";

import { useEffect, useRef, useState } from "react";
const allSuggestions = ["@google.com", "@yahoo.com", "@0mail.com"];
function Learn() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [trueValue, setTrueValue] = useState("");
  const caretPosition = useRef(0);
  const [suggestions, setSuggestions] = useState<
    { suggestion: string; snippetLen: number }[]
  >([]);
  const [suggestionsIndex, setSuggestionsIndex] = useState(0);

  const getSuggestions = (value: string) => {
    const temp: { suggestion: string; snippetLen: number }[] = [];
    if (value.length == 0) return temp;
    for (let i = 0; i < allSuggestions.length; i++) {
      for (
        let j = 0;
        j < allSuggestions[i].length - 1 && j <= value.length - 1;
        j++
      ) {
        if (allSuggestions[i].startsWith(value.slice(value.length - 1 - j))) {
          temp.push({
            suggestion: allSuggestions[i],
            snippetLen: allSuggestions[i].length - j - 1,
          });
        }
      }
    }
    return temp;
  };
  const handleChange = (e) => {
    console.log({
      value: e.target.value,
      suggestions: getSuggestions(e.target.value),
    });
    setTrueValue(e.target.value);
  };
  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   console.log(e.target.value.length);
  //   const realValue = value.slice(
  //     0,
  //     value.length - (suggestions[suggestionsIndex]?.snippetLen || 0),
  //   );
  //   caretPosition.current =
  //     caretPosition.current + realValue.length - trueValue.length;
  //   setSuggestions(getSuggestions(realValue));
  //   setTrueValue(realValue);
  // };
  // const handleKeyUp = (e) => {
  //   console.log("Triggered handleKeyup");
  //   caretPosition.current = e.currentTarget.selectionStart;
  //   if (caretPosition.current > trueValue.length) {
  //     setSuggestions(
  //       suggestions[suggestionsIndex].snippetLen -
  //       (caretPosition.current - trueValue.length);)
  //   }
  // };
  // useEffect(() => {
  //   if (inputRef.current) {
  //     inputRef.current.setSelectionRange(
  //       caretPosition.current,
  //       caretPosition.current,
  //     );
  //   }
  // }, [trueValue]);
  return (
    <div className="w-full max-w-[400px] bg-red-200">
      <input
        ref={inputRef}
        type="text"
        onChange={handleChange}
        // onKeyDown={handleKeyUp}
        onBlur={() => {}}
        // value={
        //   trueValue +
        //   (suggestions[suggestionsIndex]?.suggestion.slice(
        //     suggestions[suggestionsIndex].suggestion.length -
        //       suggestions[suggestionsIndex].snippetLen,
        //   ) || "")
        // }
        value={trueValue}
      />
    </div>
  );
}

export default Learn;
