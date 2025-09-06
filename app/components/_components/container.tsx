import FileExplorer from "@/components/file-explorer";
import type { FileExplorerProps } from "@/components/file-explorer/file-explorer.types";
import { TailwindCSSClassname } from "@/components/file-explorer/file-explorer.types";
import PropTable from "@/app/components/_components/prop-table";
import type { PropTableProps } from "@/app/components/_components/prop-table";

import HomeButton from "@/components/home-button";
import Description, { type DescriptionProps } from "@/components/description";
import Preview, { PreviewProps } from "@/components/preview";
import Title, { type TitleProps } from "@/components/title";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import type { CodeCanvasProps } from "@/components/file-explorer/code-canvas";
import FileHeader from "@/components/file-explorer/file-header";
import SubTitle from "@/components/sub-title";

import Terminal from "../Terminal";
import SyntaxHighlighterServer from "@/components/syntax-highlighter/server";
type ContainerProps = TailwindCSSClassname & ComponentProps<"div">;
export default function Container({
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <div className={cn(className)} {...rest}>
      <HomeButton />
      {children}
    </div>
  );
}
Container.Title = function ContainerTitle({ className, ...rest }: TitleProps) {
  return <Title className={cn("mt-5", className)} {...rest} />;
};
Container.Description = function ContainerDescription({
  className,
  ...rest
}: DescriptionProps) {
  return <Description className={cn("mt-2", className)} {...rest} />;
};
Container.FileExplorer = function ContainerFileExplorer({
  rootDirectory,
  defaultActiveFile,
  className,
  style,
  ...rest
}: FileExplorerProps) {
  return (
    <div style={{ ...style }} className={cn(className)} {...rest}>
      <SubTitle>Code</SubTitle>
      <FileExplorer
        rootDirectory={rootDirectory}
        defaultActiveFile={defaultActiveFile}
      />
    </div>
  );
};

Container.PropTable = function ContainerPropTable({
  className,
  ...rest
}: PropTableProps) {
  return <PropTable className={cn("mt-20", className)} {...rest} />;
};

Container.Usage = function ContainerUsage({
  title,
  code,
  ...rest
}: { title: string } & CodeCanvasProps & ComponentProps<"div">) {
  const absolutePath = `components/${title.toLocaleLowerCase().replaceAll(" ", "-")}.demo.tsx`;

  return (
    <div {...rest}>
      <SubTitle>Usage</SubTitle>
      <div className="bg-muted relative z-10 w-full flex-1 overflow-hidden rounded-2xl p-1 text-sm shadow-[0px_8px_12px_-4px_rgba(15,12,12,0.08),_0px_0px_2px_0px_rgba(15,12,12,0.10),_0px_1px_2px_0px_rgba(15,12,12,0.10)] md:rounded-xl dark:shadow-[0_4px_12px_rgba(0,0,0,0.35),0_1px_rgba(255,255,255,0.05)_inset]">
        <div className="flex items-center justify-between gap-2 px-1 py-1.5 font-medium">
          <FileHeader {...{ absolutePath, code }} />
        </div>
        <div
          className={cn(
            "bg-card relative flex h-[450px] overflow-clip rounded-[10px] shadow-[0px_8px_12px_-4px_rgba(16,12,12,0.08),0px_0px_2px_0px_rgba(16,12,12,0.10),0px_1px_2px_0px_rgba(16,12,12,0.10)] max-md:max-h-[60vh] md:h-[600px] md:rounded-[10px] dark:shadow-[0_4px_12px_rgba(0,0,0,0.35),0_1px_rgba(255,255,255,0.05)_inset] [&_*]:min-h-full [&_*]:w-full [&_div]:overflow-auto [&_div]:rounded-[6px] [&_pre]:min-w-fit [&_pre]:p-3 [&_pre]:md:p-4",
          )}
        >
          <SyntaxHighlighterServer>{code}</SyntaxHighlighterServer>
        </div>
      </div>
    </div>
  );
};

Container.Cli = function Cli({ title }: { title: string }) {
  return (
    <div>
      <SubTitle>Cli</SubTitle>
      <Terminal title={title}></Terminal>
    </div>
  );
};
Container.Preview = function ContainerPreview({
  className,
  ...rest
}: PreviewProps) {
  return <Preview className={cn("mt-10", className)} {...rest} />;
};
