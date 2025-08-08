import Container from "../_components/container";
// import { DEFAULT_ACTIVE_FILE, ROOT_DIRECTORY, PROP_TABLE } from "./page.data";
import PlaceHolder from "@/components/place-holder";

export default function InPageNavbar() {
  return (
    <>
      <Container>
        <Container.Title>In-Page navbar</Container.Title>
        <Container.Description>In-Page navbar</Container.Description>
        <div className="-mx-3 space-y-1 py-10">
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
            <PlaceHolder
              msg1={`id="${id}"`}
              msg2={`className="${className}"`}
              msg3="I am the default server component"
              center={
                <p className="px-2 py-5 text-center text-sm leading-tight sm:py-7 sm:text-base">
                  "Watch the navbar for section progress as you scroll."
                </p>
              }
              key={id}
              index={i}
              id={id}
              className={className}
            />
          ))}
        </div>
      </Container>
    </>
  );
}
