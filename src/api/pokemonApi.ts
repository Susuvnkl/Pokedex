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

const limit: number = 20;

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
    // Assuming the response data structure matches your provided example:
    // { count: number, next: string, previous: string, results: Array<{name: string, url: string}> }
    return response.data.results; // Directly return the list
  } catch (error) {
    console.error("Failed to fetch Pokémon list:", error);
    throw new Error(`Failed to fetch Pokémon list: ${error}`);
  }
};
// export const fetchPokemons = async (): Promise<PokemonDetail[]> => {
//   const queryParams = `limit=${limit}`;
//   const { results } = await fetchResource<{ results: { name: string; url: string }[] }>(
//     "pokemon",
//     "",
//     queryParams
//   );

//   return Promise.all(results.map((pokemon) => fetchFromUrl<PokemonDetail>(pokemon.url)));
// };

export const fetchPokemonByNameOrId = (query: string | number): Promise<PokemonDetail> => {
  return fetchResource<PokemonDetail>("pokemon", query);
};

export const fetchPokemonsByType = async (typeName: string): Promise<PokemonDetail[]> => {
  const { pokemon } = await fetchResource<{ pokemon: { pokemon: { name: string } }[] }>(
    "type",
    typeName
  );
  return pokemon.map((pokemon) => pokemon.pokemon);
  // return Promise.all(pokemon.map((entry) => fetchPokemonByNameOrId(entry.pokemon.name)));
};

// export const fetchPokemonsByGender = async (genderName: string): Promise<PokemonDetail[]> => {
//   const pokemons = await fetchResource<genderDetail[]>("gender", genderName);
//   console.log("test", pokemons.pokemon_species_details);
//   return Promise.all(
//     pokemons.pokemon_species_details.map((entry: genderDetail) =>
//       fetchPokemonByNameOrId(entry.pokemon_species.name)
//     )
//   );
// };

// Fetch Pokémons by color
// export const fetchPokemonsByColor = async (colorName: string): Promise<PokemonDetail[]> => {
//   const pokemon = await fetchResource<{ pokemon: { pokemon: { name: string } }[] }>(
//     "pokemon-color",
//     colorName
//   );
//   console.log(pokemon);
//   return Promise.all(pokemon.pokemon_species.map((entry) => fetchPokemonByNameOrId(entry.name)));
// };

// Fetch Pokémons by ability

export const fetchPokemonsByAbility = async (abilityName: string): Promise<PokemonDetail[]> => {
  const { pokemon } = await fetchResource<{ pokemon: { pokemon: { name: string } }[] }>(
    "ability",
    abilityName
  );
  return Promise.all(pokemon.map((entry) => fetchPokemonByNameOrId(entry.pokemon.name)));
};

export const fetchEvolutionChainById = (id: string | number): Promise<any> => {
  return fetchResource("pokemon-species", id, "evolution_chain");
};
