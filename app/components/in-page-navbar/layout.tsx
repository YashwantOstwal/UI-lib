import type { Metadata } from "next";
import InPageNavbar from "@/components/in-page-navbar/in-page-navbar";

export const metadata: Metadata = {
  title: "In-Page-Navbar",
  description: "lorem impsum",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <InPageNavbar />
    </>
  );
}
