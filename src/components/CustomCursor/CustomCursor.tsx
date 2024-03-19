import { useEffect, useState } from "react";
import "./CustomCursor.css";

interface Position {
  x: number;
  y: number;
}

interface CustomCursorProps {
  visible: boolean;
  style?: React.CSSProperties;
  hovered: boolean; // Add this prop
}

const CustomCursor = (props: CustomCursorProps) => {
  const { visible, style, hovered } = props;
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [clicked, setClicked] = useState<boolean>(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX - 20, y: e.clientY - 20 });
    };

    const handleClick = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 400); // Reset after animation
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mousedown", handleClick);
    window.addEventListener("mouseup", handleClick);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mousedown", handleClick);
      window.removeEventListener("mouseup", handleClick);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`custom-cursor ${hovered ? "hover" : ""} ${clicked ? "click" : ""}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        ...style, // Apply additional styles passed via props
        position: "fixed", // Ensure the custom cursor is positioned relative to the viewport
        pointerEvents: "none", // Prevent the cursor from interfering with other elements
        zIndex: 9999, // Ensure the cursor is above most other elements
      }}
    />
  );
};

export default CustomCursor;
