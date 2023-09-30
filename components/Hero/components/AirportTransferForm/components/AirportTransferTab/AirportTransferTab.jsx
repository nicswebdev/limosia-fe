import React from "react";

const AirportTransferTab = (props) => {
  const { activeTab, changeAirportTab } = props;

  const views = {
    airportpickup: () => {
      return (
        <div className="flex py-1 px-1 w-full  mb-3 bg-[#F6F6F6] rounded-full">
          <button className="w-1/2 bg-[#ED7A48] text-white py-1.5 mx-1 rounded-full font-medium karla">
            Airport Pickup
          </button>
          <button
            onClick={() => {
              changeAirportTab("airportdropoff");
            }}
            className="w-1/2 bg-[#F6F6F6] text-black py-1.5 mx-1 rounded-full font-medium karla"
          >
            Airport Drop Off
          </button>
        </div>
      );
    },
    airportdropoff: () => {
      return (
        <div className="flex py-1 px-1 w-full  mb-3 bg-[#F6F6F6] rounded-full">
          <button
            onClick={() => {
              changeAirportTab("airportpickup");
            }}
            className="w-1/2 bg-[#F6F6F6] text-black py-1.5 mx-1 rounded-full font-medium karla"
          >
            Airport Pickup
          </button>
          <button className="w-1/2 bg-[#ED7A48] text-white py-1.5 mx-1 rounded-full font-medium karla">
            Airport Drop Off
          </button>
        </div>
      );
    },
  };

  const CurrentView = views[activeTab];

  return <CurrentView />;
};

export default AirportTransferTab;
