import AutoCompleteHotelInput from "@/components/CustomInputs/AutoCompleteHotelInput";
import React from "react";

const AirportTransferPickupView = (props) => {
  const {
    airportData,
    airportTransferData,
    handleHotelChange,
    handleHotelFieldTyping,
    handleAirportChange,
  } = props;
  return (
    <>
      <div className="bg-[#F6F6F6] rounded-[100px] py-2 px-5 flex flex-col">
        <label className="karla text-[12px]">From :</label>
        <select
          value={airportTransferData.airport}
          className="form-control karla font-bold text-[16px]"
          onChange={handleAirportChange}
        >
          <option value={undefined} hidden>
            Select Airport
          </option>
          {airportData.items.map((airport) => {
            return (
              <option value={airport.id} className="" key={airport.id}>
                {airport.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="bg-[#F6F6F6] rounded-[100px] py-2 px-5 flex flex-col">
        <label className="karla text-[12px]">To :</label>
        <AutoCompleteHotelInput
          value={airportTransferData.hotel.name}
          changeSearchHotel={handleHotelChange}
          onChange={handleHotelFieldTyping}
          className="form-control karla font-bold text-[16px]"
        />
        {/* <input
          type="text"
          placeholder="Type your destination"
          ref={autocompleteDestinationRef}
          className="form-control karla font-bold text-[16px]"
        /> */}
      </div>
    </>
  );
};

export default AirportTransferPickupView;
