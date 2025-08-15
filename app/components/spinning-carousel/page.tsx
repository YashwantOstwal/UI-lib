// import ListContainer from "@/components/list-container";
import Container from "../_components/container";
import {
  TITLE,
  DESCRIPTION,
  DEFAULT_ACTIVE_FILE,
  ROOT_DIRECTORY,
  PROP_TABLE,
  //   ADDITIONAL_INFORMATION,
} from "./page.data";
import SpinningCarouselDemo from "@/components/spinning-carousel/spinning-carousel.demo";
export default function InPageNavbarPage() {
  return (
    <>
      <Container>
        <Container.Title>{TITLE}</Container.Title>
        <Container.Description>{DESCRIPTION}</Container.Description>
        <SpinningCarouselDemo />
        <Container.FileExplorer
          defaultActiveFile={DEFAULT_ACTIVE_FILE}
          rootDirectory={ROOT_DIRECTORY}
        />
        <Container.PropTable {...PROP_TABLE}>
          {/* {ADDITIONAL_INFORMATION.map((props, i) => (
            <ListContainer {...props} key={`list-container-${i + 1}`} />
          ))} */}
        </Container.PropTable>
      </Container>
    </>
  );
}
