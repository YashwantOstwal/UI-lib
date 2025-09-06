import type { Metadata } from "next";
import { InPageNavbarDemo } from "@/components/(package)/in-page-navbar/in-page-navbar.demo";

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
      <InPageNavbarDemo />
    </>
  );
}
