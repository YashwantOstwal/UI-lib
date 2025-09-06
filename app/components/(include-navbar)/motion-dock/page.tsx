import { MotionDockDemo } from "@/components/(package)/motion-dock/motion-dock.demo";
import Container from "../../_components/container";
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
        <MotionDockDemo />
      </Container.Preview>
      <Container.Usage title={TITLE} code={USAGE.code} />
      <Container.Cli title={TITLE} />
      <Container.FileExplorer
        defaultActiveFile={DEFAULT_ACTIVE_FILE}
        rootDirectory={ROOT_DIRECTORY}
      />
      <Container.PropTable {...PROP_TABLE} />
    </Container>
  );
}
