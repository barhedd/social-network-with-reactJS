import React from "react";
import { GiWrappedSweet } from "react-icons/gi";

function LoadingScreen() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="text-5xl xl:text-7xl font-semibold flex gap-x-5 text-purple-700">
        <GiWrappedSweet className="animate-spin" />
        <p>Loading</p>
      </div>
    </div>
  );
}

export default LoadingScreen;
