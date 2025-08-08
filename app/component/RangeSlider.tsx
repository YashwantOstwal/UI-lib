"use client";
export default function RangeSlider({}) {
  return (
    <>
      <style>{`
    .range-slider {
      appearance: none;
      width: 100%;
      height: 6px;
      background: red;
      border-radius: 9999px;
      outline: none;
    }

    .range-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 16px;
      height: 16px;
      border-radius: 100%;
      cursor: grab;
    }

    .range-slider::-moz-range-thumb {
      width: 16px;
      height: 16px;
      border-radius: 9999px;
      background: red;
      cursor: pointer;
      border: none;
    }
  `}</style>
      <div className="max-w-[320px]">
        {/* <input
          type="range"
          min={-10}
          max={10}
          defaultValue={0}
          className="range-slider"
          onChange={(e) => console.log(e.target.value)}
          step={1}
        /> */}
        <input
          type="color"
          onChange={(e) => console.log({ color: e.target.value })}
        />
      </div>
    </>
  );
}
