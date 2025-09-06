"use client";

import * as React from "react";
export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {/* <Wrapper> */}
      <ChildA />
      <ChildB />
      <ChildC />
      {/* </Wrapper> */}
    </div>
  );
}

// const Wrapper = ({ children }: { children: React.ReactElement[] }) => {
//   return (
//     <>
//       {children.map((child, i) =>
//         React.cloneElement(child as React.ReactElement<any>, { i }),
//       )}
//     </>
//   );
// };
const ChildA = () => {
  return <div>ChildA</div>;
};
const ChildB = () => {
  return <div>ChildB</div>;
};
const ChildC = () => {
  return <div>ChildC</div>;
};

// function Temp({ children }: { children: ReactNode[] }) {
//   children.forEach((child) => {
//     if (isValidElement(child)) console.log(child.type === Temp.Trigger);
//   });
//   return <div className="">{children}</div>;
// }
// Temp.Trigger = function TempTrigger() {
//   return <>Trigger</>;
// };
// Temp.Cancel = function Cancel() {
//   return <>Cancel</>;
// };
