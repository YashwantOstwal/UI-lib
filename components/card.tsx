import Link from "next/link";
import * as motion from "motion/react-client";
import ComponentIcon from "@/icons/component.icon";
import CodeIcon from "@/icons/code.icon";
import { type ImageProps } from "next/image";
const lineDrawVariants = {
  initial: { pathLength: 1 },
  whileHover: {
    pathLength: [0, 1],
  },
};
const lineDrawTransition = { duration: 0.8 }; // add easeInOut
interface CardProps {
  name: string;
  href: string;
  imgProps?: ImageProps;
}
const Card = ({ name, href }: CardProps) => (
  <div className="bg-card rounded-[14px] p-1 shadow-[0px_0px_1px_0px_rgba(25,28,33,0.06),0px_5px_10px_-2px_rgba(106,115,133,0.12),0px_2px_6px_-2px_rgba(0,0,0,0.12)] dark:shadow-[0_-1px_rgba(255,255,255,0.06),0_4px_8px_rgba(0,0,0,0.05),0_0_0_1px_rgba(255,255,255,0.1),0_1px_6px_-4px_#000]">
    <div className="border-border/40 bg-muted relative grid aspect-[1.66] place-items-center rounded-[10px] border">
      {/* <span className="absolute top-2 left-2 text-base leading-none"> */}
      {name}
      {/* </span> */}
    </div>
    <Link
      href={href}
      // className="focus-visible:!outline-2 focus-visible:!outline-offset-2 focus-visible:!outline-[red]"
    >
      <motion.div
        initial="initial"
        whileHover="whileHover"
        // transition={{ duration: 0.2, ease: "easeInOut" }}
        // variants={{
        //   initial: {
        //     backgroundImage: "linear-gradient(#E8E8E8 0%,#d8d8d8 100%)",
        //   },
        //   whileHover: {
        //     backgroundImage: "linear-gradient(#E8E8E8 0%,#e4e4e4 100%)",
        //   },
        // }}

        className="from-secondary to-secondary-70 text-secondary-foreground border-secondary/70 mt-1 flex items-center justify-center rounded-[10px] border bg-gradient-to-b via-50% px-3.5 py-2 text-lg [&>svg]:size-5"
      >
        <ComponentIcon
          variants={lineDrawVariants}
          transition={lineDrawTransition}
        />
        &nbsp;+&nbsp;
        <CodeIcon variants={lineDrawVariants} transition={lineDrawTransition} />
      </motion.div>
    </Link>
  </div>
);

export default Card;
