import TextSwitcher from "./index";

export default function TextSwitcherDemo() {
  return (
    <div className="text-sm text-gray-900 sm:text-base md:text-xl lg:text-2xl">
      As someone who styles divs and <br className="md:hidden" /> solves
      backend&nbsp;
      <br className="max-md:hidden" />
      nightmares, I write <br className="md:hidden" />
      code that&nbsp;
      <TextSwitcher
        words={["compiles", "ships", "breaks", "runs anyway"]}
        className="font-medium"
        dotRestColor="#101828"
        dotMotionColor="#FB2C36"
      />
    </div>
  );
}
