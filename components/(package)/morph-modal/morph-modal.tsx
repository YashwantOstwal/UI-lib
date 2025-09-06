"use client";

import { createContext, ReactNode, useContext, useId, useState } from "react";
import { AnimatePresence, motion, Easing, HTMLMotionProps } from "motion/react";
import { assertOnlyChild, cn } from "@/lib/utils";

type MorphModalContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  duration: number;
  ease: Easing | Easing[];
  id: string;
};

const MorphModalContext = createContext<MorphModalContextType | undefined>(
  undefined,
);
const useMorphModal = () => {
  const context = useContext(MorphModalContext);
  if (!context)
    throw new Error("useMorphModal must be used within a <MorphModal />");
  return context;
};

interface MorphModalProps {
  children: ReactNode;
  duration?: number;
  ease?: Easing | Easing[];
}
interface MorphModalChildProps {
  children: ReactNode;
  // style?: CSSProperties;
  className?: string;
}

export function MorphModal({
  children,
  duration = 0.35,
  ease = "easeOut",
}: MorphModalProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  return (
    <MorphModalContext.Provider value={{ open, setOpen, id, ease, duration }}>
      {children}
    </MorphModalContext.Provider>
  );
}
MorphModal.Button = function MorphModalButton({
  children,
  className,
  onClick,
  ...rest
}: MorphModalChildProps & HTMLMotionProps<"button">) {
  assertOnlyChild(children);
  const { open, setOpen, duration, ease, id } = useMorphModal();
  return (
    <div className="relative">
      <AnimatePresence initial={false}>
        {open === false && (
          <motion.button
            onClick={(e) => {
              setOpen(true);
              onClick?.(e);
            }}
            className={cn(
              "bg-primary text-primary-foreground hover:bg-accent/80 hover:text-accent-foreground/80 size-fit cursor-pointer overflow-hidden transition-colors duration-100 ease-out",
              className,
              "absolute inset-0",
            )}
            {...rest}
            transition={{ layout: { duration, ease } }}
            layoutId={id + "-morph-modal"}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: duration, ease },
              }}
              exit={{ opacity: 0 }}
              layoutId={id + "-div"}
              transition={{ ease, duration }}
            >
              {children}
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
      <div className={cn("invisible", className)}>{children}</div>
    </div>
  );
};
MorphModal.Modal = function MorphModalModal({
  children,
  className,
  onClick,
  ...rest
}: MorphModalChildProps & HTMLMotionProps<"div">) {
  assertOnlyChild(children);
  const { open, setOpen, duration, ease, id } = useMorphModal();

  return (
    <AnimatePresence>
      {open === true && (
        <motion.div
          initial={{ backgroundColor: "rgba(0,0,0,0)" }}
          animate={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          exit={{ backgroundColor: "rgba(0,0,0,0)" }}
          transition={{ duration, ease }}
          className="fixed inset-0 flex flex-col items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <motion.div
            layoutId={id + "-morph-modal"}
            transition={{ layout: { duration, ease } }}
            onClick={(e) => {
              e.stopPropagation();
              onClick?.(e);
            }}
            className={cn("bg-card size-fit overflow-hidden p-1", className)}
            {...rest}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: duration, ease } }}
              exit={{ opacity: 0 }}
              transition={{ ease, duration }}
            >
              {children}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
