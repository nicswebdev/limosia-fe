import AutoCompleteHotelInput from "@/components/CustomInputs/AutoCompleteHotelInput";
import DateInput from "@/components/CustomInputs/DateInput";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const PickupView = (props) => {
  const router = useRouter();
  const { currentAirportId, allAirportData, currentHotel, date } = props;

  const [formData, setFormData] = useState({
    airport: currentAirportId,
    hotel: {
      name: currentHotel?.name,
      place_id: currentHotel?.place_id,
    },
    date: new Date(date.getTime()-(8 * 60 * 60 * 1000)),
  });
  console.log(formData.date)

  const handleDateChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      date: value,
    }));
  };

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const handleAirportPlaceIdChange = (name, place_id) => {
    setFormData((prev) => ({
      ...prev,
      hotel: {
        name: name,
        place_id: place_id,
      },
    }));
  };
  const handleAirportFieldTyping = (event) => {
    setFormData((prev) => ({
      ...prev,
      hotel: {
        ...prev.hotel,
        name: event.target.value,
      },
    }));
  };
  const handleChangeBookingSubmit = () => {
    // console.log(formData);
    const { booking_type, guest_number } = router.query;
    // const newDate = unfixedDate;
    const newLink = `/car-class?booking_type=${booking_type}&airport_id=${formData.airport}&hotel_place_id=${formData.hotel.place_id}&date=${formData.date}&guest_number=${guest_number}`;
    router.push(newLink);
  };
  useEffect(() => {
    console.log(formData.hotel);
  }, [formData.hotel]);
  return (
    <form className="flex flex-col md:flex-row max-md:gap-4 justify-between md:items-center px-4 md:px-8 py-4 mb-5 rounded-[0.625rem] box-shadow bg-gray-light">
      {/* Origin */}
      <div className="flex gap-5 items-center">
        <img
          src="/assets/images/icons/icon-park-outline_to-bottom.svg"
          alt="Icon"
          class="w-6"
        />
        {/* This is the airport field */}
        <div className="flex flex-col flex-shrink-0 gap-[0.375rem]">
          <div className="flex items-center">
            <label for="airport" className="text-xs font-bold leading-none">
              FROM
            </label>
          </div>
          {/* //Airport Dropdown */}
          <select
            name="airport"
            onChange={handleChange}
            value={formData.airport}
            className="flex flex-col bg-white text-xs leading-none text-gray-dark karla font-bold bg-[#F6F6F6] rounded-md p-2 hover:cursor-pointer"
            // defaultValue={currentAirportId}
          >
            {allAirportData.items.map((airport) => {
              return (
                <option key={airport.id} value={airport.id}>
                  {airport.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* This is the destination field*/}
      <div className="flex gap-5 items-center">
        <img
          src="/assets/images/icons/icon-park-outline_to-bottom.svg"
          alt="Icon"
          className="w-6 rotate-180"
        />
        <div className="flex flex-col flex-shrink-0 gap-[0.375rem]">
          <label for="destination" className="text-xs font-bold leading-none">
            DESTINATION
          </label>
          {/* //Hotel search */}
          <AutoCompleteHotelInput
            onChange={handleAirportFieldTyping}
            value={formData.hotel.name}
            changeSearchHotel={handleAirportPlaceIdChange}
            className="bg-white text-xs leading-none text-gray-dark karla font-bold rounded-md p-2"
          />
        </div>
      </div>

      {/* Date Field */}
      <div className="flex gap-5 items-center">
        <img
          src="/assets/images/icons/uiw_date.svg"
          alt="Icon"
          className="w-6 px-[0.125rem]"
        />
        <div className="flex flex-col flex-shrink-0 gap-[0.375rem]">
          <label for="date" className="text-xs font-bold leading-none">
            DATE
          </label>
          <DateInput
            selectedDate={formData.date}
            minDate={new Date()}
            className="flex flex-col bg-white text-xs leading-none text-gray-dark karla font-bold bg-[#F6F6F6] rounded-md p-2"
            handleDateChange={handleDateChange}
          />
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={handleChangeBookingSubmit}
          className="text-xs font-bold leading-none text-orange-light"
        >
          CHANGE BOOKING
        </button>
      </div>
    </form>
  );
};

export default PickupView;
