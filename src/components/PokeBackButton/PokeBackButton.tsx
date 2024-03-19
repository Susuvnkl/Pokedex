import { useEffect, useState } from "react";
import "./PokeBackButton.css";

interface PokeBackButtonProps {
  onAction: () => void;
}

function PokeBackButton(props: PokeBackButtonProps) {
  const { onAction } = props;
  const [clicked, setClicked] = useState<boolean>(false);

  useEffect(() => {
    const handleClick = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 400);
    };

    window.addEventListener("mousedown", handleClick);
    window.addEventListener("mouseup", handleClick);

    return () => {
      window.removeEventListener("mousedown", handleClick);
      window.removeEventListener("mouseup", handleClick);
    };
  }, []);

  return (
    <div onClick={() => onAction()}>
      <div className="pokemon">
        <div className="pkmn exit left">
          <div className="poke ball">
            <span className="x">
              <span className="y">
                <span className={`sprite ${clicked ? "click" : ""}`}></span>
              </span>
            </span>
          </div>
          {/* <div className="mon"></div> */}
          {/* <div className="explode"></div> */}
        </div>
      </div>
    </div>
  );
}
export default PokeBackButton;
