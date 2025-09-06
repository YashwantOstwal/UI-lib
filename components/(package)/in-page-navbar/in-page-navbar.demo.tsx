import { InPageNavbar } from "./in-page-navbar";

export function InPageNavbarDemo() {
  return <InPageNavbar logo={logo} sections={sections} />;
}

const logo = (
    <div className="text-lg leading-none font-semibold">
      100<span className="text-destructive">x</span>UI
    </div>
  ),
  sections = [
    {
      label: "About",
      id: "about",
    },
    {
      label: "Pricing",
      id: "pricing",
    },
    {
      label: "Usage",
      id: "usage",
    },
    {
      label: "File explorer",
      id: "file-explorer",
    },
    {
      label: "Documentation",
      id: "prop-table",
    },
  ];
