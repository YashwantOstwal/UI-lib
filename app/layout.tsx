import type { Metadata } from "next";
import { Inter, Geist_Mono, Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
//finally remove the weight that havent been used
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});
import "./globals.css";

export const metadata: Metadata = {
  title: "100xwebsites",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          inter.variable,
          geistMono.variable,
          poppins.variable,
          "[&_*]:focus-visible: bg-[#ededed] antialiased selection:bg-[#dddddd] [&_*]:focus:outline-2 [&_*]:focus:outline-[#A9ADB4]",
        )}
      >
        <div className="font-poppins mx-auto max-w-screen-2xl px-3 lg:px-4">
          <main className="min-h-screen border-x border-dashed border-[#c6c6c6] bg-[#f5f5f5] px-3 lg:px-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
