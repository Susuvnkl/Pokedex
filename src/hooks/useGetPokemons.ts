import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { usePokemonContext } from "@/context/PokemonContext";

const fetchPokemons = async (pokemons) => {
  const responses = await Promise.all(
    pokemons.map((pokemon) => axios.get(pokemon.url).then((res) => res.data))
  );
  return responses;
};

export const useGetPokemons = () => {
  const { paginatedPokemons } = usePokemonContext();

  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["pokemons", paginatedPokemons],
    queryFn: () => fetchPokemons(paginatedPokemons),
    enabled: paginatedPokemons.length > 0,
  });

  return {
    pokemons: data || [],
    isFetching,
    isError,
    error,
  };
};
