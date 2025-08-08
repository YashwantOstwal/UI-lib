"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useState,
} from "react";

const DEFAULT_CONTEXT_VALUE = {
  isCopyTrackerOn: false,
  toggleCopyTrackerMode: null,
  copiedFiles: [] as string[],
  dispatchCopiedFiles: null,
};
type CopiedFilesTrackerContext = {
  copiedFiles: string[];
  isCopyTrackerOn: boolean;
  toggleCopyTrackerMode: (() => void) | null;
  dispatchCopiedFiles: ((action: Action) => void) | null;
};
const CopiedFilesTrackerContext = createContext<CopiedFilesTrackerContext>(
  DEFAULT_CONTEXT_VALUE,
);

type Action = { type: "ADD" | "REMOVE" | "RESET"; items?: string[] };
export default function CopiedFilesTrackerProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isCopyTrackerOn, setIsCopyTrackerOn] = useState(false);

  const [copiedFiles, dispatchCopiedFiles] = useReducer(
    (prevState: string[], { type, items = [] }: Action) => {
      switch (type) {
        case "ADD":
          return prevState.concat(items);
        case "REMOVE":
          return prevState.filter((eachItem) => !items.includes(eachItem));
        case "RESET":
          return [];
      }
    },
    [],
  );

  const toggleCopyTrackerMode = () => setIsCopyTrackerOn((prev) => !prev);
  return (
    <CopiedFilesTrackerContext
      value={{
        isCopyTrackerOn,
        toggleCopyTrackerMode,
        copiedFiles,
        dispatchCopiedFiles,
      }}
    >
      {children}
    </CopiedFilesTrackerContext>
  );
}

export const useIsCopyTrackerOn = () => {
  const { isCopyTrackerOn, toggleCopyTrackerMode } = useContext(
    CopiedFilesTrackerContext,
  ) as CopiedFilesTrackerContext;
  return { isCopyTrackerOn, toggleCopyTrackerMode };
};
export const useCopiedFiles = () => {
  const { copiedFiles, dispatchCopiedFiles } = useContext(
    CopiedFilesTrackerContext,
  ) as CopiedFilesTrackerContext;
  return { copiedFiles, dispatchCopiedFiles };
};
