import { useNavigate } from "react-router-dom";
import PokemonCard from "./PokemonCard";
import { Filter, usePokemonList } from "@/hooks/usePokemonList";
import { usePokemonContext } from "@/context/PokemonContext";
import CustomCursor from "../CustomCursor/CustomCursor";
import { useState } from "react";

interface PokemonGridProps {
  filter: Filter;
}

function PokemonGrid(props: PokemonGridProps) {
  const { filter } = props;
  const { pokemons, isLoading, error } = usePokemonList(filter);
  const [isCursorHovered, setIsCursorHovered] = useState(false);
  const { setSelectedPokemon } = usePokemonContext();
  const navigate = useNavigate();

  // Function to update hover state based on PokemonCard interactions
  const handleCursorHoverChange = (isHovered: boolean) => {
    setIsCursorHovered(isHovered);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred: {error.message}</div>;

  return (
    <div className="flex flex-col items-center">
      <CustomCursor visible={true} hovered={isCursorHovered} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-5 gap-x-8 justify-items-center">
        {pokemons?.map((pokemon) => (
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
    </div>
  );
}

export default PokemonGrid;
