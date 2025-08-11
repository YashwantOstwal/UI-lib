import MotionToolbar from "@/components/motion-toolbar";
import Container from "../_components/container";
import { DEFAULT_ACTIVE_FILE, ROOT_DIRECTORY, PROP_TABLE } from "./page.data";
import ListContainer from "@/components/list-container";

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
      <Container.PropTable {...PROP_TABLE}>
        <ListContainer
          title="Pro tips:"
          variant="pro-tips"
          list={["lorem30", "lorem30", "lorem30"]}
        />
        <ListContainer
          title="Caveats:"
          variant="caveats"
          list={["lorem30", "lorem30", "lorem30"]}
        />
      </Container.PropTable>
    </Container>
  );
}
