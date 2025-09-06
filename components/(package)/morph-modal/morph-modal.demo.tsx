"use client";

import { MorphModal } from "./morph-modal";
import { PlayIcon } from "lucide-react";

export function MorphModalDemo() {
  return (
    <MorphModal>
      <MorphModal.Button className="bg-secondary text-secondary-foreground rounded-full border px-3.5 py-2">
        <div className="flex items-center gap-1.5">
          Watch demo
          <PlayIcon className="fill-secondary-foreground stroke-secondary-foreground bg-background box-content size-3.5 rounded-full p-1" />
        </div>
      </MorphModal.Button>
      <MorphModal.Modal className="m-2 overflow-auto rounded-xl border p-1">
        <iframe
          className="aspect-[560/315] w-full rounded-lg"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/aWBiZc5XKJM?si=muuRWjXzomYeoQ2K"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </MorphModal.Modal>
    </MorphModal>
  );
}
