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
    themes: {
      light: "github-light",
      dark: "vesper",
    },
    tabindex: "-1",
  });

  return <div dangerouslySetInnerHTML={{ __html: out }} />;
}
