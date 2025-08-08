"use client";
import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
type Props = {};

export default function Navbars2({}: Props) {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["20%", "33.34%"]);
  const paddingBlock = useTransform(scrollYProgress, [0, 1], ["5px", "7px"]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["50px", "0px"]);

  return (
    <div className="fixed top-5 flex h-[54px] w-1/3 items-center justify-around overflow-hidden rounded-[50px] bg-[#171717] px-3 text-xs font-medium">
      <Tab
        width={width}
        paddingBlock={paddingBlock}
        borderRadius={{
          borderTopRightRadius: borderRadius,
          borderBottomRightRadius: borderRadius,
        }}
      >
        Nexus
      </Tab>
      <Tab
        width={width}
        paddingBlock={paddingBlock}
        borderRadius={{
          borderTopRightRadius: borderRadius,
          borderBottomRightRadius: borderRadius,
          borderTopLeftRadius: borderRadius,
          borderBottomLeftRadius: borderRadius,
        }}
      >
        Vault
      </Tab>
      <Tab
        width={width}
        paddingBlock={paddingBlock}
        borderRadius={{
          borderTopLeftRadius: borderRadius,
          borderBottomLeftRadius: borderRadius,
        }}
      >
        My Projects
      </Tab>
    </div>
  );
}
function Tab({
  width,
  paddingBlock,
  borderRadius,
  children,
}: {
  width: MotionValue<string>;
  paddingBlock: MotionValue<string>;
  borderRadius: {
    borderTopRightRadius?: MotionValue<string>;
    borderBottomRightRadius?: MotionValue<string>;
    borderTopLeftRadius?: MotionValue<string>;
    borderBottomLeftRadius?: MotionValue<string>;
  };
  children: string;
}) {
  const mouseX = useSpring(0.5, { damping: 12 });
  const mouseY = useSpring(0.5, { damping: 12 });
  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };
  const handleMouseMove = (e: any) => {
    const { x, y, width, height } = e.target.getBoundingClientRect();
    const relativeX = (e.clientX - x) / width;
    const relativeY = (e.clientY - y) / height;
    mouseX.set(relativeX);
    mouseY.set(relativeY);
  };
  const x = useTransform(mouseX, [0, 1], ["-10px", "10px"]);
  const y = useTransform(mouseY, [0, 1], ["-5px", "5px"]);
  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="flex w-1/5 cursor-pointer items-center justify-center rounded-[50px] border-x border-[#171717] bg-[#dfdff2] text-nowrap text-[#171717]"
      style={{
        width,
        paddingBlock,
        ...borderRadius,
      }}
    >
      <motion.div style={{ x, y }}>{children}</motion.div>
    </motion.div>
  );
}
