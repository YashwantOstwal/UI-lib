import Container from "../../_components/container";
import { TextSwitcherDemo } from "@/components/(package)/text-switcher/text-switcher.demo";
import {
  TITLE,
  DESCRIPTION,
  DEFAULT_ACTIVE_FILE,
  ROOT_DIRECTORY,
  PROP_TABLE,
  USAGE,
} from "./page.data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
};
export default function MotionToolbarPage() {
  return (
    <Container>
      <Container.Title>{TITLE}</Container.Title>
      <Container.Description>{DESCRIPTION}</Container.Description>
      <Container.Preview>
        <TextSwitcherDemo />
      </Container.Preview>
      <Container.Cli title={TITLE} />
      <Container.Usage {...USAGE} />
      <Container.FileExplorer
        defaultActiveFile={DEFAULT_ACTIVE_FILE}
        rootDirectory={ROOT_DIRECTORY}
      />
      <Container.PropTable {...PROP_TABLE} />
    </Container>
  );
}
