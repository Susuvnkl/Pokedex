import FilterPokemons from "@/components/ui/FilterPokemons";
import PokemonGrid from "@/components/ui/PokemonsGrid";
import { Filter } from "@/hooks/usePokemonList";
import { useState } from "react";

function PokedexPage() {
  const [filter, setFilter] = useState<Filter>({
    name: "",
    id: "",
    type: "",
    gender: "",
    color: "",
    ability: "",
  });
  return (
    <div className="flex flex-col items-center">
      <div className="w-full">
        <FilterPokemons setFilter={setFilter} />
      </div>
      <div>
        <PokemonGrid filter={filter} />
      </div>
    </div>
  );
}

export default PokedexPage;
