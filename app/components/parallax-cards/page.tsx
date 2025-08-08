import Container from "../_components/container";
import { DEFAULT_ACTIVE_FILE, ROOT_DIRECTORY, PROP_TABLE } from "./page.data";
import ParallaxCards from "@/components/parallax-cards";

export default function ParallaxCardsPage() {
  return (
    <>
      <Container>
        <Container.Title>Parallax Cards</Container.Title>
        <Container.Description>Parallax Cards</Container.Description>
        <ParallaxCards />
        <Container.FileExplorer
          defaultActiveFile={DEFAULT_ACTIVE_FILE}
          rootDirectory={ROOT_DIRECTORY}
        />
        <Container.PropTable {...PROP_TABLE} />
      </Container>
    </>
  );
}
