import LogoIcon from "@/icons/logo.icon";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

export default function Navbar() {
  return (
    <div className="fixed inset-x-0 top-0 z-[100] flex justify-center lg:pointer-events-none">
      <div className="w-full max-w-screen-2xl px-0 lg:px-4.25">
        <div className="max-lg:bg-background/40 flex items-center justify-between max-lg:backdrop-blur-[2px]">
          <Link
            href="/"
            className="block w-fit p-2 max-lg:p-1.5 max-lg:px-3 lg:pointer-events-auto"
          >
            <LogoIcon />
          </Link>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
