import Container from "../_components/container";
import { DEFAULT_ACTIVE_FILE, ROOT_DIRECTORY, PROP_TABLE } from "./page.data";
import PlaceHolder from "@/components/place-holder";

export default function InPageNavbarPage() {
  return (
    <>
      <Container>
        <Container.Title>In-Page navbar</Container.Title>
        <Container.Description>In-Page navbar</Container.Description>
        <div className="-mx-3 space-y-1 py-10">
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
              msg1={`id="${id}"`}
              msg2={`className="${className}"`}
              msg3="This is still a server component."
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
        <Container.FileExplorer
          id="file-explorer"
          defaultActiveFile={DEFAULT_ACTIVE_FILE}
          rootDirectory={ROOT_DIRECTORY}
        />
        <Container.PropTable id="prop-table" {...PROP_TABLE} />
      </Container>
    </>
  );
}
