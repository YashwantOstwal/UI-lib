import { MaskTextServerDemo } from "@/components/(package)/mask-text-server/mask-text-server.demo";
import Container from "../../_components/container";
import {
  TITLE,
  DESCRIPTION,
  // DEFAULT_ACTIVE_FILE,
  // ROOT_DIRECTORY,
  // PROP_TABLE,
  USAGE,
} from "./page.data";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
};
export default function MaskTextServerPage() {
  return (
    <Container>
      <Container.Title>{TITLE}</Container.Title>
      <Container.Description>{DESCRIPTION}</Container.Description>
      <Container.Preview>
        <MaskTextServerDemo />
      </Container.Preview>
      <Container.Usage title={TITLE} code={USAGE.code} />
      <Container.Cli title={TITLE} />
      {/* <Container.FileExplorer
        defaultActiveFile={DEFAULT_ACTIVE_FILE}
        rootDirectory={ROOT_DIRECTORY}
      />
      <Container.PropTable {...PROP_TABLE} /> */}
    </Container>
  );
}
