import { useState, useCallback, useEffect } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { usePokemonContext } from "@/context/PokemonContext";

const limit = 20;

export const useGetPokemons = () => {
  const { pokemons: allPokemons } = usePokemonContext();
  const [loadedPokemons, setLoadedPokemons] = useState([]);
  const [page, setPage] = useState<number>(0);

  const fetchPokemons = async ({ pageParam = 1 }) => {
    const offset = (pageParam - 1) * limit;
    const pokemonsToLoad = allPokemons.slice(offset, offset + limit);

    const responses = await Promise.all(
      pokemonsToLoad.map((pokemon) => axios.get(pokemon.url).then((response) => response.data))
    );

    return responses;
  };

  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["pokemons", page, allPokemons],
    queryFn: () => fetchPokemons({ pageParam: page }),
  });

  const loadMorePokemons = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  useEffect(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    console.log(allPokemons);
  }, [allPokemons]);

  useEffect(() => {
    console.log(loadedPokemons);
  }, [loadedPokemons]);

  useEffect(() => {
    console.log("testPAge", page);
  }, [page]);

  useEffect(() => {
    console.log("testData", data);
    if (data && data === []) setPage(1);
    if (page === 1) {
      setLoadedPokemons(data);
    } else {
      data && setLoadedPokemons((prev) => [...prev, ...data]);
    }
    console.log(data);
    console.log(loadedPokemons);
  }, [data]);

  const reset = useCallback(() => {
    console.log("test");
    setPage(1);
    setLoadedPokemons([]);
  }, []);

  return {
    pokemons: loadedPokemons,
    isFetching,
    isError,
    error,
    loadMorePokemons,
    reset,
  };
};
