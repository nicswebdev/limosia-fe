import React from "react";

const HeroSkeleton = () => {
  return (
    <div className="absolute right-[7%]  md:right-[5%] top-[20%]  w-[85%] md:w-[30%] h-3/4 animate-pulse ">
      <div className="w-full mb-3 h-[10%] bg-white rounded-full grid grid-cols-1 place-items-center">
        <div className="w-[95%] bg-[#d3d3d3] h-[70%] rounded-full" />
      </div>
      <div className="bg-white h-3/4 rounded-md p-4 flex flex-col content-center">
        <div className="w-full bg-[#d3d3d3] h-[12%] rounded-full" />
        <div className="w-full bg-[#d3d3d3] h-[12%] rounded-full mt-10" />
        <div className="w-full bg-[#d3d3d3] h-[12%] rounded-full mt-5" />
        <div className="flex space-x-2 h-[12%] mt-5">
          <div className="w-full bg-[#d3d3d3] h-full rounded-full" />
          <div className="w-full bg-[#d3d3d3] h-full rounded-full" />
        </div>
        <div className="w-full bg-[#d3d3d3] h-[12%] rounded-full mt-5" />
      </div>
    </div>
  );
};

export default HeroSkeleton;
