import { Filter } from "@/hooks/usePokemonList";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface PokemonContextType {
  selectedPokemon: any;
  setSelectedPokemon: (e: any) => void;
  pokemons: Pokemon[];
  setPokemons: (e: Pokemon[]) => void;
  paginatedPokemons: Pokemon[];
  loadMore: () => void;
  noMorePokemons: boolean;
  page: number;
  filterState: Filter;
  setFilterState: (e: Filter) => void;
  initialState: Filter;
  setNoMorePokemons: (e: boolean) => void;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (context === undefined) {
    throw new Error("usePokemonContext must be used within a PokemonProvider");
  }
  return context;
};

interface PokemonProviderProps {
  children: ReactNode;
}

const rateLimit = 20;

export type Pokemon = {
  name: string;
  url: string;
};

const initialState: Filter = {
  name: "",
  id: "",
  type: "",
  gender: "",
  color: "",
  ability: "",
  discover: false,
};

export const PokemonProvider: React.FC<PokemonProviderProps> = ({ children }) => {
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [paginatedPokemons, setPaginatedPokemons] = useState<Pokemon[]>([]);
  const [noMorePokemons, setNoMorePokemons] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [filterState, setFilterState] = useState<Filter>(initialState);

  useEffect(() => {
    const initialLoad = () => {
      const initialPokemons = pokemons.slice(0, rateLimit);
      setPaginatedPokemons(initialPokemons);
      setPage(1);
      if (initialPokemons.length < rateLimit) {
        setNoMorePokemons(true);
      } else {
        setNoMorePokemons(false);
      }
    };
    initialLoad();
  }, [pokemons]);

  const loadMore = () => {
    const nextPokemons = pokemons.slice(
      paginatedPokemons.length,
      paginatedPokemons.length + rateLimit
    );
    if (nextPokemons.length > 0) {
      setPaginatedPokemons(paginatedPokemons.concat(nextPokemons));
      setPage((prev) => prev + 1);
    } else {
      setNoMorePokemons(true);
    }
  };

  return (
    <PokemonContext.Provider
      value={{
        selectedPokemon,
        setSelectedPokemon,
        pokemons,
        setPokemons,
        paginatedPokemons,
        loadMore,
        noMorePokemons,
        page,
        filterState,
        setFilterState,
        initialState,
        setNoMorePokemons,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
