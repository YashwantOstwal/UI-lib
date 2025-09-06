"use client";

import CopyButton from "@/components/copy-button";
import { cn } from "@/lib/utils";
import { SquareTerminalIcon } from "lucide-react";
import { useState } from "react";

type packageManagers = "pnpm" | "npm" | "bun" | "yarn";
export default function Terminal({ title }: { title: string }) {
  const clis: Record<packageManagers, string> = {
    pnpm: `pnpm dlx shadcn@latest add http://ui-lib-steel.vercel.app/components/${title.toLocaleLowerCase().replaceAll(" ", "-")}.json`,
    npm: `npx shadcn@latest add http://ui-lib-steel.vercel.app/components/${title.toLocaleLowerCase().replaceAll(" ", "-")}.json`,
    yarn: `yarn shadcn@latest add http://ui-lib-steel.vercel.app/components/${title.toLocaleLowerCase().replaceAll(" ", "-")}.json`,
    bun: `bun --bun shadcn@latest add http://ui-lib-steel.vercel.app/components/${title.toLocaleLowerCase().replaceAll(" ", "-")}.json`,
  } as const;

  const [state, setState] = useState<packageManagers>("pnpm");
  return (
    <div className="bg-muted relative z-10 w-full flex-1 overflow-hidden rounded-2xl p-1 md:rounded-xl md:shadow-[0px_8px_12px_-4px_rgba(15,12,12,0.08),_0px_0px_2px_0px_rgba(15,12,12,0.10),_0px_1px_2px_0px_rgba(15,12,12,0.10)] dark:md:shadow-[0_4px_12px_rgba(0,0,0,0.35),0_1px_rgba(255,255,255,0.05)_inset]">
      <div className="flex items-center justify-between gap-2 px-1 py-1.5 font-medium">
        <SquareTerminalIcon className="size-5" />
        <div className="flex flex-1 items-center gap-1 overflow-auto text-sm text-nowrap whitespace-nowrap md:gap-2 [&>svg]:shrink-0">
          <div className="flex gap-1">
            {Object.keys(clis).map((tab) => (
              <button
                key={tab}
                onClick={() => setState(tab as packageManagers)}
                className={cn(
                  "p-1 hover:opacity-80",
                  state === tab && "underline decoration-2 underline-offset-3",
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <CopyButton code={clis[state]} />
      </div>
      <pre className="bg-card relative flex w-full overflow-auto rounded-[6px] p-3 shadow-[0px_8px_12px_-4px_rgba(16,12,12,0.08),0px_0px_2px_0px_rgba(16,12,12,0.10),0px_1px_2px_0px_rgba(16,12,12,0.10)] md:rounded-[10px] md:p-4 dark:shadow-[0_4px_12px_rgba(0,0,0,0.35),0_1px_rgba(255,255,255,0.05)_inset]">
        {clis[state]}
      </pre>
    </div>
  );
}
