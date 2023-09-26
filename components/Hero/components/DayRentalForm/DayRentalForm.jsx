import React, { useState } from "react";
import DateInput from "@/components/CustomInputs/DateInput";
import AutoCompleteHotelInput from "@/components/CustomInputs/AutoCompleteHotelInput";

const DayRentalForm = (props) => {
  const [dayRentalData, setDayRentalData] = useState({
    delivery: {
      name: "",
      place_id: "",
    },
    date: new Date(),
  });
  const handleDeliveryChange = (name, place_id) => {
    setDayRentalData((prev) => ({
      ...prev,
      delivery: {
        name: name,
        place_id: place_id,
      },
    }));
  };
  const handleDeliveryFieldTyping = (event) => {
    setDayRentalData((prev) => ({
      ...prev,
      delivery: {
        ...prev.hotel,
        name: event.target.value,
      },
    }));
  };
  const handleDateChange = (value) => {
    setDayRentalData((prev) => ({
      ...prev,
      date: value,
    }));
  };
  const handleBookSubmit = () => {
    console.log(dayRentalData);
  };
  return (
    <div className="flex flex-col gap-4 my-4">
      <div className="bg-[#F6F6F6] rounded-[100px] py-2 px-5 flex flex-col">
        <label className="karla text-[12px]">From :</label>
        <AutoCompleteHotelInput
          value={dayRentalData.delivery.name}
          changeSearchHotel={handleDeliveryChange}
          onChange={handleDeliveryFieldTyping}
          className="form-control karla font-bold text-[16px]"
        />
      </div>
      {/* Airport transfer other fields */}
      <div className="flex flex-row justify-between gap-1 w-[100%]">
        <div className="bg-[#F6F6F6] rounded-[100px] self-end py-2 px-5 flex flex-col w-[47%]">
          <label className="karla text-[12px]">Date :</label>
          <DateInput
            selectedDate={dayRentalData.date}
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

export default DayRentalForm;
