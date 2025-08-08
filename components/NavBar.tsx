"use client";
import {
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  CSSProperties,
  useEffect,
} from "react";
import { motion, AnimatePresence, useAnimate } from "motion/react";

export default function NavBars() {
  return (
    <div className="font-poppins relative z-50 mx-auto flex w-2/5 items-center justify-between rounded-lg bg-gray-900 px-4 py-3 text-xs font-medium">
      <DropDown />
      <Tabs />
    </div>
  );
}
function Tabs() {
  const [active, setActive] = useState(-1);
  const routes = ["Nexus", "Vault", "About"];
  return (
    <div className="flex gap-2" onMouseLeave={() => setActive(-1)}>
      {routes.map((eachRoute, index) => (
        <Tab
          key={eachRoute + index}
          id={index}
          state={active}
          setState={setActive}
        >
          {eachRoute}
        </Tab>
      ))}
    </div>
  );
}
function Tab({ children, state, setState, id }) {
  return (
    <div className="relative">
      <motion.div
        initial={false}
        // animate={{ color: state === id ? "#171717" : "#DFDFF2" }}
        style={{ padding: state === id ? "5px 16px" : "5px 10px" }}
        onMouseEnter={() => setState(id)}
        className="flex cursor-pointer items-center justify-center gap-0.5 rounded-full bg-[#dfdff2] px-2.5 text-[#171717]"
      >
        <AnimatePresence mode="popLayout">
          <motion.div layout className="z-20">
            {children}
          </motion.div>
          {state != id && <RouteArrowSVG />}
        </AnimatePresence>
      </motion.div>
      {state === id && (
        <motion.div
          className="absolute inset-0 z-10 rounded-full bg-gray-300"
          layoutId="activeTab"
        />
      )}
    </div>
  );
}

let controlInterval: NodeJS.Timeout;
function DropDown() {
  const [openDropDown, setOpenDropDown] = useState(false);
  const dropDownItems = [
    { name: "Item 1", description: "Description for Item 1." },
    { name: "Item 2", description: "Description for Item 2." },
    { name: "Item 3", description: "Description for Item 3." },
  ];
  const [scopeText, animateText] = useAnimate();
  // const [scopeBackground, animateBackground] = useAnimate();

  const handleMouseEnter = () => {
    if (openDropDown) return; //animate and attempt to update the state only when the state is false
    clearInterval(controlInterval);
    setOpenDropDown(true);
    animateText(
      scopeText.current,
      {
        y: ["0", "50%", "-50%", "0"],
        opacity: [1, 0, 0, 1],
      },
      {
        y: { times: [0, 0.35, 0.35, 1], duration: 0.2 },
        opacity: { times: [0, 0.5, 0.5, 1], duration: 0.2 },
      },
    );
    // animateBackground(
    //   scopeBackground.current,
    //   {
    //     rotateY: "20deg",
    //     insetBlock: "0px",
    //     insetInline: "5px",
    //     borderRadius: "7px",
    //     skew: "3deg",
    //   },
    //   { type: "spring" },
    // );
  };
  const handleMouseLeave = async () => {
    if (!openDropDown) return;
    controlInterval = setTimeout(() => {
      setOpenDropDown(false);
      animateText(
        scopeText.current,
        {
          y: ["0", "-50%", "50%", "0"],
          opacity: [1, 0, 0, 1],
        },
        {
          y: { times: [0, 0.35, 0.35, 1], duration: 0.2 },
          opacity: { times: [0, 0.5, 0.5, 1], duration: 0.2 },
        },
      );
      // animateBackground(
      //   scopeBackground.current,
      //   {
      //     insetBlock: "2px",
      //     insetInline: "0px",
      //     borderRadius: "30px",
      //     rotateY: "0deg",
      //     skew: "0deg",
      //   },
      //   { type: "spring" },
      // );
    }, 500);
  };

  return (
    <>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative z-10 flex cursor-pointer items-center justify-center gap-0.5 rounded-full bg-[#dfdff2] px-[10px] py-[6px]"
      >
        {/* <motion.div
          ref={scopeBackground}
          style={{
            position: "absolute",
            insetBlock: "2px",
            insetInline: "0px",
            backgroundColor: "#dfdff2",
            borderRadius: "30px",
          }}
        /> */}
        <motion.p ref={scopeText} className="relative z-20">
          Products
        </motion.p>
        <DropDownArrowSVG className="relative z-20" rotate={openDropDown} />
      </div>
      <AnimatePresence>
        {openDropDown && (
          <motion.div
            initial={{ opacity: 0, top: "100%" }}
            animate={{ opacity: 1, top: "105%" }}
            exit={{ opacity: 0, top: "100%" }}
            transition={{ type: "linear", duration: 0.2 }}
            className="absolute left-4 z-10 grid aspect-[1.5] w-64 grid-rows-3 gap-1.5 overflow-hidden rounded-lg bg-gray-900 p-1.5"
          >
            {dropDownItems.map((eachItem) => (
              <DropDownItem
                key={eachItem.name}
                item={eachItem}
                handleMouseLeave={handleMouseLeave}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
function DropDownArrowSVG({
  rotate = false,
  className,
}: {
  rotate?: boolean;
  className?: string;
}) {
  return (
    <motion.svg
      className={className}
      animate={{ rotateZ: rotate ? "90deg" : "0deg" }}
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
      data-v-5e776d00=""
      aria-hidden="true"
      width="10px"
      height="10px"
    >
      <defs>
        <symbol viewBox="0 0 20 20" id="icon-arrow-right" fill="#DFDFF2">
          <path
            d="M17.5 10.0013L2.5 18.3346L6.9697 10.0013L2.5 1.66797L17.5 10.0013Z"
            fill="#171717"
          ></path>
        </symbol>
      </defs>
      <use href="#icon-arrow-right"></use>
    </motion.svg>
  );
}
function RouteArrowSVG() {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
      data-v-e9efd6ee=""
      aria-hidden="true"
      width="10px"
      height="10px"
    >
      <defs>
        <symbol viewBox="0 0 10.11 6.27" id="icon-arrow-up-right" fill="000000">
          <path
            d="m10.07,0h.04c-1.35,2.09-2.69,4.18-4.03,6.27-.17-.91-.35-1.82-.53-2.73,0-.03-.02-.04-.04-.05-1.84,0-3.67,0-5.51,0,1.83-.64,3.66-1.27,5.49-1.9,1.53-.52,3.05-1.06,4.58-1.59Z"
            fill="#dfdff2"
          ></path>
        </symbol>
      </defs>
      <use href="#icon-arrow-up-right"></use>
    </motion.svg>
  );
}
function DropDownItem({
  item,
  handleMouseLeave,
}: {
  item: { name: string; description: string };
  handleMouseLeave: () => void;
}) {
  return (
    <motion.div
      onMouseEnter={() => clearInterval(controlInterval)}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        backgroundColor: "#dfdff2",
        color: "#171717",
        paddingLeft: "15px",
      }}
      className="flex cursor-pointer flex-col justify-center rounded-md pl-2.5 text-gray-300"
    >
      <p>{item.name}</p>
      <p className="text-xs">{item.description}</p>
    </motion.div>
  );
}
