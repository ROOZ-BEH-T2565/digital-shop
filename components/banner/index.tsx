import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import IMG1 from "./image/images (1).webp";
import IMG2 from "./image/images (2).jpg";
import IMG3 from "./image/images (3).webp";
import IMG4 from "./image/images.webp";
import Image from "next/image";

export function Banner() {
  return (
    <Carousel className="w-full ">
      <CarouselContent>
        {[IMG1, IMG2, IMG3, IMG4].map((img, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="relative aspect-auto h-[480px] w-full flex items-center justify-center p-6">
                  <Image src={img} alt="banner" fill className="object-cover" />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
