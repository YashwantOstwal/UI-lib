import { ParallaxContainer } from "./parallax-container";
import Image from "next/image";

import AdidasCampaign from "@/public/lionel-messi-adidas-campaign.png";
export function ParallaxContainerDemo() {
  return (
    <ParallaxContainer className="mx-auto my-24 max-w-xl">
      {/* <img
        src="/lionel-messi-adidas-campaign.png"
        alt="Lionel Messi figures on a soccer field wearing Argentina jerseys, with the Adidas slogan 'impossible is nothing'"
        loading="eager"
      /> */}
      <Image
        src={AdidasCampaign}
        alt="Lionel Messi figures on a soccer field wearing Argentina jerseys, with the Adidas slogan 'impossible is nothing'"
        loading="eager"
      />
    </ParallaxContainer>
  );
}
