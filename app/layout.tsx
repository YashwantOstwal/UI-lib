import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-serif",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
export const metadata: Metadata = {
  title: {
    default: "100xUI",
    template: "%s | 100xUI",
  },
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={cn(
          geistMono.variable,
          poppins.className, //default font
          "bg-layout antialiased",
        )}
        // selection:bg-[#dddddd] [&_*]:focus-visible:outline-2 [&_*]:focus-visible:outline-offset-2 [&_*]:focus-visible:outline-[#A9ADB4]
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="mx-auto max-w-screen-2xl px-3 lg:px-4">
            <main className="text-foreground bg-background //bg-[#fefeff] min-h-screen border-x border-dashed px-3 pt-26 pb-16 lg:px-4">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
