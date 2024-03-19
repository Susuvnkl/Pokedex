import { useState } from "react";
import PokemonType from "./PokemonType";
import { Skeleton } from "./skeleton";

interface PokemonCardProps {
  pokemonUrl?: string;
  pokemonId?: string;
  pokemonName: string;
  pokemonTypes?: string[];
  pokemonSpritesFrontDefault: string;
  onHoverChange?: (isHovered: boolean) => void; // Add this prop
}

function PokemonCard(props: PokemonCardProps) {
  const { pokemonId, pokemonName, pokemonSpritesFrontDefault, pokemonTypes, onHoverChange } = props;
  const [isImageLoading, setIsImageLoading] = useState(true); // Step 2

  function capitalizeFirstLetter(string: string) {
    return string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const onImageLoad = () => {
    // Step 3
    setIsImageLoading(false);
  };

  return (
    <div
      key={pokemonId}
      className="pokemon-card bg-white bg-opacity-50 m-2 max-w-[175px] mx-auto rounded-lg shadow-md dark:bg-black dark:bg-opacity-65 dark:shadow-neon-dark shadow-neon-light overflow-hidden relative"
      onMouseEnter={onHoverChange ? () => onHoverChange(true) : () => {}} // Signal that mouse is over the card
      onMouseLeave={onHoverChange ? () => onHoverChange(false) : () => {}} // Signal that mouse has left the card
      style={{ cursor: onHoverChange ? "none" : "auto" }}
    >
      {/* Upper Section */}
      <div className="upper-section flex flex-col justify-center items-center p-5 ">
        {isImageLoading && <Skeleton />} {/* Step 4 */}
        <div className="image-container bg-white bg-opacity-40 inline-block rounded-full overflow-hidden shadow-neon-light dark:bg-black dark:bg-opacity-40 dark:shadow-neon-dark p-2">
          <img
            src={pokemonSpritesFrontDefault}
            alt={pokemonName}
            className="rounded-full max-w-[80px]"
            style={{
              WebkitFilter: "drop-shadow(0 0 3px rgba(255, 255, 255, 1))",
              filter: "drop-shadow(0 0 3px rgba(255, 255, 255, 1))",
            }}
            onLoad={onImageLoad} // Step 5
          />
        </div>
      </div>

      {/* Lower Section */}
      <div className="lower-section shadow-neon-light bg-white bg-opacity-35 dark:shadow-neon-dark border-neon-light dark:bg-opacity-5 dark:border-neon-dark p-3 pt-1 rounded-bl-lg rounded-br-lg">
        <div className="flex flex-row justify-between">
          {pokemonId && <p className="text-xs">#{pokemonId}</p>}
          {/* <div className="w-[12px]">
            <FemaleLogo />
          </div>{" "} */}
        </div>
        <h2
          className="text-xl  text-gray-900 dark:text-white text-start"
          style={{
            WebkitFilter: "drop-shadow(0 0 1px rgba(255, 255, 255, 1))",
            filter: "drop-shadow(0 0 1px rgba(255, 255, 255, 0.5))",
          }}
        >
          {capitalizeFirstLetter(pokemonName)}
        </h2>
        {pokemonTypes && (
          <div className="flex justify-center space-x-2 mt-2">
            <PokemonType types={pokemonTypes} />
          </div>
        )}
      </div>
    </div>
  );
}

export default PokemonCard;
