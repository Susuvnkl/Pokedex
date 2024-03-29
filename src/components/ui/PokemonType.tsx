import { pokemonTypesWithColors } from "@/data/pokemonTypesWithColors";
import { useEffect, useState } from "react";
import { Skeleton } from "./skeleton";

interface PokemonTypeProps {
  types: "skeleton" | string[];
  isImageLoading: boolean;
}

function PokemonType(props: PokemonTypeProps) {
  const [typesWithColors, setTypesWithColors] = useState<{ typeName: string; color: string }[]>([]);
  const { types, isImageLoading } = props;

  useEffect(() => {
    if (types !== "skeleton") {
      const processedTypes = types.map((type) => {
        const foundType = pokemonTypesWithColors.find(
          (pokemonType) => pokemonType.name === type.toLowerCase()
        );
        return foundType
          ? { typeName: type.charAt(0).toUpperCase() + type.slice(1), color: foundType.color }
          : { typeName: type, color: "#FFFFFF" };
      });
      setTypesWithColors(processedTypes);
    }
  }, [types]);

  if (types === "skeleton" && isImageLoading) {
    return (
      <Skeleton className="type-wrapper flex w-[100px] h-[20px] rounded overflow-hidden relative shadow-md" />
    );
  }

  return (
    <div
      className="type-wrapper flex"
      style={{
        display: "flex",
        width: "100%",
        borderRadius: "4px",
        overflow: "hidden",
        position: "relative",
        WebkitFilter: "drop-shadow(0 0 3px rgba(255, 255, 255, 1))",
        filter: "drop-shadow(0 0 3px rgba(255, 255, 255, 1))",
      }}
    >
      {typesWithColors.length === 2 ? (
        <>
          <div
            style={{
              flex: "0 0 45%",
              backgroundColor: typesWithColors[0].color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              zIndex: 1,
            }}
          >
            <span className={"text-sm"} style={{ paddingLeft: "2px" }}>
              {typesWithColors[0].typeName}
            </span>
          </div>

          <div
            style={{
              flex: "1",
              backgroundColor: typesWithColors[1].color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              position: "relative",
              marginRight: "-8px",
            }}
          >
            <span className="text-sm">{typesWithColors[1].typeName}</span>

            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: "-10%",
                right: "90%",
                backgroundColor: typesWithColors[0].color,
                transform: "skewX(-10deg)",
                transformOrigin: "top left",
                zIndex: 0,
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
