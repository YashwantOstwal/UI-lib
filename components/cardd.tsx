import Link from "next/link";
import * as motion from "motion/react-client";
import ComponentIcon from "./icons/component.icon";
import CodeIcon from "./icons/code.icon";
import Image, { type ImageProps } from "next/image";
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
const Card = ({ name, href, imgProps }: CardProps) => (
  <div
    className="rounded-[14px] bg-white p-1"
    style={{
      boxShadow:
        " rgba(25, 28, 33, 0.06) 0px 0px 0px 1px, rgba(106, 115, 133, 0.12) 0px 5px 10px -2px, rgba(0, 0, 0, 0.12) 0px 2px 6px -2px",
    }}
  >
    <div
      id="image-container"
      className="relative aspect-[1.66] rounded-[10px] border border-[#E8E8E8] bg-[#f2f2f3]"
    >
      <span className="absolute top-2 left-2 text-[15px] leading-none">
        {name}
      </span>
    </div>
    <Link href={href} prefetch={false}>
      <motion.div
        initial="initial"
        whileHover="whileHover"
        className="mt-1 flex items-center justify-center rounded-[10px] border border-[#E8E8E8] bg-[image:linear-gradient(#E8E8E8_0%,#d8d8d8_100%)] px-3.5 py-2 hover:bg-[image:linear-gradient(#E8E8E8_0%,#e4e4e4_100%)]"
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
