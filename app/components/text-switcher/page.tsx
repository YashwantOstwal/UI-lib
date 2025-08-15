import Container from "../_components/container";
import TextSwitcherDemo from "@/components/text-switcher/text-switcher.demo";
import { DEFAULT_ACTIVE_FILE, ROOT_DIRECTORY, PROP_TABLE } from "./page.data";

export default function MotionToolbarPage() {
  return (
    <Container>
      <Container.Title>Text switcher</Container.Title>
      <Container.Description>
        A reusable component that creates an engaging animation effect by
        smoothly transitioning between a list of words. The animation, driven by
        a moving dot, makes it ideal for dynamically completing a sentence or
        tagline.
      </Container.Description>
      <Container.Preview>
        <TextSwitcherDemo />
      </Container.Preview>
      <Container.FileExplorer
        defaultActiveFile={DEFAULT_ACTIVE_FILE}
        rootDirectory={ROOT_DIRECTORY}
      />
      <Container.PropTable {...PROP_TABLE} />
    </Container>
  );
}
