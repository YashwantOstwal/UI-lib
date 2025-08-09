import { MOCK_PROPS_IN_PAGE_NAVBAR } from "./in-page-navbar.data";
import InPageNavbar from "./index";

export default function InPageNavbarDemo() {
  return (
    // Make sure to place the component after the sections it tracks in your component tree or in your page layout as last child."
    <InPageNavbar {...MOCK_PROPS_IN_PAGE_NAVBAR} />
  );
}
