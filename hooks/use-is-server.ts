import { useRef } from "react";

const useIsServer = () => {
  const isServer = useRef(
    typeof window === "undefined" || typeof document === "undefined",
  );
  return isServer.current;
};
export default useIsServer;
