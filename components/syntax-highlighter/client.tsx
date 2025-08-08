"use client";
import * as React from "react";
import { highlight } from "@/lib/shared";

interface SyntaxHighlighterClientProps {
  children: string;
  loader: React.ReactNode;
}
export default function SyntaxHighlighterClient({
  children,
  loader,
}: SyntaxHighlighterClientProps) {
  const [nodes, setNodes] = React.useState<React.JSX.Element | undefined>(
    undefined,
  );
  React.useEffect(() => {
    void highlight(children).then(setNodes);
  }, [children]);

  return nodes ?? loader;
}
