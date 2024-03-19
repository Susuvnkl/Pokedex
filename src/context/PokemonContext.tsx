import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface PokemonContextType {
  selectedPokemon: any;
  setSelectedPokemon: (e: any) => void;
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

  console.log("render test");
  useEffect(() => {
    console.log(selectedPokemon);
  }, [selectedPokemon]);

  return (
    <PokemonContext.Provider value={{ selectedPokemon, setSelectedPokemon }}>
      {children}
    </PokemonContext.Provider>
  );
};
