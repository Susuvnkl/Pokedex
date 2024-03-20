import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface CustomCarouselProps {
  children: React.ReactNode;
}

function CustomCarousel({ children }: CustomCarouselProps) {
  return (
    <Carousel className="w-full max-w-sm">
      <CarouselContent>
        {React.Children.map(children, (child, index) => (
          <CarouselItem key={index} className="flex  items-center justify-center">
            {child}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default CustomCarousel;
