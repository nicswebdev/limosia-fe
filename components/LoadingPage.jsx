import React from "react";

const LoadingPage = () => {
  return (
    <div className="h-screen bg-white grid place-content-center">
      <div className="flex items-center">
        <div class="animate-spin w-24 " viewBox="0 0 24 24">
          <img className="" src="/assets/icon-ac.png" alt="wheel" />{" "}
        </div>
        <h1 className="text-center font-bold karla text-3xl">Loading...</h1>
      </div>
    </div>
  );
};

export default LoadingPage;
