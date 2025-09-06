"use client";
import * as React from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon, LaptopIcon } from "lucide-react";

import { MenuWheel } from "./menu-wheel";

export function MenuWheelDemo() {
  const { setTheme } = useTheme();
  return (
    <MenuWheel
      className="[&>svg]:stroke-[1.5]"
      items={[
        {
          icon: <SunIcon />,
          onMouseUp: () => setTheme("light"),
        },
        {
          icon: <MoonIcon />,
          onMouseUp: () => setTheme("dark"),
        },
        {
          icon: <LaptopIcon />,
          onMouseUp: () => setTheme("system"),
        },
      ]}
    />
  );
}
