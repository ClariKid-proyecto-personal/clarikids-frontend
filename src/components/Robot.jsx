import Lottie from "lottie-react";
import robotAnimation from "../assets/robot.json";

function Robot() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "0",
        left: "0",
        width: "300px",
        pointerEvents: "none",
        zIndex: "-1",
      }}
    >
      <Lottie animationData={robotAnimation} loop={true} />
    </div>
  );
}

export default Robot;