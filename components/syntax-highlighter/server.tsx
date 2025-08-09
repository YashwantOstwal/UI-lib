import { codeToHtml } from "shiki";

interface SyntaxHighlighterServerProps {
  children: string;
  lang?: string;
}
export default async function SyntaxHighlighterServer({
  children,
  lang = "ts",
}: SyntaxHighlighterServerProps) {
  const out = await codeToHtml(children, {
    lang,
    theme: "github-light",
  });

  return <div dangerouslySetInnerHTML={{ __html: out }} />;
}
