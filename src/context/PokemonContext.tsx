import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface PokemonContextType {
  selectedPokemon: any;
  setSelectedPokemon: (e: any) => void;
  pokemons: Pokemon[];
  setPokemons: (e: Pokemon[]) => void;
  paginatedPokemons: Pokemon[];
  loadMore: () => void;
  noMorePokemons: boolean;
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

interface Pokemon {
  name: string;
  url: string;
}

export const PokemonProvider: React.FC<PokemonProviderProps> = ({ children }) => {
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [paginatedPokemons, setPaginatedPokemons] = useState<Pokemon[]>([]);
  const [noMorePokemons, setNoMorePokemons] = useState<boolean>(false);

  useEffect(() => {
    const initialLoad = () => {
      const initialPokemons = pokemons.slice(0, rateLimit);
      setPaginatedPokemons(initialPokemons);
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
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
