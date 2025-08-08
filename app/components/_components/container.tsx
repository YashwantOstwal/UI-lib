import FileExplorer from "@/components/file-explorer";
import type { FileExplorerProps } from "@/components/file-explorer/file-explorer.types";
import { TailwindCSSClassname } from "@/components/file-explorer/file-explorer.types";
import PropTable from "@/components/prop-table";
import type { PropTableProps } from "@/components/prop-table/prop-table.types";

import BackButton from "@/components/back-button";
import Description, { type DescriptionProps } from "@/components/description";
import Preview, { PreviewProps } from "@/components/preview";

import Title, { type TitleProps } from "@/components/title";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
type ContainerProps = TailwindCSSClassname & ComponentProps<"div">;
export default function Container({
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <div className={cn("py-30", className)} {...rest}>
      <BackButton />
      {children}
      {/* <ParallaxCards className="mx-auto px-0 lg:px-3" /> */}
      {/* <div className="-mx-3 space-y-1 py-10">
            {[
              {
                id: "about",
                className: "h-150",
              },
              {
                id: "features",
                className: "h-[200vh]",
              },
              {
                id: "pricing",
                className: "h-fit",
              },
            ].map(({ id, className }, i) => (
              <BoilerPlate
                msg1={`id="${id}"`}
                msg2={`className="${className}"`}
                center={
                  <p className="px-2 py-3 text-center text-sm leading-tight sm:py-6 sm:text-base">
                    "Watch the navbar for section progress as you scroll."
                  </p>
                }
                key={id}
                index={i}
                id={id}
                className={className}
              />
            ))}
          </div> */}
      {/* <div className="relative mx-auto my-10 flex min-h-[400px] w-full max-w-5xl items-center justify-center overflow-hidden rounded-[10px] bg-[#fcfcfc] py-20 shadow-[0px_8px_12px_-4px_rgba(15,12,12,0.08),_0px_0px_2px_0px_rgba(15,12,12,0.10),_0px_1px_2px_0px_rgba(15,12,12,0.10)]">
            <SpatialToolBar /> 
            <div className="text-sm sm:text-base md:text-xl lg:text-2xl">
              As someone who styles divs and <br className="md:hidden" /> solves
              backend <br className="max-md:hidden" />
              nightmares, I write <br className="md:hidden" />
              code that&nbsp;
              <AnimeJS />
            </div>
          </div>
            */}
    </div>
  );
}
Container.Title = function ContainerTitle({ className, ...rest }: TitleProps) {
  return <Title className={cn("mt-2", className)} {...rest} />;
};
Container.Description = function ContainerDescription({
  className,
  ...rest
}: DescriptionProps) {
  return <Description className={cn("mt-2", className)} {...rest} />;
};
Container.FileExplorer = function ContainerFileExplorer({
  className,
  ...rest
}: FileExplorerProps) {
  return <FileExplorer className={cn("mt-6", className)} {...rest} />;
};
Container.PropTable = function ContainerPropTable({
  className,
  ...rest
}: PropTableProps) {
  return <PropTable className={cn("mt-20", className)} {...rest} />;
};
Container.Preview = function ContainerPreview({
  className,
  ...rest
}: PreviewProps) {
  return <Preview className={cn("my-10", className)} {...rest} />;
};
