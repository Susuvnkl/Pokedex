import { useNavigate } from "react-router-dom";
import PokemonCard from "./PokemonCard";
import { usePokemonContext } from "@/context/PokemonContext";
import CustomCursor from "../CustomCursor/CustomCursor";
import { useEffect, useState } from "react";
import { useGetPokemons } from "@/hooks/useGetPokemons";

function PokemonGrid() {
  const { pokemons, isFetching, isError, error, loadMorePokemons } = useGetPokemons();
  const [isCursorHovered, setIsCursorHovered] = useState(false);
  const { setSelectedPokemon } = usePokemonContext();
  const navigate = useNavigate();

  const handleCursorHoverChange = (isHovered: boolean) => {
    setIsCursorHovered(isHovered);
  };

  useEffect(() => {
    console.log(pokemons);
  }, [pokemons]);

  return (
    <div className="flex flex-col items-center">
      <CustomCursor visible={true} hovered={isCursorHovered} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-5 gap-x-8 justify-items-center">
        {pokemons?.map((pokemon: any) => (
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
              pokemonSpritesFrontDefault={pokemon.sprites.other["official-artwork"].front_default}
              pokemonTypes={pokemon.types.map((t: any) => t.type.name)}
            />
          </div>
        ))}
      </div>
      <button onClick={loadMorePokemons} disabled={isFetching} className="load-more-btn">
        Load More
      </button>
      {isError && <p>Error loading pokemons: {error?.message}</p>}
    </div>
  );
}

export default PokemonGrid;
