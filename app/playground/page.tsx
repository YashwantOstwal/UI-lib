import * as React from "react";
import StickyShowcase from "./_components/sticky-showcase";
export default function Page() {
  return <StickyShowcase />;
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
