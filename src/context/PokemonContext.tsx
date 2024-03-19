import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface PokemonContextType {
  selectedPokemon: any;
  setSelectedPokemon: (e: any) => void;
  pokemons: any[];
  setPokemons: (e: any) => void;
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

export const PokemonProvider: React.FC<PokemonProviderProps> = ({ children }) => {
  const [selectedPokemon, setSelectedPokemon] = useState<any>("");
  const [pokemons, setPokemons] = useState<{ name: string; url: string }[]>([]);

  console.log("render test");
  useEffect(() => {
    console.log(pokemons);
  }, [pokemons]);

  return (
    <PokemonContext.Provider value={{ selectedPokemon, setSelectedPokemon, pokemons, setPokemons }}>
      {children}
    </PokemonContext.Provider>
  );
};
