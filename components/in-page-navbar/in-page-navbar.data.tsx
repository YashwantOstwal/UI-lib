import { InPageNavbarProps } from "./in-page-navbar.types";

export const MOCK_PROPS_IN_PAGE_NAVBAR: InPageNavbarProps = {
  logo: (
    <div className="cursor-pointer px-3 py-0.75 text-sm font-semibold">
      Acme Inc.
    </div>
  ),
  sections: [
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
  ],
};
