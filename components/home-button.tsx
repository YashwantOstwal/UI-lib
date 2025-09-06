"use client";

import LeftArrow from "@/icons/left-arrow.icon";
import UnderlineText from "./underline-text";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function HomeButton() {
  const [focus, setFocus] = useState(false);
  const router = useRouter();
  return (
    <Link
      href="/"
      className="inline-block w-fit"
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      onClick={() => router.back()}
    >
      <UnderlineText
        isParentFocused={focus}
        className="flex items-center px-0.5 pt-1 pb-0 text-sm font-medium"
      >
        <LeftArrow className="stroke-foreground -mr-0.5 size-4" />
        &nbsp;Back
      </UnderlineText>
    </Link>
  );
}
