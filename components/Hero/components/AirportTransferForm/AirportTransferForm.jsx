import React, { useState } from "react";
import AirportTransferPickupView from "./views/AirportTransferPickupView";
import DateInput from "@/components/CustomInputs/DateInput";
import AirportTransferTab from "./components/AirportTransferTab/AirportTransferTab";
import AirportTransferDropoffView from "./views/AirportTransferDropoffView";
import { useRouter } from "next/router";

const AirportTransferForm = (props) => {
  const { airportData } = props;
  const router = useRouter();

  const [airportTransferData, setAirportTransferData] = useState({
    airport: undefined,
    hotel: {
      name: "",
      place_id: "",
    },
    passenger: 0,
    date: new Date(),
  });

  const [airportTab, setAirportTab] = useState("airportpickup");
  const changeAirportTab = (value) => {
    setAirportTab(value);
    setAirportTransferData({
      airport: null,
      hotel: {
        name: "",
        place_id: "",
      },
      passenger: "",
      date: new Date(),
    });
  };

  const handleAirportChange = (event) => {
    setAirportTransferData((prev) => ({
      ...prev,
      airport: event.target.value,
    }));
    // console.log(airportTransferData);
  };
  const handleHotelChange = (name, place_id) => {
    setAirportTransferData((prev) => ({
      ...prev,
      hotel: {
        name: name,
        place_id: place_id,
      },
    }));
    // console.log(airportTransferData.airport && airportTransferData.hotel);
  };
  const handleHotelFieldTyping = (event) => {
    setAirportTransferData((prev) => ({
      ...prev,
      hotel: {
        ...prev.hotel,
        name: event.target.value,
      },
    }));
  };
  const handleDateChange = (value) => {
    setAirportTransferData((prev) => ({
      ...prev,
      date: value,
    }));
  };

  const views = {
    airportpickup: AirportTransferPickupView,
    airportdropoff: AirportTransferDropoffView,
  };
  const CurrentView = views[airportTab];

  const handleBookSubmit = () => {
    if (!airportTransferData.airport) {
      alert("Please select an airport");
      return;
    }
    if (!airportTransferData.hotel.place_id) {
      alert("Please select hotel from google maps reccomendation");
      return;
    }
    const orderType = airportTab;
    router.push(
      `/car-class?booking_type=${orderType}&airport_id=${airportTransferData.airport}&hotel_place_id=${airportTransferData.hotel.place_id}&date=${airportTransferData.date}`
    );
    // console.log(airportTransferData);
  };

  return (
    <div className="flex flex-col gap-4 my-4">
      <AirportTransferTab
        activeTab={airportTab}
        changeAirportTab={changeAirportTab}
      />
      <CurrentView
        airportTransferData={airportTransferData}
        airportData={airportData}
        handleHotelChange={handleHotelChange}
        handleHotelFieldTyping={handleHotelFieldTyping}
        handleAirportChange={handleAirportChange}
      />
      {/* Airport transfer other fields */}
      <div className="flex flex-row justify-between gap-1 w-[100%]">
        <div className="bg-[#F6F6F6] rounded-[100px] self-end py-2 px-5 flex flex-col w-[47%]">
          <label className="karla text-[12px]">Date :</label>
          <DateInput
            selectedDate={airportTransferData.date}
            minDate={new Date()}
            className="form-control karla font-bold text-[16px]"
            handleDateChange={handleDateChange}
          />
        </div>
        <div className="bg-[#F6F6F6] rounded-[100px] self-end py-2 px-5 flex flex-col w-[47%]">
          <label className="karla text-[12px]">Passenger :</label>
          <select className="form-control karla font-bold text-[16px]">
            <option value="1">1</option>
            <option value="2" selected>
              2
            </option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
        </div>
      </div>
      <button
        onClick={handleBookSubmit}
        className="w-full items-center justify-center bg-[#1BA0E2] rounded-[100px] text-white font-bold karla text-center py-2 px-5 flex flex-col"
      >
        BOOK NOW
      </button>
    </div>
  );
};

export default AirportTransferForm;
