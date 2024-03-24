import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export interface PokemonDetail {
  id: string;
  name: string;
  sprites: {
    other: {
      "official-artwork": { front_default: string };
    };
  };
  types: { type: { name: string } }[];
}
export type genderDetail = {
  pokemon_species: {
    name: string;
    url: string;
  };
  rate: number;
};

async function fetchFromUrl<T>(url: string): Promise<T> {
  try {
    const response = await axios.get<T>(url);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch from URL", url, error);
    throw new Error(`Failed to fetch data: ${error}`);
  }
}

async function fetchResource<T>(
  resource: string,
  query: string | number,
  queryParams: string = ""
): Promise<T> {
  const url = `${BASE_URL}/${resource}/${query}${queryParams ? `?${queryParams}` : ""}`;
  return fetchFromUrl<T>(url);
}

export const fetchPokemons = async (): Promise<any[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon?limit=1302`);

    return response.data.results;
  } catch (error) {
    console.error("Failed to fetch Pokémon list:", error);
    throw new Error(`Failed to fetch Pokémon list: ${error}`);
  }
};

export type PokeonItemResponse = {
  name: string;
  url: string;
};

export const fetchPokemonByNameOrId = (query: string): PokeonItemResponse[] => {
  const returnedObj = [{ name: query, url: `${BASE_URL}/pokemon/${query}` }];
  return returnedObj;
};

export const fetchPokemonsByType = async (typeName: string): Promise<any[]> => {
  const { pokemon } = await fetchResource<{ pokemon: { pokemon: { name: string } }[] }>(
    "type",
    typeName
  );
  return pokemon.map((pokemon) => pokemon.pokemon);
};

export const fetchPokemonsByGender = async (genderName: string): Promise<any[]> => {
  const pokemons = await fetchResource<any>("gender", genderName);
  return pokemons.pokemon_species_details.map((pokemon: any) => {
    const returnedObj = {
      name: pokemon.pokemon_species.name,
      url: `${BASE_URL}/pokemon/${pokemon.pokemon_species.name}`,
    };
    return returnedObj;
  });
};

export const fetchPokemonsByColor = async (colorName: string): Promise<any[]> => {
  const { pokemon_species } = await fetchResource<any>("pokemon-color", colorName);
  return pokemon_species.map((pokemon: any) => {
    const returnedObj = {
      name: pokemon.name,
      url: `${BASE_URL}/pokemon/${pokemon.name}`,
    };
    return returnedObj;
  });
};

export const fetchPokemonsByAbility = async (abilityName: string): Promise<any[]> => {
  const { pokemon } = await fetchResource<{ pokemon: { pokemon: { name: string } }[] }>(
    "ability",
    abilityName
  );
  return pokemon.map((pokemon) => pokemon.pokemon);
};

export const fetchEvolutionChainById = (id: string | number): Promise<any> => {
  return fetchResource("pokemon-species", id, "evolution_chain");
};

export const discoverPokemons = async () => {
  const pokemonList = Array.from({ length: 20 }, () => {
    const randomNumber = Math.floor(Math.random() * 101) + 100;
    return {
      name: `Pokemon ${randomNumber}`,
      url: `${BASE_URL}/pokemon/${randomNumber}`,
    };
  });

  return pokemonList;
};
