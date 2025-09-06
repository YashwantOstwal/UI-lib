import { MaskText } from "./mask-text-server";

export function MaskTextDemo() {
  return (
    <>
      <MaskText.ByLines
        render={() => ({
          "0px":
            "Lorem ipsum \n dolor sit amet\nconsectetur, adipisicing\nelit.Repellat,\ntemporibus!",
          "640px":
            "Lorem ipsumndolor\nsit amet consectetur\nadipisicing elit.\nIpsa, error?",
          "768px":
            "Lorem ipsumndolor sit amet consectetur\nadipisicing elit. Ipsa, error?",
        })}
      />
      <MaskText.ByWords
        render={() =>
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, exercitationem!"
        }
        textAlign="center"
      />
      <MaskText.ByLetters
        render={() =>
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, exercitationem!"
        }
      />
    </>
  );
}
