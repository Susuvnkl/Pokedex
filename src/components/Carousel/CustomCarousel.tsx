import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import PokemonCard from "../ui/PokemonCard";

export type CarouselPokemon = {
  name: string;
  sprite_url: string;
};

interface CustomCarouselProps {
  carouselPokemons: CarouselPokemon[];
}

function CustomCarousel(props: CustomCarouselProps) {
  const { carouselPokemons } = props;
  return (
    <Carousel className="w-full max-w-sm">
      <CarouselContent className="-ml-1">
        {carouselPokemons.map((carouselPokemon, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <PokemonCard
              pokemonName={carouselPokemon.name}
              pokemonSpritesFrontDefault={carouselPokemon.sprite_url}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default CustomCarousel;
