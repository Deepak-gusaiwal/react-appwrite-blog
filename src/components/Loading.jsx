import React from "react";

const Loading = ({ size = "16", color = "black", border = 2 }) => {
  return (
    <div className="flex items-center justify-center ">
      <div
        className={`w-${size} h-${size} border-${border} border-b-${color}-800 rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default Loading;
