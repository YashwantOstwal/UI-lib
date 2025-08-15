import type { InPageNavbarProps } from "./in-page-navbar.types";
import InPageNavbar from "./index";

const LOGO = <>Acme Inc.</>;

const SECTIONS = [
  {
    label: "About",
    id: "about",
  },
  {
    label: "Pricing",
    id: "pricing",
  },
  {
    label: "File explorer",
    id: "file-explorer",
  },
  {
    label: "Props table",
    id: "prop-table",
  },
];

const DEMO_PROPS: InPageNavbarProps = {
  Logo: LOGO,
  sections: SECTIONS,
};
export default function InPageNavbarDemo() {
  return <InPageNavbar {...DEMO_PROPS} />;
}
