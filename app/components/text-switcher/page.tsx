import Container from "../_components/container";
import TextSwitcherDemo from "@/components/text-switcher/text-switcher.demo";
import { DEFAULT_ACTIVE_FILE, ROOT_DIRECTORY, PROP_TABLE } from "./page.data";

export default function MotionToolbarPage() {
  return (
    <Container>
      <Container.Title>Motion toolbar</Container.Title>
      <Container.Description>Animated Toolbar</Container.Description>
      <Container.Preview>{/* <TextSwitcherDemo /> */}</Container.Preview>
      <Container.FileExplorer
        defaultActiveFile={DEFAULT_ACTIVE_FILE}
        rootDirectory={ROOT_DIRECTORY}
      />
      <Container.PropTable {...PROP_TABLE} />
    </Container>
  );
}
