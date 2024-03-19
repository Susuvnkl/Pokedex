import { useQuery } from "@tanstack/react-query";
import {
  PokemonDetail,
  fetchPokemonByNameOrId,
  fetchPokemons,
  fetchPokemonsByType,
  // fetchPokemonsByGender,
  fetchPokemonsByAbility,
  // fetchPokemonsByColor,
} from "@/api/pokemonApi";

export type Filter = {
  name: string;
  id: string;
  type: string;
  gender: string;
  ability: string;
  color: string;
};

export const usePokemonList = (filter: Filter) => {
  // Dynamic fetch function selection based on the filter provided
  const fetchFilteredPokemons = async (): Promise<PokemonDetail[]> => {
    // Handle name filter (assuming this might directly match ID or name)
    if (filter.name) {
      return [await fetchPokemonByNameOrId(filter.name || filter.id)];
    }

    // Handle other filters
    if (filter.type) {
      return await fetchPokemonsByType(filter.type);
    }
    // if (filter.gender) {
    //   return await fetchPokemonsByGender(filter.gender);
    // }
    if (filter.ability) {
      return await fetchPokemonsByAbility(filter.ability);
    }
    // if (filter.color) {
    //   return await fetchPokemonsByColor(filter.color);
    // }

    // Default fetch if no specific filter is applied
    return await fetchPokemons();
  };

  // React Query to manage fetching, caching, and updating the pokemons list
  const {
    data: pokemons,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pokemon", filter],
    queryFn: fetchFilteredPokemons,
  });

  return { pokemons, isLoading, error };
};
