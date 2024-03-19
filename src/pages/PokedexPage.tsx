import FilterPokemons from "@/components/ui/FilterPokemons";
import PokemonGrid from "@/components/ui/PokemonsGrid";

function PokedexPage() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full">
        <FilterPokemons />
      </div>
      <div>
        <PokemonGrid />
      </div>
    </div>
  );
}

export default PokedexPage;
