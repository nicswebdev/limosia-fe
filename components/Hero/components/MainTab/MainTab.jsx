import React from "react";

const MainTab = (props) => {
  const { activeTab, changeTab } = props;

  const views = {
    airporttransfer: () => {
      return (
        <div className="flex py-1 px-1 w-full  mb-3 bg-[#F6F6F6] rounded-full">
          <button className="w-1/2 bg-[#ED7A48] text-white py-1.5 mx-1 rounded-full font-medium karla">
            Airport Transfer
          </button>
          <button
            onClick={() => {
              changeTab("dayrental");
            }}
            className="w-1/2 bg-[#F6F6F6] text-black py-1.5 mx-1 rounded-full font-medium karla"
          >
            Day Rental
          </button>
        </div>
      );
    },
    dayrental: () => {
      return (
        <div className="flex py-1 px-1 w-full  mb-3 bg-[#F6F6F6] rounded-full">
          <button
            onClick={() => {
              changeTab("airporttransfer");
            }}
            className="w-1/2 bg-[#F6F6F6] text-black py-1.5 mx-1 rounded-full font-medium karla"
          >
            Airport Transfer
          </button>
          <button className="w-1/2 bg-[#ED7A48] text-white py-1.5 mx-1 rounded-full font-medium karla">
            Day Rental
          </button>
        </div>
      );
    },
  };

  const CurrentView = views[activeTab];

  return <CurrentView />;
};

export default MainTab;
