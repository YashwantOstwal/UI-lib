import Accordian, { type AccordianData } from "./accordian";
import StickyShowcaseProvider from "./sticky-showcase-provider";
const styles = [
  { backgroundColor: "#E7E7E7", height: 300 },
  { backgroundColor: "#D8D8D8", height: 400 },
  { backgroundColor: "#C9C9C9", height: 500 },
];

const features: AccordianData[] = [
  {
    title: "Prompt management across providers",
    description:
      "Centralize your prompts for all LLM providers in one intuitive workspace, eliminating fragmentation and ensuring consistency across your AI applications.",
  },
  {
    title: "Multi-modal and dynamic variables",
    description:
      "Test how your prompts perform with different inputs, images, and dynamic RAG context in real-time, identifying the optimal configurations for your specific use cases.Test how your prompts perform with different inputs, images, and dynamic RAG context in real-time, identifying the optimal configurations for your specific use cases.",
  },
  {
    title: "Automatic version history",
    description:
      "Never lose your work with comprehensive version tracking that captures every change, allowing you to compare iterations and revert to previous versions instantly.",
  },
];

export default function StickyShowcase() {
  return (
    <StickyShowcaseProvider>
      <div className="relative flex flex-col justify-between gap-2 lg:flex-row lg:items-end lg:gap-4">
        <div className="sticky top-0 z-20 lg:bottom-0 lg:flex-1">
          {features.map((eachFeature, index) => (
            <Accordian i={index} key={eachFeature.title} {...eachFeature} />
          ))}
        </div>
        <div className="z-10 lg:flex-1">
          {styles.map((style, i) => (
            <PlaceholderCard
              i={i}
              key={style.backgroundColor}
              style={{ ...style, marginBottom: "6px" }}
            />
          ))}
        </div>
      </div>
    </StickyShowcaseProvider>
  );
}
const PlaceholderCard = ({
  style,
  i,
}: {
  i: number;
  style?: React.CSSProperties;
}) => {
  return (
    <div
      className="p-7 opacity-85 sm:p-10"
      style={{ ...style }}
      data-stickyid={i}
    >
      <div className="relative size-full border border-dashed p-4 sm:p-5">
        <span className="absolute top-0.75 left-0.75 text-[9px] leading-none sm:text-[11px]">
          Sticky Cards
        </span>
        <div className="size-full p-3.5 sm:p-5">
          <div className="relative z-20 size-full border p-4 sm:px-6 sm:py-5">
            <span className="absolute top-0.75 left-0.75 text-[9px] leading-none sm:text-[11px]">
              Card #{i + 1}
            </span>
            <div className="relative grid size-full place-items-center overflow-hidden border border-dashed">
              <span className="absolute top-0.75 left-0.75 text-[9px] leading-none sm:text-[11px]">
                This is still a server component
              </span>
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
};
