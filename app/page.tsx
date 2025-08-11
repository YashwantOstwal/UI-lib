import * as motion from "motion/react-client";
import Card from "@/components/cardd";

export default function Page() {
  return (
    <>
      <div className="pt-36 pb-24">
        <div className="flex flex-col items-center">
          <div className="font-geist-mono flex items-center leading-5 tracking-normal text-gray-700">
            New component every 48 hours&nbsp;
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [null, 1, 1, 0] }}
              transition={{
                repeatDelay: 1,
                duration: 1,
                times: [0, 0, 1, 1],
                repeat: Infinity,
              }}
              className="bg-gray-700/40"
            >
              &nbsp;
            </motion.div>
          </div>
          <h1 className="mt-8 text-center text-[clamp(0px,_7vw,_50px)] leading-none font-semibold tracking-tight text-pretty text-gray-900">
            Reusable Motion
            <br />
            components for React
          </h1>
          <p className="mt-7 max-w-[550px] text-center text-lg text-pretty text-gray-700">
            Smooth, animated components inspired by the best, crafted to elevate
            your React UI. <a>Lastly added 3 hours ago</a>
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-x-3 gap-y-2.5 sm:grid-cols-2">
          {[
            { name: "Motion toolbar", href: "/components/motion-toolbar" },
            { name: "Parallax cards", href: "/components/parallax-cards" },
            {
              name: "Parallax container",
              href: "/components/parallax-container",
            },
            { name: "Text Switcher", href: "/components/text-switcher" },
            { name: "In Page Navbar", href: "/components/in-page-navbar" },
          ].map((props) => (
            <Card key={props.href} {...props} />
          ))}
        </div>
      </div>
    </>
  );
}
