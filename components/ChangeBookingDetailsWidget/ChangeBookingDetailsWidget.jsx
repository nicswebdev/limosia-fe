import React, { useEffect, useState } from "react";
import PickupView from "./views/AirportTransfer/PickupView";
import DropoffView from "./views/AirportTransfer/DropoffView";
import { useRouter } from "next/router";

const ChangeBookingDetailsWidget = (props) => {
  const router = useRouter();
  const { booking_type, airport_id, hotel_place_id, date } = router.query;
  // console.log(date)
  const allAirportData = props.allAirportData;
  const [currentHotel, setCurrentHotel] = useState(null);
  const [hotelLoading, setHotelLoading] = useState(true);

  useEffect(() => {
    const findHotelAddress = async () => {
      const geocoder = new google.maps.Geocoder();
      const hotelPlace = await geocoder.geocode({ placeId: hotel_place_id });
      setCurrentHotel({
        name: hotelPlace.results[0].formatted_address,
        place_id: hotelPlace.results[0].place_id,
      });
      setHotelLoading(false);
    };
    window.findHotelAddress = findHotelAddress;
    if (window.google && window.google.maps) {
      findHotelAddress();
    }
  }, [hotel_place_id]);

  const views = {
    airportpickup: PickupView,
    airportdropoff: DropoffView,
  };
  const CurrentView = views[booking_type];
  return (
    <>
      {hotelLoading ? (
        <>
          <div className="flex flex-col md:flex-row max-md:gap-4 justify-between md:items-center px-4 md:px-8 py-4 mb-5 rounded-[0.625rem] box-shadow bg-gray-light h-[12%] animate-pulse gap-x-5">
            <div className="w-full h-[80%] bg-[#d6d6d6] rounded" />
            <div className="w-full h-[80%] bg-[#d6d6d6] rounded" />
            <div className="w-full h-[80%] bg-[#d6d6d6] rounded" />
          </div>
        </>
      ) : (
        <CurrentView
          allAirportData={allAirportData}
          currentAirportId={airport_id}
          currentHotel={currentHotel}
          date={date}
        />
      )}
    </>
  );
};

export default ChangeBookingDetailsWidget;
