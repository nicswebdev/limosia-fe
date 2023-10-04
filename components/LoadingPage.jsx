import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../public/assets/lotties/LoadingAnimation1.json";

const LoadingPage = () => {
  return (
    <div className="h-screen bg-white grid place-content-center">
      <div className="flex items-center">
        <Lottie
          animationData={loadingAnimation}
          style={{ 
            width:250
           }}
        />
      </div>
    </div>
  );
};

export default LoadingPage;
