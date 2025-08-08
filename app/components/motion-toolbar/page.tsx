import MotionToolbar from "@/components/motion-toolbar";
import Container from "../_components/container";
import { DEFAULT_ACTIVE_FILE, ROOT_DIRECTORY, PROP_TABLE } from "./page.data";

export default function MotionToolbarPage() {
  return (
    <Container>
      <Container.Title>Motion toolbar</Container.Title>
      <Container.Description>Animated Toolbar</Container.Description>
      <Container.Preview>
        <MotionToolbar />
      </Container.Preview>
      <Container.FileExplorer
        defaultActiveFile={DEFAULT_ACTIVE_FILE}
        rootDirectory={ROOT_DIRECTORY}
      />
      <Container.PropTable {...PROP_TABLE} />
    </Container>
  );
}
