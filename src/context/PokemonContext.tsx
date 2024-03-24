import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface PokemonContextType {
  selectedPokemon: any;
  setSelectedPokemon: (e: any) => void;
  pokemons: Pokemon[];
  setPokemons: (e: Pokemon[]) => void;
  paginatedPokemons: Pokemon[];
  loadMore: () => void;
  noMorePokemons: boolean;
  discoverPokemons: () => void;
  page: number;
  // fetchInfinitePokemons: ({ pageParam }: { pageParam: number }) => Promise<{
  //   data: Pokemon[]; // Changed from any[] to Pokemon[]
  //   currentPage: number;
  //   nextPage: number | null;
  // }>;
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

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const PokemonProvider: React.FC<PokemonProviderProps> = ({ children }) => {
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [paginatedPokemons, setPaginatedPokemons] = useState<Pokemon[]>([]);
  const [noMorePokemons, setNoMorePokemons] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

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

  const discoverPokemons = () => {
    const pokemonList = Array.from({ length: 20 }, () => {
      const randomNumber = Math.floor(Math.random() * 101) + 100; // Generate random number between 100 and 200
      return {
        name: `Pokemon ${randomNumber}`,
        url: `${BASE_URL}/pokemon/${randomNumber}`,
      };
    });

    setPokemons(pokemonList); // Assuming setPokemons is a function in your context/state management to update the pokemons list
    setNoMorePokemons(true); // Assuming setNoMorePokemons is a function in your context/state management to indicate no more pokemons can be discovered
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
        discoverPokemons,
        page,
        // fetchInfinitePokemons,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
