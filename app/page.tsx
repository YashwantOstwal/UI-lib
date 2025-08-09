import Link from "next/link";
import * as motion from "motion/react-client";
// import Border from "./landing/Border";
import Roblox from "@/components/Roblox";
import Card from "@/components/cardd";

export default function Page() {
  return (
    <>
      {/* <Border /> */}
      <div className="relative -mx-3 lg:-mx-4">
        {/* <div
          className="absolute inset-0 z-10"
          style={
            {
              // backgroundImage:
              // "radial-gradient(100% 50% at 50% 0,#f5f5f5 6.32%,#eaeaea50 29.28%,#eaeaea 68.68%,#f5f5f5 100%)",
              // maskImage:
              //   "radial-gradient(50% 50% at 50% 50%,rgba(0,0,0,1),rgba(0,0,0,0.1))",
            }
          }
        ></div> */}
        <div className="relative z-20 flex flex-col items-center pt-36 pb-12">
          <div className="font-geist-mono mb-8 flex items-center text-sm leading-5 tracking-normal text-gray-600">
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
              className="bg-gray-600/40"
            >
              &nbsp;
            </motion.div>
          </div>
          <h1 className="mb-4 text-center text-5xl font-semibold tracking-tight text-pretty text-gray-900">
            Reusable Motion
            <br />
            components for React
          </h1>
          <p className="mb-6 max-w-[550px] text-center text-pretty text-gray-600">
            Smooth, animated components inspired by the best, crafted to elevate
            your React UI.
          </p>
          <div className="flex items-center gap-2 text-sm">
            <a href="#components">
              <motion.div
                initial={{ backgroundColor: "#c1c1c1" }}
                whileHover={{ backgroundColor: "#cdcdcd" }}
                whileFocus={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "anticipate" }}
                className="rounded-[10px] border border-[#E8E8E8] bg-[image:linear-gradient(#E8E8E8_0%,#d8d8d8_100%)] px-3.5 py-2 font-medium text-gray-900 shadow-[0px_1px_4px_-1px_rgba(30,_31,_37,_0.38)]"
              >
                Browse Components
              </motion.div>
            </a>
            <Link
              href=""
              className="rounded-lg px-3 py-2 text-sm underline hover:bg-[#EDEDED]"
            >
              Lastly added 3 hours ago
            </Link>
          </div>
        </div>
      </div>
      <Roblox />
      <div
        id="card-container"
        className="mx-auto grid max-w-3xl grid-cols-1 gap-x-3 gap-y-2.5 py-10 sm:grid-cols-2"
      >
        {[
          { name: "Motion toolbar", href: "/components/motion-toolbar" },
          { name: "Parallax cards", href: "/components/parallax-cards" },
          {
            name: "Parallax container",
            href: "/components/parallax-container",
          },
          { name: "Text Switcher", href: "/components/text-switcher" },
          { name: "In-page navbar", href: "/components/in-page-navbar" },
        ].map((props) => (
          <Card key={props.href} {...props} />
        ))}
      </div>
    </>
  );
}
