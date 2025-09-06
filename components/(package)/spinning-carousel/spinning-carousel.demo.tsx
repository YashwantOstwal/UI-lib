import { SpinningCarousel } from "./spinning-carousel";

export function SpinningCarouselDemo() {
  return (
    <SpinningCarousel className="mt-16">
      {testimonials.map((t) => (
        <TestimonialCard key={t.name} {...t} />
      ))}
    </SpinningCarousel>
  );
}

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "This SaaS cut our onboarding time from days to hours, all without messy spreadsheets.",
    name: "Sarah Mitchell",
    role: "Operations Manager at FlowBridge",
    avatar: "#FCA5A5",
  },
  {
    quote:
      "The dashboard delivers real-time insights, helping us make faster, smarter decisions.",
    name: "James Carter",
    role: "CEO at BrightPath",
    avatar: "#93C5FD",
  },
  {
    quote:
      "We replaced three tools with this one. It’s clean, intuitive, and a joy to use.",
    name: "Priya Desai",
    role: "Product Lead at QuantumEdge",
    avatar: "#A5B4FC",
  },
  {
    quote:
      "Setup took less than a day, and productivity improved immediately across teams.",
    name: "Daniel Kim",
    role: "CTO at Nexora",
    avatar: "#FDBA74",
  },
  {
    quote:
      "Support is fast, friendly, and the product keeps getting better with each update.",
    name: "Elena Rodriguez",
    role: "Head of Marketing at OrbitIQ",
    avatar: "#86EFAC",
  },
];

const TestimonialCard = ({ quote, name, role, avatar }: Testimonial) => (
  <div className="bg-card text-card-foreground flex flex-col justify-between gap-10 rounded-3xl px-5 py-4 shadow-[0px_8px_12px_-4px_rgba(15,12,12,0.08),0px_0px_2px_0px_rgba(15,12,12,0.10),0px_1px_2px_0px_rgba(15,12,12,0.10)] lg:px-7 lg:py-6 dark:shadow-[0_4px_12px_rgba(0,0,0,0.35),0_1px_rgba(255,255,255,0.05)_inset]">
    <p className="-indent-[6px] text-lg leading-snug font-medium sm:text-xl lg:-indent-2 lg:text-2xl">
      &quot;{quote}&quot;
    </p>
    <div className="flex items-center gap-4">
      <div
        className="aspect-square w-12 rounded-full"
        style={{ backgroundColor: avatar }}
      />

      <div>
        <p className="text-base font-medium">{name}</p>
        <p className="text-muted-foreground text-sm">{role}</p>
      </div>
    </div>
  </div>
);
