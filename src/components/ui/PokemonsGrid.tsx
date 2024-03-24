import { useNavigate } from "react-router-dom";
import PokemonCard from "./PokemonCard";
import { usePokemonContext } from "@/context/PokemonContext";
import CustomCursor from "../CustomCursor/CustomCursor";
import { useEffect, useState } from "react";
import { useGetPokemons } from "@/hooks/useGetPokemons";
import { Button } from "./button";
import { useInView } from "react-intersection-observer";
import { useGetInfinitePokemons } from "@/hooks/useGetInfinitePokemons";

const pokemonData = {
  id: 1,
  name: "Pikachu",
  sprites: {
    other: {
      "official-artwork": {
        front_default: "https://example.com/pikachu.png",
      },
    },
  },
  types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
};

// Create an array of 20 elements using the hardcoded data
const mockPokemons = new Array(20).fill(pokemonData);

function PokemonGrid() {
  const { isFetching, error } = useGetPokemons();
  const [isCursorHovered, setIsCursorHovered] = useState(false);
  const { setSelectedPokemon, noMorePokemons } = usePokemonContext();
  const navigate = useNavigate();
  const { ref, inView } = useInView();
  const { fetchNextPage, InfinitePokemons, isError, isLoading } = useGetInfinitePokemons();

  const handleCursorHoverChange = (isHovered: boolean) => {
    setIsCursorHovered(isHovered);
  };

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <div className="flex flex-col items-center pb-8">
      <CustomCursor visible={true} hovered={isCursorHovered} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-5 gap-x-8 justify-items-center">
        {InfinitePokemons?.pages?.map((page: any) => {
          return page?.data.map((pokemon: any) => {
            return (
              <div
                key={pokemon.id}
                onClick={() => {
                  setSelectedPokemon(pokemon);
                  navigate(`/${pokemon.name}`);
                }}
                className="cursor-pointer"
              >
                <PokemonCard
                  onHoverChange={handleCursorHoverChange}
                  pokemonId={pokemon.id}
                  pokemonName={pokemon.name}
                  pokemonSpritesFrontDefault={
                    pokemon.sprites.other["official-artwork"].front_default
                  }
                  pokemonTypes={pokemon.types.map((t: any) => t.type.name)}
                />
              </div>
            );
          });
        })}
        {isLoading &&
          mockPokemons.map((pokemon: any, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setSelectedPokemon(pokemon);
                  navigate(`/${pokemon.name}`);
                }}
                className="cursor-pointer"
              >
                <PokemonCard
                  onHoverChange={handleCursorHoverChange}
                  pokemonId={pokemon.id}
                  pokemonName={pokemon.name}
                  pokemonSpritesFrontDefault={
                    pokemon.sprites.other["official-artwork"].front_default
                  }
                  pokemonTypes={pokemon.types.map((t: any) => t.type.name)}
                />
              </div>
            );
          })}
      </div>
      <div ref={ref}></div>
      {!noMorePokemons && (
        <Button onClick={() => fetchNextPage()} disabled={isFetching} className="mt-5">
          Load More
        </Button>
      )}
      {isError && <p>Error loading pokemons: {error?.message}</p>}
    </div>
  );
}

export default PokemonGrid;
