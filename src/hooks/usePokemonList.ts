import { useQuery } from "@tanstack/react-query";
import {
  fetchPokemonByNameOrId,
  fetchPokemons,
  fetchPokemonsByType,
  fetchPokemonsByGender,
  fetchPokemonsByAbility,
  fetchPokemonsByColor,
} from "@/api/pokemonApi";
import { useEffect } from "react";
import { usePokemonContext } from "@/context/PokemonContext";

export type Filter = {
  name: string;
  id: string;
  type: string;
  gender: string;
  ability: string;
  color: string;
};

export const usePokemonList = (filter: Filter) => {
  const { setPokemons } = usePokemonContext();
  const fetchFilteredPokemons = async (): Promise<{ name: string; url: string }[]> => {
    if (filter.name || filter.id) {
      return await fetchPokemonByNameOrId(filter.name || filter.id);
    }
    if (filter.type) {
      return await fetchPokemonsByType(filter.type);
    }
    if (filter.gender) {
      return await fetchPokemonsByGender(filter.gender);
    }
    if (filter.ability) {
      return await fetchPokemonsByAbility(filter.ability);
    }
    if (filter.color) {
      return await fetchPokemonsByColor(filter.color);
    }
    return await fetchPokemons();
  };

  const {
    data: pokemons,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pokemonsList", filter],
    queryFn: fetchFilteredPokemons,
  });

  useEffect(() => {
    if (pokemons) {
      setPokemons(pokemons);
    }
  }, [pokemons, setPokemons]);

  return { pokemons, isLoading, error };
};
