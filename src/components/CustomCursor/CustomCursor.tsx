import { useEffect, useState } from "react";
import "./CustomCursor.css";

interface Position {
  x: number;
  y: number;
}

interface CustomCursorProps {
  visible: boolean;
  style?: React.CSSProperties;
  hovered: boolean;
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
      setTimeout(() => setClicked(false), 400);
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
        ...style,
        position: "fixed",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
};

export default CustomCursor;
