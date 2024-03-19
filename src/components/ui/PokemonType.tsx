import { pokemonTypesWithColors } from "@/data/pokemonTypesWithColors";
import { useEffect, useState } from "react";

interface PokemonTypeProps {
  types: string[];
}

function PokemonType(props: PokemonTypeProps) {
  const [typesWithColors, setTypesWithColors] = useState<{ typeName: string; color: string }[]>([]);
  const { types } = props;

  useEffect(() => {
    const processedTypes = types.map((type) => {
      const foundType = pokemonTypesWithColors.find(
        (pokemonType) => pokemonType.name === type.toLowerCase()
      );
      return foundType
        ? { typeName: type.charAt(0).toUpperCase() + type.slice(1), color: foundType.color }
        : { typeName: type, color: "#FFFFFF" };
    });
    setTypesWithColors(processedTypes);
  }, [types]);

  return (
    <div
      className="type-wrapper flex"
      style={{
        display: "flex",
        width: "100%",
        borderRadius: "4px",
        overflow: "hidden",
        position: "relative", // Needed for absolute positioning of the overlay
        WebkitFilter: "drop-shadow(0 0 3px rgba(255, 255, 255, 1))",
        filter: "drop-shadow(0 0 3px rgba(255, 255, 255, 1))",
      }}
    >
      {typesWithColors.length === 2 ? (
        <>
          {/* Left container, make it a bit larger than half the width */}
          <div
            style={{
              flex: "0 0 45%", // Using flex-grow, flex-shrink, and flex-basis
              backgroundColor: typesWithColors[0].color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              zIndex: 1, // Ensure this div is above the overlay
            }}
          >
            <span style={{ paddingLeft: "2px" }}>{typesWithColors[0].typeName}</span>
          </div>

          {/* Right container */}
          <div
            style={{
              flex: "1",
              backgroundColor: typesWithColors[1].color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              position: "relative", // To contain the overlay
            }}
          >
            <span>{typesWithColors[1].typeName}</span>

            {/* Overlay: Skewed div that covers part of the left container */}
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: "-10%", // Start a bit to the left of the container's edge
                right: "90%", // End at the halfway point of the container
                backgroundColor: typesWithColors[0].color,
                transform: "skewX(-10deg)",
                transformOrigin: "top left",
                zIndex: 0, // Ensure this is below the text
              }}
            />
          </div>
        </>
      ) : (
        <div
          style={{
            width: "100%",
            backgroundColor: typesWithColors[0]?.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          <span>{typesWithColors[0]?.typeName}</span>
        </div>
      )}
    </div>
  );
}

export default PokemonType;
