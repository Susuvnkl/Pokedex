import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function EvolutionsChain() {
  const fetchPokemonEvolutionChain = async () => {
    try {
      const speciesResponse = await axios.get("https://pokeapi.co/api/v2/pokemon-species/1/");
      const evolutionChainUrl = speciesResponse.data.evolution_chain.url;
      const evolutionChainResponse = await axios.get(evolutionChainUrl);
      return evolutionChainResponse.data;
    } catch (error) {
      console.error("Error fetching evolution chain:", error);
      return null;
    }
  };

  //   const fetchPokemons = async () => {
  //     const POKEMON_API = `https://pokeapi.co/api/v2/pokemon?limit=20`;
  //     const response = await axios.get(POKEMON_API);

  //     // Fetching details for each Pokemon concurrently, including evolution chain
  //     const pokemonDetails = await Promise.all(
  //       response.data.results.map(async (pokemon) => {
  //         const detailResponse = await axios.get(pokemon.url);
  //         const pokemonData = detailResponse.data;

  //         // Fetch evolution chain
  //         const evolutionChain = await fetchPokemonEvolutionChain(pokemonData.species.url);

  //         // Here you could process the evolutionChain data to simplify it if needed
  //         // For example, extracting just the names of the evolution stages

  //         return {
  //           ...pokemonData,
  //           evolutionChain, // Add the evolution chain data to the pokemon details
  //         };
  //       })
  //     );

  //     return pokemonDetails;
  //   };

  const {
    data: Yosi,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pokemon2"],
    queryFn: fetchPokemonEvolutionChain,
  });

  console.log(Yosi);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred: {error.message}</div>;

  return (
    <div className="pokemon-grid">
      {/* {Yosi?.map((pokemon: any) => (
        <div key={pokemon.id} className="pokemon-card">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} title={pokemon.name} />
          <h2>{pokemon.name}</h2>
        </div>
      ))} */}
    </div>
  );
}

export default EvolutionsChain;
