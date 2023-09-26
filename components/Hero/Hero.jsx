import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import DateInput from "../CustomInputs/DateInput";

const Hero = ({ airportData, cheapestSchema }) => {
  const [checkin, setCheckin] = useState(new Date());
  const handleDateChange = (value) => {
    setCheckin(value);
  };
  //States to handle main tab
  const [mainTab, setMainTab] = useState({
    airportTransfer: true,
    dayRental: false,
  });
  //Function to change main tab
  const changeMainTabTo = (tab) => {
    setMainTab((prev) => ({
      ...!prev,
      [tab]: true,
    }));
  };

  // States for airport features
  //To handle airport tabs
  const [airportTab, setAirportTab] = useState({
    pickup: true,
    dropoff: false,
  });

  //To change airport tab
  const changeAirportTabTo = (tab) => {
    setAirportTab((prev) => ({
      ...!prev,
      [tab]: true,
    }));
  };
  //To store data when using airport pickup
  const [airportTransferData, setAirportTransferData] = useState({
    airport: "",
    hotel: "",
    passenger: "",
  });

  const [dayRentalData, setDayRentalData] = useState({
    from: "",
    to: "",
  });

  const autocompleteOriginRef = useRef(null);
  const autocompleteDestinationRef = useRef(null);
  const router = useRouter();

  const autoCompleteDayRentalOriginRef = useRef(null);

  useEffect(() => {
    const initAutocomplete = () => {
      const autocompleteOrigin = new window.google.maps.places.Autocomplete(
        autocompleteOriginRef.current,
        {
          types: ["lodging"],
          fields: ["name", "place_id", "types"],
          componentRestrictions: { country: "th" },
        }
      );
      // autocompleteOrigin.setTypes(["lodging"]);
      autocompleteOrigin.addListener("place_changed", () => {
        const place = autocompleteOrigin.getPlace();
        // console.log(place);
        if (place && place.types.indexOf("lodging") === -1) {
          alert("Please select a hotel");
          autocompleteOriginRef.current.value = "";
        } else {
          // setDestinationHotel(place);
          setAirportTransferData((prev) => ({
            ...prev,
            hotel: place,
          }));
        }
      });

      const autocompleteDestination =
        new window.google.maps.places.Autocomplete(
          autocompleteDestinationRef.current,
          {
            types: ["lodging"],
            fields: ["name", "place_id", "types"],
            componentRestrictions: { country: "th" },
          }
        );
      // autocompleteDestination.setTypes(["lodging"]);
      autocompleteDestination.addListener("place_changed", () => {
        const place = autocompleteDestination.getPlace();
        // console.log(place);
        if (place && place.types.indexOf("lodging") === -1) {
          alert("Please select a hotel");
          autocompleteDestinationRef.current.value = "";
        } else {
          // setDestinationHotel(place);
          setAirportTransferData((prev) => ({
            ...prev,
            hotel: place,
          }));
        }
      });
      const autocompleteOriginDayRental =
        new window.google.maps.places.Autocomplete(
          autoCompleteDayRentalOriginRef.current,
          {
            types: ["lodging"],
            fields: ["name", "place_id", "types"],
            componentRestrictions: { country: "th" },
          }
        );
      // autocompleteDestination.setTypes(["lodging"]);
      autocompleteOriginDayRental.addListener("place_changed", () => {
        const place = autocompleteOriginDayRental.getPlace();
        // console.log(place);
        if (place && place.types.indexOf("lodging") === -1) {
          alert("Please select a hotel");
          autoCompleteDayRentalOriginRef.current.value = "";
        } else {
          // setDestinationHotel(place);
          setDayRentalData((prev) => ({
            ...prev,
            to: place,
          }));
        }
      });
    };

    window.initAutocomplete = initAutocomplete;
    if (window.google && window.google.maps) {
      initAutocomplete();
    }
  }, []);

  const submitAirportTransfer = () => {
    console.log(airportTransferData);
    if (airportTransferData.airport && airportTransferData.hotel) {
      if (airportTab.pickup) {
        router.push(
          `/car-class?booking_type=airportpickup&airport_id=${airportTransferData.airport}&hotel_place_id=${airportTransferData.hotel.place_id}&date=${checkin}`
        );
      }
      if (airportTab.dropoff) {
        router.push(
          `/car-class?booking_type=airportdropoff&airport_id=${airportTransferData.airport}&hotel_place_id=${airportTransferData.hotel.place_id}&date=${checkin}`
        );
      }
      // console.log(airportPickupData.from);
    } else {
      alert("Please select both origin and destination point");
    }
  };

  const handleBookSubmit = () => {
    submitAirportTransfer();
  };

  return (
    <div className="flex items-center justify-center h-full bg-fixed bg-center bg-cover">
      {/* <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-[2]" /> */}
      <div className="relative w-full h-[100vh]">
        <Image
          src="/assets/bg_top.jpg"
          alt="Header Image"
          fill
          className="object-cover w-full h-full"
        />
        <div className="absolute right-[7%]  md:right-[5%] top-[20%]  w-[85%] md:w-[30%]">
          {/* Airport Transfer/Day Rental Tab */}
          <div className="flex py-2 px-1 w-full  mb-3 bg-white rounded-full">
            <button
              onClick={() => {
                changeMainTabTo("airportTransfer");
              }}
              className={`w-1/2 ${
                mainTab.airportTransfer
                  ? "bg-[#ED7A48] text-white  "
                  : "bg-white"
              } py-1.5 mx-1 rounded-full  font-medium karla`}
            >
              Airport Transfer
            </button>
            <button
              onClick={() => {
                changeMainTabTo("dayRental");
              }}
              className={`w-1/2 ${
                mainTab.dayRental ? "bg-[#ED7A48] text-white" : "bg-white"
              } py-1.5 mx-1 rounded-full font-medium karla`}
            >
              Day rental
            </button>
          </div>

          {/* THE FORM IS HERE */}
          <div className="bg-white h-auto rounded-md p-4">
            {/* tab of airport feature */}
            <div
              hidden={!mainTab.airportTransfer}
              className={`${
                mainTab.airportTransfer
                  ? "flex py-1 px-1 w-full  mb-3 bg-[#F6F6F6] rounded-full"
                  : ""
              }`}
            >
              <button
                onClick={() => {
                  changeAirportTabTo("pickup");
                }}
                className={`w-1/2 ${
                  airportTab.pickup ? "bg-[#ED7A48] text-white" : ""
                } py-1.5 mx-1 rounded-full  font-medium karla`}
              >
                Airport Pickup
              </button>
              <button
                onClick={() => {
                  changeAirportTabTo("dropoff");
                }}
                className={`w-1/2 ${
                  airportTab.dropoff ? "bg-[#ED7A48] text-white" : ""
                } py-1.5 mx-1 rounded-full font-medium karla`}
              >
                Airport Drop Off
              </button>
            </div>

            {/* Airport Transfer */}
            <div hidden={!mainTab.airportTransfer}>
              {/* Airport Transfer Pickup */}
              <div hidden={!airportTab.pickup}>
                <div className="flex flex-col gap-4 my-4">
                  {/* Airport transfer pickup from field */}
                  <div className="bg-[#F6F6F6] rounded-[100px] py-2 px-5 flex flex-col">
                    <label className="karla text-[12px]">From :</label>
                    <select
                      onChange={(event) => {
                        setAirportTransferData((prev) => ({
                          ...prev,
                          airport: event.target.value,
                        }));
                      }}
                      className="form-control karla font-bold text-[16px]"
                    >
                      <option value="none" selected disabled hidden>
                        Select Airport
                      </option>
                      {airportData.items.map((airport) => {
                        return (
                          <option
                            value={airport.id}
                            className=""
                            key={airport.id}
                          >
                            {airport.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  {/* Airport transfer pickup hotel field */}
                  <div className="bg-[#F6F6F6] rounded-[100px] py-2 px-5 flex flex-col">
                    <label className="karla text-[12px]">To :</label>
                    <input
                      type="text"
                      placeholder="Type your destination"
                      ref={autocompleteDestinationRef}
                      className="form-control karla font-bold text-[16px]"
                    />
                  </div>

                  {/* Airport transfer other fields */}
                  <div className="flex flex-row justify-between gap-1 w-[100%]">
                    <div className="bg-[#F6F6F6] rounded-[100px] self-end py-2 px-5 flex flex-col w-[47%]">
                      <label className="karla text-[12px]">Date :</label>
                      <DateInput
                        selectedDate={checkin}
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
                </div>
              </div>

              {/* Dropoff Tab */}
              <div hidden={!airportTab.dropoff}>
                <div className="flex flex-col gap-4 my-4">
                  {/* Airport transfer dropoff from field */}
                  <div className="bg-[#F6F6F6] rounded-[100px] py-2 px-5 flex flex-col">
                    <label className="karla text-[12px]">From :</label>
                    <input
                      type="text"
                      placeholder="Type your pickup location"
                      ref={autocompleteOriginRef}
                      className="form-control karla font-bold text-[16px]"
                    />
                  </div>
                  {/* Airport transfer dropoff to field */}
                  <div className="bg-[#F6F6F6] rounded-[100px] py-2 px-5 flex flex-col">
                    <label className="karla text-[12px]">To :</label>
                    <select
                      onChange={(event) => {
                        setAirportTransferData((prev) => ({
                          ...prev,
                          airport: event.target.value,
                        }));
                      }}
                      className="form-control karla font-bold text-[16px]"
                    >
                      <option value="none" selected disabled hidden>
                        Select Airport
                      </option>
                      {airportData.items.map((airport) => {
                        return (
                          <option
                            value={airport.id}
                            className=""
                            key={airport.id}
                          >
                            {airport.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {/* Airport transfer other fields */}
                  <div className="flex flex-row justify-between gap-1 w-[100%]">
                    <div className="bg-[#F6F6F6] rounded-[100px] self-end py-2 px-5 flex flex-col w-[47%]">
                      <label className="karla text-[12px]">Date :</label>
                      <DateInput
                        selectedDate={checkin}
                        minDate={new Date()}
                        className="form-control karla font-bold text-[16px]"
                        handleDateChange={handleDateChange}
                      />
                    </div>
                    <div className="bg-[#F6F6F6] rounded-[100px] self-end py-2 px-5 flex flex-col w-[47%]">
                      <label className="karla text-[12px]">Passanger :</label>
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
                </div>
              </div>
            </div>

            {/* Day Rental */}
            <div hidden={!mainTab.dayRental}>
              <div className="flex flex-col gap-4 my-4">
                <div className="bg-[#F6F6F6] rounded-[100px] py-2 px-5 flex flex-col">
                  <label className="karla text-[12px]">Delivery Point :</label>
                  <input
                    type="text"
                    ref={autoCompleteDayRentalOriginRef}
                    placeholder="Type your delivery point"
                    className="form-control karla font-bold text-[16px]"
                  />
                </div>
                <div className="flex flex-row justify-between gap-1 w-[100%]">
                  <div className="bg-[#F6F6F6] rounded-[100px] self-end py-2 px-5 flex flex-col w-[47%]">
                    <label className="karla text-[12px]">Date :</label>
                    <DateInput
                      selectedDate={checkin}
                      minDate={new Date()}
                      className="form-control karla font-bold text-[16px]"
                      handleDateChange={handleDateChange}
                    />
                  </div>
                  <div className="bg-[#F6F6F6] rounded-[100px] self-end py-2 px-5 flex flex-col w-[47%]">
                    <label className="karla text-[12px]">Passanger :</label>
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
              </div>
            </div>

            <button
              onClick={handleBookSubmit}
              className="w-full items-center justify-center bg-[#1BA0E2] rounded-[100px] text-white font-bold karla text-center py-2 px-5 flex flex-col"
            >
              BOOK NOW
            </button>
            <div className="flex justify-center gap-10 mt-3">
              {cheapestSchema &&
                cheapestSchema.map((value) => {
                  return (
                    <div key={value.id} className="karla  font-bold">
                      <h1 className="text-[12px] text-center">
                        {value.car_class.name} from:
                      </h1>
                      <p className="text-center">
                        THB{" "}
                        {new Intl.NumberFormat("en-US").format(
                          value.base_price
                        )}
                      </p>
                    </div>
                  );
                })}
              {/* <div className="karla  font-bold">
                <h1 className="text-[12px] text-center">
                  asdasdasdadadasdadasd from:
                </h1>
                <p className="text-center">THB {new Intl.NumberFormat("en-US").format(number)} </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
