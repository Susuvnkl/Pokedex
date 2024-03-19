// import { fetchEvolutionChainById } from "@/api/pokemonApi";
import CustomCarousel from "@/components/Carousel/CustomCarousel";
import PokeBackButton from "@/components/PokeBackButton/PokeBackButton";
import PokemonType from "@/components/ui/PokemonType";
import { usePokemonContext } from "@/context/PokemonContext";
// import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface Sprites {
  [key: string]: string | null | { [key: string]: any };
}

function PokemonPage() {
  const navigate = useNavigate();
  const { selectedPokemon } = usePokemonContext();
  // Fetch evolution chain based on Pokémon ID
  // const {
  //   data: evolutionChain,
  //   isLoading: isLoadingEvolutionChain,
  //   error: evolutionChainError,
  // } = useQuery({
  //   queryKey: ["evolutionChain", selectedPokemon.name],
  //   queryFn: () => fetchEvolutionChainById(selectedPokemon.name),
  // });

  console.log(selectedPokemon);

  // if (isLoadingEvolutionChain) return <div>Loading evolution chain...</div>;
  // if (evolutionChainError) return <div>An error occurred while fetching the evolution chain.</div>;

  // Function to recursively render evolution chain (similar to your existing renderEvolutionChain)
  // function renderEvolutionChain(chain: any) {
  //   if (!chain) return null;
  //   return (
  //     <ul>
  //       <li>{chain.species.name}</li>
  //       {chain.evolves_to.length > 0 && (
  //         <ul>
  //           {chain.evolves_to.map((nextChain: any) => (
  //             <li key={nextChain.species.name}>{renderEvolutionChain(nextChain)}</li>
  //           ))}
  //         </ul>
  //       )}
  //     </ul>
  //   );
  // }

  function extractFrontSprites(sprites: Sprites): Array<{ url: string; name: string }> {
    const frontSprites: Array<{ url: string; name: string }> = [];

    // Extracting from the top level of sprites
    Object.entries(sprites).forEach(([key, value]) => {
      if (key.includes("front") && typeof value === "string") {
        // Format the key name for display
        const formattedName = key
          .replace(/_/g, " ")
          .replace(/\b(\w)/g, (char) => char.toUpperCase());
        frontSprites.push({ url: value, name: formattedName });
      }
    });

    // Skipping 'other' property logic

    return frontSprites;
  }

  const frontSprites = extractFrontSprites(selectedPokemon.sprites);

  return (
    <div className="flex flex-col">
      <PokeBackButton onAction={() => navigate(-1)} />

      <div className="upper-section flex flex-col justify-center items-center p-5 mt-5">
        <h2
          className="text-5xl  text-gray-900 dark:text-white text-start mb-5"
          style={{
            WebkitFilter: "drop-shadow(0 0 1px rgba(255, 255, 255, 1))",
            filter: "drop-shadow(0 0 1px rgba(255, 255, 255, 0.5))",
          }}
        >
          #{selectedPokemon.id}:
        </h2>
        <h2
          className="text-5xl  text-gray-900 dark:text-white text-start mb-5"
          style={{
            WebkitFilter: "drop-shadow(0 0 1px rgba(255, 255, 255, 1))",
            filter: "drop-shadow(0 0 1px rgba(255, 255, 255, 0.5))",
          }}
        >
          {selectedPokemon.name.charAt(0).toUpperCase() + selectedPokemon.name.slice(1)}
        </h2>
        <div className="image-container bg-white bg-opacity-40 inline-block rounded-full overflow-hidden shadow-neon-light dark:bg-black dark:bg-opacity-40 dark:shadow-neon-dark p-2">
          <img
            src={selectedPokemon.sprites.other["official-artwork"].front_default}
            alt={selectedPokemon.name}
            className="rounded-full max-w-[200px]"
            style={{
              WebkitFilter: "drop-shadow(0 0 3px rgba(255, 255, 255, 1))",
              filter: "drop-shadow(0 0 3px rgba(255, 255, 255, 1))",
            }}
          />
        </div>
      </div>
      {/* <div className="w-[260px]"> */}
      <div className="bg-white bg-opacity-50 m-2 w-4/5 mx-auto rounded-lg shadow-md dark:bg-black dark:bg-opacity-65 dark:shadow-neon-dark shadow-neon-light overflow-hidden relative max-w-[280px]">
        <div className="lower-section shadow-neon-light bg-white bg-opacity-35 dark:shadow-neon-dark border-neon-light dark:bg-opacity-5 dark:border-neon-dark p-3 pt-1 rounded-bl-lg rounded-br-lg">
          <div className="flex flex-row justify-center">
            <p className="text-m">Type:</p>
          </div>
          <div className="flex justify-center space-x-2 mt-2">
            <PokemonType types={selectedPokemon.types.map((t: any) => t.type.name)} />
          </div>
        </div>
      </div>

      <div className="bg-white bg-opacity-50 m-2 w-4/5 mx-auto rounded-lg shadow-md dark:bg-black dark:bg-opacity-65 dark:shadow-neon-dark shadow-neon-light overflow-hidden relative max-w-[280px]">
        <div className="flex flex-row justify-between p-3 ">
          <div className="flex flex-row">
            <p className="text-m font-bold">Height:</p>
            <p className="text-m ml-2">{selectedPokemon.height / 10}m</p>
          </div>
          <div className="flex flex-row">
            <p className="text-m font-bold">Weight:</p>
            <p className="text-m ml-2">{selectedPokemon.weight / 10}kg</p>
          </div>
        </div>
      </div>
      {/* <div> {evolutionChain && renderEvolutionChain(evolutionChain.chain)}</div> */}
      <div className="flex justify-center ">
        <CustomCarousel>
          {frontSprites.map((sprite, index) => (
            <div
              key={index}
              className="mb-3 bg-white bg-opacity-50 m-2 w-4/5 mx-auto rounded-lg shadow-md dark:bg-black dark:bg-opacity-65 dark:shadow-neon-dark shadow-neon-light overflow-hidden relative max-w-[280px] flex flex-col items-center"
            >
              <img src={sprite.url} alt={`${selectedPokemon.name} ${sprite.name}`} />
              <p className="text-center mb-2">{sprite.name}</p>
            </div>
          ))}
        </CustomCarousel>
      </div>
    </div>
  );
}

export default PokemonPage;
