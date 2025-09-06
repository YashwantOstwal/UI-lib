import { ParallaxContainerDemo } from "@/components/(package)/parallax-container/parallax-container.demo";
import Container from "../../_components/container";
import {
  DEFAULT_ACTIVE_FILE,
  ROOT_DIRECTORY,
  PROP_TABLE,
  TITLE,
  DESCRIPTION,
  ADDITIONAL_INFORMATION,
  USAGE,
} from "./page.data";
import ListContainer from "@/components/list-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
};
export default function ParallaxContainerPage() {
  return (
    <Container>
      <Container.Title>{TITLE}</Container.Title>
      <Container.Description>{DESCRIPTION}</Container.Description>
      <ParallaxContainerDemo />
      <Container.Usage {...USAGE} />
      <Container.Cli title={TITLE} />
      <Container.FileExplorer
        defaultActiveFile={DEFAULT_ACTIVE_FILE}
        rootDirectory={ROOT_DIRECTORY}
      />
      <Container.PropTable id="prop-table" {...PROP_TABLE}>
        {ADDITIONAL_INFORMATION.map((props, i) => (
          <ListContainer {...props} key={`list-container-${i + 1}`} />
        ))}
      </Container.PropTable>
    </Container>
  );
}
