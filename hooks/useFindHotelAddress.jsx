import { useEffect, useState } from "react";

export const useFindHotelAddress = (hotel_place_id) => {
  const [hotelAddress, setHotelAddress] = useState("");
  useEffect(() => {
    const findHotelAddress = async () => {
      const geocoder = new google.maps.Geocoder();
      const hotelPlace = await geocoder.geocode({ placeId: hotel_place_id });
      setHotelAddress(hotelPlace.results[0].formatted_address);
    };
    window.findHotelAddress = findHotelAddress;
    if (window.google && window.google.maps) {
      findHotelAddress();
    }
  }, [hotel_place_id]);
  return hotelAddress
};
