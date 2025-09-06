import {
  CpuIcon,
  PaperclipIcon,
  GlobeIcon,
  MicIcon,
  AudioLinesIcon,
} from "lucide-react";

import { MotionDock, type MotionDockProps, type DockItem } from "./motion-dock";

export function MotionDockDemo() {
  return <MotionDock {...demoProps} />;
}
const demoProps: MotionDockProps = {
  dockItems: [
    {
      icon: <CpuIcon />,
      tooltip: "Choose a model",
    },
    {
      icon: <GlobeIcon />,
      tooltip: "Set sources for search",
    },
    {
      icon: <PaperclipIcon />,
      tooltip: "Attach files",
    },

    {
      icon: <MicIcon />,
      tooltip: "Dictation",
    },
    {
      icon: <AudioLinesIcon className="stroke-[#31b8c6]" />,
      tooltip: "Voice mode",
    },
  ] as DockItem[],
};
