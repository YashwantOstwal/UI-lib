"use client";
import { useRouter } from "next/navigation";
import LeftArrow from "./icons/left-arrow";
import UnderlineText from "./underline-text";
export default function BackButton() {
  const router = useRouter();
  return (
    // <a
    //   className="flex cursor-pointer items-center text-sm font-medium"
    // >
    //   <LeftArrow className="size-4" />
    //   &nbsp;Back
    // </a>
    <a onClick={() => router.back()}>
      <UnderlineText className="flex cursor-pointer items-center text-sm font-medium">
        <LeftArrow className="size-4" />
        &nbsp;Back
      </UnderlineText>
    </a>
  );
}
