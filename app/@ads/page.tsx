import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

function Ads() {
  return (
    <Card className="w-fit p-4 shadow flex flex-row justify-center items-center">
      <div>
        <CardHeader>
          <CardTitle>no Sale products</CardTitle>
          <CardDescription>
            Buy outdated product with 50% discount
          </CardDescription>
        </CardHeader>

        <CardFooter>
          <Button>Buy Now</Button>
        </CardFooter>
      </div>
      <Image
        src="/assets/images.jpg"
        alt="ads"
        width={300}
        height={300}
        className="rounded-lg rounded-br-lg"
      />
    </Card>
  );
}

export default Ads;
