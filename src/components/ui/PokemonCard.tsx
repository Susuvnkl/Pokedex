import { useState } from "react";
import PokemonType from "./PokemonType";
import { Skeleton } from "./skeleton";

interface PokemonCardProps {
  pokemonUrl?: string | "";
  pokemonId?: string | "skeleton";
  pokemonName: string | "skeleton";
  pokemonTypes?: string[] | "skeleton";
  pokemonSpritesFrontDefault: string;
  onHoverChange?: (isHovered: boolean) => void;
}

function PokemonCard(props: PokemonCardProps) {
  const { pokemonId, pokemonName, pokemonSpritesFrontDefault, pokemonTypes, onHoverChange } = props;
  const [isImageLoading, setIsImageLoading] = useState(true);

  function formatPokemonName(name: string) {
    const firstPart = name.split("-")[0];
    return firstPart.charAt(0).toUpperCase() + firstPart.slice(1);
  }

  const onImageLoad = () => {
    setIsImageLoading(false);
  };

  return (
    <div
      key={pokemonId}
      className="pokemon-card bg-white bg-opacity-50 m-2 max-w-[180px] mx-auto rounded-lg shadow-md dark:bg-black dark:bg-opacity-65 dark:shadow-neon-dark shadow-neon-light overflow-hidden relative"
      onMouseEnter={onHoverChange ? () => onHoverChange(true) : () => {}}
      onMouseLeave={onHoverChange ? () => onHoverChange(false) : () => {}}
      style={{ cursor: onHoverChange ? "none" : "auto" }}
    >
      <div className="upper-section flex flex-col justify-center items-center p-5 ">
        <div className="image-container bg-white bg-opacity-40 inline-block rounded-full overflow-hidden shadow-neon-light dark:bg-black dark:bg-opacity-40 dark:shadow-neon-dark p-2">
          <img
            src={pokemonSpritesFrontDefault}
            alt={pokemonName}
            className="rounded-full max-w-[80px]"
            style={{
              WebkitFilter: "drop-shadow(0 0 3px rgba(255, 255, 255, 1))",
              filter: "drop-shadow(0 0 3px rgba(255, 255, 255, 1))",
              display: isImageLoading ? "none" : "",
            }}
            onLoad={onImageLoad}
          />

          {isImageLoading && <Skeleton className="rounded-full w-[80px] h-[80px]" />}
        </div>
      </div>

      <div className="lower-section shadow-neon-light bg-white bg-opacity-35 dark:shadow-neon-dark border-neon-light dark:bg-opacity-5 dark:border-neon-dark p-3 pt-1 rounded-bl-lg rounded-br-lg">
        <div className="flex flex-row justify-between">
          {pokemonId === "skeleton" && isImageLoading ? (
            <Skeleton className="w-[18px] h-[16px] py-2" />
          ) : (
            <p className="text-xs">#{pokemonId}</p>
          )}
        </div>

        {pokemonName === "skeleton" && isImageLoading ? (
          <Skeleton className="w-[78px] h-[28px] mt-2" />
        ) : (
          <h2
            className="text-xl  text-gray-900 dark:text-white text-start"
            style={{
              WebkitFilter: "drop-shadow(0 0 1px rgba(255, 255, 255, 1))",
              filter: "drop-shadow(0 0 1px rgba(255, 255, 255, 0.5))",
            }}
          >
            {formatPokemonName(pokemonName)}
          </h2>
        )}

        <div className="flex justify-center space-x-2 mt-2">
          <PokemonType
            isImageLoading={isImageLoading}
            types={pokemonTypes ? pokemonTypes : "skeleton"}
          />
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
