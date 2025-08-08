"use client";
import React from "react";
import {
  useCopiedFiles,
  useIsCopyTrackerOn,
} from "./providers/CopiedFilesTrackerProvider";
import Button from "./button";
import usePrevious from "@/hooks/use-previous";

const GetStartedButton = () => {
  const { isCopyTrackerOn, toggleCopyTrackerMode } = useIsCopyTrackerOn();
  const prevTrackerStatus = usePrevious(isCopyTrackerOn);
  const { dispatchCopiedFiles } = useCopiedFiles();
  return (
    <>
      {!isCopyTrackerOn ? (
        <Button onClick={() => toggleCopyTrackerMode?.()} className="relative">
          Get started
          {prevTrackerStatus ?? (
            <svg
              className="pointer-events-none absolute top-0 right-0 size-3.5 translate-x-1/3 -translate-y-1/3"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="red"
            >
              <circle cx="12" cy="12" r="12" opacity="0.15"></circle>
              <circle
                cx="12"
                cy="12"
                r="6.5"
                className="animate-pulse"
              ></circle>
            </svg>
          )}
        </Button>
      ) : (
        <div className="flex gap-1">
          <Button
            onClick={() => {
              dispatchCopiedFiles?.({ type: "RESET" });
              toggleCopyTrackerMode?.();
            }}
          >
            Cancel
          </Button>
          <Button onClick={() => dispatchCopiedFiles?.({ type: "RESET" })}>
            Reset
          </Button>
        </div>
      )}
    </>
  );
};

export default GetStartedButton;
