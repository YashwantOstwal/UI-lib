import { ComponentProps } from "react";
import { PlusIcon } from "lucide-react";
import Accordian, { type AccordianData } from "./accordian";
import StickyShowcaseProvider from "./sticky-showcase-provider";

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
      <div className="relative mt-12 flex flex-col justify-between gap-2 lg:flex-row lg:items-end lg:gap-4">
        <div className="sticky top-0 z-20 lg:bottom-0 lg:flex-1">
          {features.map((eachFeature, index) => (
            <Accordian i={index} key={eachFeature.title} {...eachFeature} />
          ))}
        </div>
        <div className="z-10 lg:flex-1">
          <PlaceholderCard index={0} data-stickyid={0} />
          <PlaceholderCard index={1} data-stickyid={1} />
          <PlaceholderCard index={2} data-stickyid={2} />
        </div>
      </div>
    </StickyShowcaseProvider>
  );
}
function PlaceholderCard({
  index = 0,
  ...rest
}: { index?: number } & ComponentProps<"div">) {
  function Message({ children }: { children: string }) {
    return (
      <span className="absolute top-0.75 left-0.75 text-[9px] leading-none sm:text-xs">
        {children}
      </span>
    );
  }
  return (
    <div
      className="mb-6 p-7 opacity-85 sm:p-10"
      style={{
        backgroundColor: `var(--chart-${index + 1})`,
        height: (index + 3) * 100,
      }}
      {...rest}
    >
      <div className="border-foreground relative size-full border border-dashed p-4 sm:p-5">
        <Message>Sticky Cards</Message>
        <div className="size-full p-3.5 sm:p-5">
          <div className="border-foreground relative z-20 size-full border p-4 sm:px-6 sm:py-5">
            <Message>{`Card # ${index + 1}`}</Message>
            <div className="border-foreground relative grid size-full place-items-center overflow-hidden border border-dashed">
              <Message>This is still a server component</Message>
              <PlusIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
