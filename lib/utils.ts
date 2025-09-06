import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as React from "react";
import { isValidElement } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function assertOnlyChild(children: React.ReactNode) {
  if (Array.isArray(children))
    throw new Error(
      "A single child is required, but received multiple siblings.",
    );
  if (
    children &&
    isValidElement(children) &&
    children.type === React.Fragment &&
    Array.isArray((children.props as React.FragmentProps).children)
  )
    throw new Error(
      "A single child is required; fragments that render multiple siblings are not allowed.",
    );
}
