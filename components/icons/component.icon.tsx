import { Transition, Variants } from "motion";
import * as motion from "motion/react-client";

const ComponentIcon = (pathProps: {
  variants: Variants;
  transition: Transition;
}) => (
  <svg
    xmlnsXlink="http://www.w3.org/1999/xlink"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <motion.path
      {...pathProps}
      stroke="#141414"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5px"
      d="M19.25 10.25v-1.5a2 2 0 0 0-2-2H6.75a2 2 0 0 0-2 2v4.5a2 2 0 0 0 2 2h4.5m3.5-3.5 1.275 5.5.975-2.085 2.25-.647-4.5-2.768Z"
      fill="none"
    ></motion.path>
  </svg>
);
export default ComponentIcon;
