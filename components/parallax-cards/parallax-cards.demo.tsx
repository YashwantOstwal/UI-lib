import ParallaxCards from "./index";

export default function ParallaxCardsDemo() {
  const shadesOfGray = ["#E7E7E7", "#D8D8D8", "#C9C9C9", "#BABABA", "#ABABAB"];
  return (
    <ParallaxCards maxStackedCards={3} top="50px">
      {shadesOfGray.map((backgroundColor, i) => (
        <PlaceHolderCard
          key={`placeholderCards[${i}]`}
          style={{ backgroundColor }}
          sNo={i + 1}
        />
      ))}
    </ParallaxCards>
  );
}

const PlaceHolderCard = ({
  style,
  sNo,
}: {
  style: React.CSSProperties;
  sNo: number;
}) => (
  <div
    className="size-full p-7 opacity-85 sm:p-10"
    style={{ ...style, height: "500px" }}
  >
    <div className="relative size-full border border-dashed p-4 sm:p-5">
      <span className="absolute top-0.75 left-0.75 text-[9px] leading-none sm:text-[11px]">
        Parallax Cards
      </span>
      <div className="size-full p-3.5 sm:p-5">
        <div className="relative z-20 size-full border p-4 sm:px-6 sm:py-5">
          <span className="absolute top-0.75 left-0.75 text-[9px] leading-none sm:text-[11px]">
            Card #{sNo}
          </span>
          <div className="relative grid size-full place-items-center overflow-hidden border border-dashed">
            <svg
              data-icon="+"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="#141414"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5px"
                d="M12 5.75V18.25"
                fill="none"
              ></path>
              <path
                stroke="#141414"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5px"
                d="M18.25 12L5.75 12"
                fill="none"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
);
