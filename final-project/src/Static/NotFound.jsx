import React from "react";
import { GiPlug } from "react-icons/gi";
import { useNavigate } from "react-router";

export default function NotFound() {
  let navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/");
  };
  return (
    <div className="min-h-screen min-w-full flex justify-center bg-gray-100 items-center">
      <div>
        <div className="flex justify-around items-center text-6xl flex-col font-normal lg:text-9xl font-bold gap-x-1 lg:gap-x-10 mb-10 text-gray-900">
          <div>
            <GiPlug />
          </div>
          <div>
            <h1>404</h1>
          </div>
        </div>
        <div className="w-full flex flex-col gap-y-5 items-center">
          <div>
            <h2 className="text-4xl font-bold font-round">Not found!</h2>
          </div>
          <div>
            <p className="text-lg md:text-2xl">
              Sorry, we couldn't find the requested page
            </p>
          </div>
          <div>
            <button
              onClick={handleGoBack}
              className="bg-purple-600 hover:bg-purple-700 text-gray-100 w-24 h-10 rounded-xl font-semibold"
            >
              Go home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
