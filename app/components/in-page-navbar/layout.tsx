import type { Metadata } from "next";
import { InPageNavbarDemo } from "@/components/(package)/in-page-navbar/in-page-navbar.demo";
import { ModeToggle } from "@/components/mode-toggle";

export const metadata: Metadata = {
  title: "In-Page-Navbar",
  description: "lorem impsum",
};

export default function InPageNavbarPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <ModeToggle className="fixed top-16 right-3 z-[90] min-[768px]:top-1.5 lg:right-4" />
      <InPageNavbarDemo />
    </>
  );
}
