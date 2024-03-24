import { usePokemonContext } from "@/context/PokemonContext";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

const rateLimit = 20;

export const useGetInfinitePokemons = (): {
  InfinitePokemons: any | undefined;
  isError: boolean;
  isLoading: boolean;
  fetchNextPage: () => void;
} => {
  const { pokemons } = usePokemonContext();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["infinitePokemons"] });
  }, [pokemons, queryClient]);

  const fetchInfinitePokemons = async ({ pageParam }: { pageParam: number }) => {
    if (pokemons.length > 0) {
      const slicedPokemons = pokemons.slice(pageParam, pageParam + rateLimit);
      const detailedPokemons = await Promise.all(
        slicedPokemons.map((pokemon) => axios.get(pokemon.url).then((res) => res.data))
      );
      const currentPage = pageParam;
      const nextPage = pageParam + rateLimit < pokemons.length ? pageParam + rateLimit : null;

      return {
        data: detailedPokemons,
        currentPage,
        nextPage,
      };
    }

    return {
      data: [],
      currentPage: pageParam,
      nextPage: null,
    };
  };

  const { data, isError, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: ["infinitePokemons", pokemons],
    queryFn: fetchInfinitePokemons,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  return {
    InfinitePokemons: data || [],
    isError,
    isLoading,
    fetchNextPage,
  };
};
