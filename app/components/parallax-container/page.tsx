import ParallaxContainerDemo from "@/components/parallax-container/parallax-container.demo";
import Container from "../_components/container";
import { DEFAULT_ACTIVE_FILE, ROOT_DIRECTORY, PROP_TABLE } from "./page.data";

export default function MotionToolbarPage() {
  return (
    <Container>
      <Container.Title>Motion toolbar</Container.Title>
      <Container.Description>Animated Toolbar</Container.Description>
      <ParallaxContainerDemo />
      <Container.FileExplorer
        defaultActiveFile={DEFAULT_ACTIVE_FILE}
        rootDirectory={ROOT_DIRECTORY}
      />
      <Container.PropTable {...PROP_TABLE} />
    </Container>
  );
}
