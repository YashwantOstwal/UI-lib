"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon, MonitorIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ModeToggle({ className }: { className?: string }) {
  const [mounted, setMounted] = React.useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  React.useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div
      className={cn(
        "bg-background/75 border-border/50 mr-1 flex items-center gap-x-1 rounded-full border p-0.5 backdrop-blur-[2px] lg:pointer-events-auto",
        className,
      )}
    >
      <div className="bg-muted border-border/50 flex gap-x-0.75 rounded-full border p-0.5 [&_svg]:size-6 [&_svg]:stroke-[2] [&_svg]:p-1">
        <button
          className={cn(
            "bg-secondary text-secondary-foreground rounded-full",
            mounted &&
              (theme === "light" ||
              (theme == "system" && systemTheme === "light")
                ? "bg-primary text-primary-foreground"
                : "hover:text-secondary-foreground/75"),
          )}
          onClick={() => setTheme("light")}
        >
          <SunIcon />
        </button>
        <button
          onClick={() => setTheme("dark")}
          className={cn(
            "bg-secondary text-secondary-foreground rounded-full",
            mounted &&
              (theme === "dark" || (theme == "system" && systemTheme === "dark")
                ? "bg-primary text-primary-foreground"
                : "hover:text-secondary-foreground/75"),
          )}
        >
          <MoonIcon />
        </button>
      </div>
      <button
        className="bg-muted hover:text-accent-foreground/75 text-secondary-foreground border-border/60 rounded-full border p-0.5"
        onClick={() => setTheme("system")}
      >
        <MonitorIcon className="size-6 p-1" />
      </button>
    </div>
  );
}
