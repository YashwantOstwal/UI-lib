import StickyShowcase from "@/app/playground/_components/sticky-showcase";
import Container from "../../_components/container";
// import {
//   TITLE,
//   DESCRIPTION,
//   DEFAULT_ACTIVE_FILE,
//   ROOT_DIRECTORY,
//   PROP_TABLE,
//   USAGE,
// } from "./page.data";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sticky showcase",
  description: "",
};
export default function MaskTextServerPage() {
  return (
    <Container>
      <Container.Title>{"Sticky showcase"}</Container.Title>
      <Container.Description>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate
        autem commodi doloribus praesentium voluptates ex voluptatum hic facilis
        adipisci eaque.
      </Container.Description>
      {/* <Container.Preview> */}
      <StickyShowcase />
      {/* </Container.Preview> */}
      {/* <Container.Usage title={TITLE} code={USAGE.code} />
      <Container.Cli title={TITLE} /> */}
      {/* <Container.FileExplorer
        defaultActiveFile={DEFAULT_ACTIVE_FILE}
        rootDirectory={ROOT_DIRECTORY}
      />
      <Container.PropTable {...PROP_TABLE} /> */}
    </Container>
  );
}
