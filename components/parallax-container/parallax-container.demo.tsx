import ParallaxContainer from "./index";
import Yonex from "@/public/yonex-play-full-power-ad.png"; //not in demo
import Image from "next/image"; //not in demo
export default function ParallaxContainerDemo() {
  return (
    <ParallaxContainer className="mx-auto my-24 max-w-xs rounded-2xl">
      {/* <img
        loading="eager"
        src="/yonex-play-full-power-ad.png"
        alt="Yonex 'Play Full Power' campaign advertisement."
      /> */}
      <Image
        priority
        src={Yonex}
        alt="Yonex 'Play Full Power' campaign advertisement."
      />
    </ParallaxContainer>
  );
}
