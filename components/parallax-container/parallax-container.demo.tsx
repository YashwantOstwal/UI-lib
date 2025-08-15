import ParallaxContainer from "./index";
import messiAdidasCampaign from "@/public/lionel-messi-adidas-campaign.png";
import Image from "next/image";

export default function ParallaxContainerDemo() {
  return (
    <ParallaxContainer className="mx-auto my-24 max-w-xl">
      <Image
        priority
        src={messiAdidasCampaign}
        alt={`Lionel Messi figures on a soccer field wearing Argentina jerseys, with the Adidas slogan "impossible is nothing"`}
      />
    </ParallaxContainer>
  );
}
