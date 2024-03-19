import { useQuery } from "@tanstack/react-query";
import {
  PokemonDetail,
  fetchPokemonByNameOrId,
  fetchPokemons,
  fetchPokemonsByType,
  // fetchPokemonsByGender,
  // fetchPokemonsByAbility,
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

// export const usePokemonList = () => {
export const usePokemonList = (filter: Filter) => {
  const fetchFilteredPokemons = async (): Promise<PokemonDetail[]> => {
    if (filter.name || filter.id) {
      return [await fetchPokemonByNameOrId(filter.name || filter.id)];
    }
    if (filter.type) {
      return await fetchPokemonsByType(filter.type);
    }
    // if (filter.gender) {
    //   return await fetchPokemonsByGender(filter.gender);
    // }
    // if (filter.ability) {
    //   return await fetchPokemonsByAbility(filter.ability);
    // }
    // if (filter.color) {
    //   return await fetchPokemonsByColor(filter.color);
    // }
    // Default fetch if no specific filter is applied
    return await fetchPokemons();
  };
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
