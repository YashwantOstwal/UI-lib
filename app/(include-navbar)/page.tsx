import * as motion from "motion/react-client";
import Card from "@/components/card";

export default function Page() {
  return (
    <div className="pt-6">
      <div className="flex flex-col items-center px-2">
        <div className="text-muted-foreground flex items-center text-center font-mono leading-5 tracking-normal">
          New component every 72 hours&nbsp;
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [null, 1, 1, 0] }}
            transition={{
              repeatDelay: 1,
              duration: 1,
              times: [0, 0, 1, 1],
              repeat: Infinity,
            }}
            className="bg-muted-foreground/40"
          >
            &nbsp;
          </motion.div>
        </div>
        <h1 className="mt-8 text-center text-[clamp(0px,_9vw,_50px)] leading-none font-semibold tracking-tight text-pretty">
          Reusable Motion
          <br />
          components for React
        </h1>
        <p className="text-muted-foreground mt-7 max-w-[550px] text-center text-lg text-pretty max-sm:leading-snug">
          Smooth, animated components inspired by the best, crafted to elevate
          your React UI.&nbsp;
        </p>
      </div>
      {/* <Roblox /> */}
      <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-x-3 gap-y-2.5 sm:grid-cols-2">
        {[
          { name: "Parallax cards", href: "/components/parallax-cards" },
          {
            name: "Spinning carousel",
            href: "/components/spinning-carousel",
          },
          { name: "Motion dock", href: "/components/motion-dock" },
          { name: "In-page navbar", href: "/components/in-page-navbar" },
          {
            name: "Parallax container",
            href: "/components/parallax-container",
          },
          { name: "Text switcher", href: "/components/text-switcher" },
          { name: "Menu wheel", href: "/components/menu-wheel" },
          { name: "Morph modal", href: "/components/morph-modal" },
          { name: "Sticky showcase", href: "/components/sticky-showcase" },
          { name: "Mask text server", href: "/components/mask-text-server" },
        ].map((props) => (
          <Card key={props.href} {...props} />
        ))}
      </div>
    </div>
  );
}
