import "./PokeballAnimation.css";
interface PokeballAnimationProps {
  side: "left" | "right";
}
function PokeballAnimation(props: PokeballAnimationProps) {
  const { side } = props;
  return (
    <div className="w-full h-full flex justify-center mt-5">
      <div className="pokemon ">
        {side === "left" && (
          <div className="pkmn exit left">
            <div className="poke ball">
              <span className="x">
                <span className="y">
                  <span className="sprite"></span>
                </span>
              </span>
            </div>
            {/* <div className="mon"></div> */}
            <div className="explode"></div>
          </div>
        )}
        {side === "right" && (
          <div className="pkmn exit right">
            <div className="poke ball">
              <span className="x">
                <span className="y">
                  <span className="sprite"></span>
                </span>
              </span>
            </div>
            {/* <div className="mon"></div> */}
            <div className="explode"></div>
          </div>
        )}
      </div>
    </div>
  );
}
export default PokeballAnimation;
