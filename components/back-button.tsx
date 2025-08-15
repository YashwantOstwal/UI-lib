import LeftArrow from "@/icons/left-arrow.icon";
import UnderlineText from "./underline-text";
import Link from "next/link";
export default function BackButton() {
  return (
    <Link href="/">
      <UnderlineText className="flex items-center text-sm font-medium">
        <LeftArrow className="size-4" />
        &nbsp;Home
      </UnderlineText>
    </Link>
  );
}
