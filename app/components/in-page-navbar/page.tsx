import ListContainer from "@/components/list-container";
import Container from "../_components/container";
import {
  TITLE,
  DESCRIPTION,
  DEFAULT_ACTIVE_FILE,
  ROOT_DIRECTORY,
  PROP_TABLE,
  ADDITIONAL_INFORMATION,
  USAGE,
} from "./page.data";
import PlaceHolder from "@/components/place-holder";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
};
export default function InPageNavbarPage() {
  return (
    <>
      <Container>
        <Container.Title>{TITLE}</Container.Title>
        <Container.Description>{DESCRIPTION}</Container.Description>
        <div className="-mx-2 space-y-1 py-10 lg:-mx-3">
          {[
            {
              id: "about",
              className: "h-160",
            },
            {
              id: "pricing",
              className: "h-fit",
            },
          ].map(({ id, className }, i) => (
            <PlaceHolder
              msg1={`id="${id}" className="${className}"`}
              msg2="This is still a server component."
              center={
                <p className="px-2 py-10 text-center text-sm leading-tight sm:py-16 sm:text-base">
                  &quot;Watch the navbar for section progress as you
                  scroll.&quot;
                </p>
              }
              key={id}
              index={i}
              id={id}
              className={className}
            />
          ))}
        </div>
        <Container.Usage id="usage" title={TITLE} code={USAGE.code} />
        <Container.Cli title={TITLE} />
        <Container.FileExplorer
          id="file-explorer"
          defaultActiveFile={DEFAULT_ACTIVE_FILE}
          rootDirectory={ROOT_DIRECTORY}
        />
        <Container.PropTable id="prop-table" {...PROP_TABLE}>
          {ADDITIONAL_INFORMATION.map((props, i) => (
            <ListContainer {...props} key={`list-container-${i + 1}`} />
          ))}
        </Container.PropTable>
      </Container>
    </>
  );
}
