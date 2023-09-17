import { useJsApiLoader } from "@react-google-maps/api";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { forwardRef, useEffect, useRef, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Hero = ({ airportData }) => {
  const [onDailyRental, setOnDailyRental] = useState(false);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [checkin, setCheckin] = useState(new Date());
  const [checkout, setCheckout] = useState(tomorrow);

  const handleDateSelect = (value) => {
    console.log(value);
    const tomorrow = new Date(value);
    tomorrow.setDate(tomorrow.getDate() + 1);
    setCheckout(tomorrow);
  };

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const ArrivalCustomInput = forwardRef(function MyInput(
    { value, onClick },
    ref
  ) {
    const selectedDate = new Date(value);
    return (
      <>
        <label className="karla text-[12px]">Date :</label>
        <input
          onClick={onClick}
          ref={ref}
          id="checkins"
          type="text"
          value={
            selectedDate.getDate() +
            ` ` +
            monthNames[selectedDate.getMonth()] +
            ` ` +
            selectedDate.getFullYear()
          }
          className="form-control karla font-bold text-[16px]"
        />
      </>
    );
  });

  const [originAirport, setOriginAirport] = useState(null);
  const [destinationHotel, setDestinationHotel] = useState(null);
  const autocompleteOriginRef = useRef(null);
  const autocompleteDestinationRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const initAutocomplete = () => {
      const autocompleteOrigin = new window.google.maps.places.Autocomplete(
        autocompleteOriginRef.current,
        {
          types: ["establishment"],
          fields: ["name", "place_id", "types"],
          componentRestrictions: { country: "th" },
        }
      );

      autocompleteOrigin.setTypes(["airport"]);

      autocompleteOrigin.addListener("place_changed", () => {
        const place = autocompleteOrigin.getPlace();
        // console.log(place);
        if (place && place.types.indexOf("airport") === -1) {
          alert("Please select an airport");
          autocompleteOriginRef.current.value = "";
        } else {
          setOriginAirport(place);
        }
      });

      const autocompleteDestination =
        new window.google.maps.places.Autocomplete(
          autocompleteDestinationRef.current,
          {
            types: ["establishment"],
            fields: ["name", "place_id", "types"],
            componentRestrictions: { country: "th" },
          }
        );

      autocompleteDestination.setTypes(["lodging"]);

      autocompleteDestination.addListener("place_changed", () => {
        const place = autocompleteDestination.getPlace();
        // console.log(place);
        if (place && place.types.indexOf("lodging") === -1) {
          alert("Please select a hotel");
          autocompleteDestinationRef.current.value = "";
        } else {
          setDestinationHotel(place);
        }
      });
    };

    window.initAutocomplete = initAutocomplete;
    if (window.google && window.google.maps) {
      initAutocomplete();
    }
  }, []);

  const handleButtonClick = () => {
    if (originAirport && destinationHotel) {
      router.push(
        `/car-class?origin_place_id=${originAirport.place_id}&destination_place_id=${destinationHotel.place_id}`
      );
    } else {
      alert("Please select both origin and destination point");
    }
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
        <div className="bg-white h-auto absolute flex flex-col gap-4 right-[7%]  md:right-[5%] top-[25%] rounded-md p-4 w-[85%] md:w-[30%]">
          <div className="flex flex-column w-full justify-center">
            <button
              onClick={() => {
                setOnDailyRental(false);
              }}
              className={`w-1/2 ${
                onDailyRental ? "bg-white border" : "bg-[#ED7A48] text-white"
              } py-1 mx-1 rounded-full  text-bold karla`}
            >
              Booking Travel
            </button>
            <button
              onClick={() => {
                setOnDailyRental(true);
              }}
              className={`w-1/2 ${
                onDailyRental ? "bg-[#ED7A48] text-white" : "bg-white border"
              } py-1 mx-1 rounded-full text-bold karla`}
            >
              Daily Rental
            </button>
          </div>
          {/* <div className="bg-[#F6F6F6] rounded-[100px] py-2 px-5 flex flex-col">
                        <label className="karla text-[12px]">From :</label>
                        <select
                            name="airport"
                            className="form-control karla font-bold text-[16px]"
                        >
                            {airportData.items.map((item, index) => {
                                return (
                                    <>
                                        <option value={item.id}>
                                            {item.name}
                                        </option>
                                    </>
                                );
                            })}
                        </select>
                    </div> */}

          {onDailyRental ? (
            <>
              <div className="bg-[#F6F6F6] rounded-[100px] py-2 px-5 flex flex-col">
                <label className="karla text-[12px]">Delivery Point :</label>
                <input
                  type="text"
                  placeholder="Type your delivery point"
                  className="form-control karla font-bold text-[16px]"
                />
              </div>
              <div className="flex flex-row justify-between gap-1 w-[100%]">
                <div className="bg-[#F6F6F6] rounded-[100px] self-start py-2 px-5 flex flex-col w-[47%]">
                  <DatePicker
                    selected={checkin}
                    dateFormat="yyyy-MM-dd"
                    onChange={(date) => setCheckin(date)}
                    onSelect={handleDateSelect}
                    minDate={today}
                    customInput={<ArrivalCustomInput />}
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
            </>
          ) : (
            <>
              <div className="bg-[#F6F6F6] rounded-[100px] py-2 px-5 flex flex-col">
                <label className="karla text-[12px]">From :</label>
                <input
                  type="text"
                  placeholder="Type your airport origin"
                  ref={autocompleteOriginRef}
                  className="form-control karla font-bold text-[16px]"
                />
              </div>
              <div className="bg-[#F6F6F6] rounded-[100px] py-2 px-5 flex flex-col">
                <label className="karla text-[12px]">To :</label>
                <input
                  type="text"
                  placeholder="Type your destination"
                  ref={autocompleteDestinationRef}
                  className="form-control karla font-bold text-[16px]"
                />
              </div>
              <div className="flex flex-row justify-between gap-1 w-[100%]">
                <div className="bg-[#F6F6F6] rounded-[100px] self-start py-2 px-5 flex flex-col w-[47%]">
                  <DatePicker
                    selected={checkin}
                    dateFormat="yyyy-MM-dd"
                    onChange={(date) => setCheckin(date)}
                    onSelect={handleDateSelect}
                    minDate={today}
                    customInput={<ArrivalCustomInput />}
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
            </>
          )}

          {/* <div className="self-center text-center rounded-[100px] py-2 px-5 flex flex-col">
                        <label className="karla text-[12px]">Rate from :</label>
                        <span className="text-[24px] font-bold karla">
                            $23.5
                        </span>
                    </div> */}
          <button
            onClick={handleButtonClick}
            className="w-full items-center justify-center bg-[#1BA0E2] rounded-[100px] text-white font-bold karla text-center py-2 px-5 flex flex-col"
          >
            BOOK NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
