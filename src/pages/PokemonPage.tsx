import "./PokemonPage.css";
import CustomCarousel from "@/components/Carousel/CustomCarousel";
import PokeBackButton from "@/components/PokeBackButton/PokeBackButton";
import PokemonType from "@/components/ui/PokemonType";
import { Skeleton } from "@/components/ui/skeleton";
import { usePokemonContext } from "@/context/PokemonContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Sprites {
  [key: string]: string | null | { [key: string]: any };
}

function PokemonPage() {
  const navigate = useNavigate();
  const { selectedPokemon } = usePokemonContext();
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [showGif, setShowGif] = useState(false);

  const onImageLoad = () => {
    setIsImageLoading(false);
  };

  function extractFrontSprites(sprites: Sprites): Array<{ url: string; name: string }> {
    const frontSprites: Array<{ url: string; name: string }> = [];

    Object.entries(sprites).forEach(([key, value]) => {
      if (key.includes("front") && typeof value === "string") {
        const formattedName = key
          .replace(/_/g, " ")
          .replace(/\b(\w)/g, (char) => char.toUpperCase());
        frontSprites.push({ url: value, name: formattedName });
      }
    });

    return frontSprites;
  }

  function formatPokemonName(name: string) {
    const firstPart = name.split("-")[0];
    return firstPart.charAt(0).toUpperCase() + firstPart.slice(1);
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGif(true);
    }, 1450);

    return () => clearTimeout(timer);
  }, []);

  const frontSprites = extractFrontSprites(selectedPokemon.sprites);

  return (
    <div className="flex flex-col">
      <div className="w-full">
        <PokeBackButton onAction={() => navigate(-1)} />
        {showGif && (
          <>
            <img
              className="gif absolute top-8 left-16 scale-75 fadeIn"
              src={selectedPokemon.sprites.other.showdown.front_default}
              alt={selectedPokemon.name}
            />
            <p className="text-xs absolute top-4 left-16 opacity-20 fadeInOut">
              Click on the Pokéball to go back
            </p>
          </>
        )}
      </div>
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
          {formatPokemonName(selectedPokemon.name)}
        </h2>
        <div className="image-container bg-white bg-opacity-40 inline-block rounded-full overflow-hidden shadow-neon-light dark:bg-black dark:bg-opacity-40 dark:shadow-neon-dark p-2">
          <img
            src={selectedPokemon.sprites.other["official-artwork"].front_default}
            alt={selectedPokemon.name}
            className="rounded-full max-w-[200px]"
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
      <div className="bg-white bg-opacity-50 m-2 w-4/5 mx-auto rounded-lg shadow-md dark:bg-black dark:bg-opacity-65 dark:shadow-neon-dark shadow-neon-light overflow-hidden relative max-w-[240px]">
        <div className="lower-section shadow-neon-light bg-white bg-opacity-35 dark:shadow-neon-dark border-neon-light dark:bg-opacity-5 dark:border-neon-dark p-3 pt-1 rounded-bl-lg rounded-br-lg">
          <div className="flex flex-row justify-center">
            <p className="text-m">Type:</p>
          </div>
          <div className="flex justify-center space-x-2 mt-2">
            <PokemonType types={selectedPokemon.types.map((t: any) => t.type.name)} />
          </div>
        </div>
      </div>
      <div className="bg-white bg-opacity-50 m-2 w-4/5 mx-auto rounded-lg shadow-md dark:bg-black dark:bg-opacity-65 dark:shadow-neon-dark shadow-neon-light overflow-hidden relative max-w-[240px]">
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
      <div className="mb-3 bg-white bg-opacity-50 m-2 w-4/5 mx-auto rounded-lg shadow-md dark:bg-black dark:bg-opacity-65 dark:shadow-neon-dark shadow-neon-light  relative max-w-[240px] p-3">
        <CustomCarousel>
          {frontSprites.map((sprite, index) => (
            <div className=" flex flex-col items-center justify-center" key={index}>
              <img
                onLoad={onImageLoad}
                src={sprite.url}
                alt={`${selectedPokemon.name} ${sprite.name}`}
                style={{ display: isImageLoading ? "none" : "" }}
              />
              {isImageLoading && <Skeleton className="rounded-full w-[80px] h-[80px]" />}

              <p className="text-center mb-2">{sprite.name}</p>
            </div>
          ))}
        </CustomCarousel>
      </div>
    </div>
  );
}

export default PokemonPage;
