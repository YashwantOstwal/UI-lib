import * as React from "react";

const useIsServer = () => {
  const isServer = React.useRef(typeof window === "undefined");
  return isServer.current;
};
export default useIsServer;
