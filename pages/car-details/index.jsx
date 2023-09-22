import { getServerSession } from "next-auth";
import Head from "next/head";
import Link from "next/link";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CarDetails = ({ carData, allSchema, allAirportData }) => {
  const selectedCar = carData;
  const router = useRouter();

  //Get query params
  const { date, car_class_id, airport_id, booking_type, hotel_place_id } =
    router.query;

  //Date Params
  const today = new Date();
  const tomorrow = new Date(today);
  const [checkin, setCheckin] = useState(new Date(date));
  const [unfixedDate, setUnfixedDate] = useState(checkin);
  const [checkout, setCheckout] = useState(tomorrow);
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
  tomorrow.setDate(tomorrow.getDate() + 1);
  const handleDateSelect = (value) => {
    console.log(value);
    const tomorrow = new Date(value);
    tomorrow.setDate(tomorrow.getDate() + 1);
    setCheckout(tomorrow);
  };
  const ArrivalCustomInput = forwardRef(function MyInput(
    { value, onClick },
    ref
  ) {
    const selectedDate = new Date(value);
    return (
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
          className="flex flex-col bg-white text-xs leading-none text-gray-dark karla font-bold bg-[#F6F6F6] rounded-md p-2"
        />
    );
  });

  //Find this airport from all airport data, all airport data is needed to change details
  const thisAirport = allAirportData.items.find(
    (item) => item.id == airport_id
  );

  //State to store distance from the google map
  const [distance, setDistance] = useState({
    text: "",
    value: 0,
  });

  //State to store hotel address
  const [hotelAddress, setHotelAddress] = useState("");
  //State to store when user search for a hotel
  const [searchHotel, setSearchHotel] = useState({
    name: "",
    place_id: "",
  });
  //State to store relevant scchema for this
  const [relevantSchema, setRelevantSchema] = useState();

  const [airportIdChange, setAirportIdChange] = useState(thisAirport.id);

  const autocompleteOriginRef = useRef("");

  useEffect(() => {
    sessionStorage.removeItem("bookLink");
    const initMap = async () => {
      const autocompleteOrigin = new window.google.maps.places.Autocomplete(
        autocompleteOriginRef.current,
        {
          types: ["lodging"],
          fields: ["name", "place_id", "types"],
          componentRestrictions: { country: "th" },
        }
      );
      //Listen to search hotel
      autocompleteOrigin.addListener("place_changed", () => {
        const place = autocompleteOrigin.getPlace();
        // console.log(place);
        if (place && place.types.indexOf("lodging") === -1) {
          alert("Please select a hotel");
          autocompleteOriginRef.current.value = "";
        } else {
          setSearchHotel({
            name: place.formatted_address,
            place_id: place.place_id,
          });
        }
      });
      const geocoder = new google.maps.Geocoder();
      const hotelPlace = await geocoder.geocode({ placeId: hotel_place_id });
      setHotelAddress(hotelPlace.results[0].formatted_address);
      setSearchHotel({
        name: hotelPlace.results[0].formatted_address,
        place_id: hotelPlace.results[0].place_id,
      });

      // Count range between destinations
      if (thisAirport.place_id && hotel_place_id) {
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();
        directionsService.route(
          {
            origin: { placeId: thisAirport.place_id },
            destination: { placeId: hotel_place_id },
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (response, status) => {
            if (status === "OK") {
              directionsRenderer.setDirections(response);
              const route = response.routes[0].legs[0];
              setDistance({
                text: route.distance.text,
                value: route.distance.value,
              });
            } else {
              alert("Directions request failed due to " + status);
              console.error("Directions request failed", response);
            }
          }
        );
      }
    };
    window.initMap = initMap;
    if (window.google && window.google.maps) {
      initMap();
    }
    //Function to get the corresponding price schema based on the terms
    function findRelevantSchema(range, priceSchema, carClassId) {
      carClassId = parseInt(carClassId);
      // console.log(priceSchema.items)
      // console.log(carClassId)
      const place_id = thisAirport.place_id;
      // Step 1: Filter items based on place_id and car_class id
      const filteredItems = priceSchema.items.filter(
        (item) =>
          item.airport.place_id === place_id && item.car_class.id === carClassId
      );

      // Step 2: Find an item where distance is between from_range_km and to_range_km
      let basePriceItem = filteredItems.find(
        (item) => range >= item.from_range_km && range <= item.to_range_km
      );

      // Step 3: If no item found in step 2, find the item with the highest to_range_km
      if (!basePriceItem) {
        basePriceItem = filteredItems.reduce(
          (prev, current) => {
            return prev.to_range_km > current.to_range_km ? prev : current;
          },
          { to_range_km: -1 }
        ); // Initialize with -1 to handle empty filteredItems case
      }
      if (filteredItems.length === 0) {
        return null;
      }
      // Return the entire object
      return basePriceItem;
    }
    setRelevantSchema(
      findRelevantSchema(distance.value, allSchema, car_class_id)
    );
  }, [thisAirport]);

  useEffect(() => {
    setCheckin(new Date(date));
  }, [date]);

  const handleChangeBookingSubmit = () => {
    const { booking_type } = router.query;
    const newDate = unfixedDate;
    const airport_id = airportIdChange;
    const newLink = `/car-details?booking_type=${booking_type}&airport_id=${airport_id}&hotel_place_id=${searchHotel.place_id}&car_class_id=${car_class_id}&date=${newDate}`;
    router.push(newLink);
  };

  return (
    <>
      <Head>
        <title>Quicco - Car Details</title>
      </Head>
      <div className="main-container pt-6 pb-8 mt-28">
        <ul class="breadcrumb-list">
          <li>
            <a class="flex flex-row items-center gap-[10px]">
              <img
                src="/assets/images/icons/material-symbols_home-rounded.svg"
                alt=""
              />
              <span>Reservation</span>
            </a>
          </li>
          <li>Choose Cars</li>
        </ul>
      </div>
      <div class="main-container pb-20 lg:pb-32">
        <div class="sidebar">
          {/* This is the car image */}
          <div class="flex justify-center items-center w-full px-5 py-8 mb-9 rounded-[15px] bg-gray-light">
            <img src={selectedCar.image} alt="Car" class="max-w-full" />
          </div>
        </div>

        <div class="main-content">
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
                  <label
                    for="airport"
                    className="text-xs font-bold leading-none"
                  >
                    FROM
                  </label>
                </div>
                {booking_type === "airportpickup" ? (
                  //Airport Dropdown
                  <select
                    onChange={(event) => {
                      setAirportIdChange(event.target.value);
                    }}
                    value={airportIdChange}
                    id="airport"
                    className="flex flex-col bg-white text-xs leading-none text-gray-dark karla font-bold bg-[#F6F6F6] rounded-md p-2 hover:cursor-pointer"
                    defaultValue={thisAirport.id}
                  >
                    {allAirportData.items.map((airport) => {
                      return (
                        <option key={airport.id} value={airport.id}>
                          {airport.name}
                        </option>
                      );
                    })}
                  </select>
                ) : (
                  //Hotel Search
                  <input
                    value={searchHotel.name}
                    onChange={(event) => {
                      setSearchHotel((prev) => ({
                        ...prev,
                        name: event.target.value,
                      }));
                    }}
                    className="bg-white text-xs leading-none text-gray-dark karla font-bold rounded-md p-2"
                    ref={autocompleteOriginRef}
                  />
                )}
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
                <label
                  for="destination"
                  className="text-xs font-bold leading-none"
                >
                  DESTINATION
                </label>
                {booking_type === "airportpickup" ? (
                  //Hotel search
                  <input
                    value={searchHotel.name}
                    onChange={(event) => {
                      setSearchHotel((prev) => ({
                        ...prev,
                        name: event.target.value,
                      }));
                    }}
                    className="bg-white text-xs leading-none text-gray-dark karla font-bold bg-[#F6F6F6] rounded-md p-2"
                    ref={autocompleteOriginRef}
                  />
                ) : (
                  //Airport dropdown
                  <select
                    onChange={(event) => {
                      setAirportIdChange(event.target.value);
                    }}
                    value={airportIdChange}
                    id="airport"
                    className="bg-white text-xs leading-none text-gray-dark karla font-bold bg-[#F6F6F6] rounded-md p-2 hover:cursor-pointer"
                    defaultValue={thisAirport.id}
                  >
                    {allAirportData.items.map((airport) => {
                      return (
                        <option key={airport.id} value={airport.id}>
                          {airport.name}
                        </option>
                      );
                    })}
                  </select>
                )}
              </div>
            </div>

            {/* Date Field */}
            <div className="flex gap-5 items-center">
              <img
                src="/assets/images/icons/uiw_date.svg"
                alt="Icon"
                className="w-6 px-[0.125rem]"
              />
              <div class="flex flex-col flex-shrink-0 gap-[0.375rem]">
                <label for="date" className="text-xs font-bold leading-none">
                  DATE
                </label>
                <DatePicker
                  selected={unfixedDate}
                  dateFormat="yyyy-MM-dd"
                  onChange={(date) => setUnfixedDate(date)}
                  onSelect={handleDateSelect}
                  minDate={today}
                  customInput={<ArrivalCustomInput />}
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

          {/* <form
            action="#"
            class="flex flex-col md:flex-row max-md:gap-4 justify-between md:items-center px-4 md:px-8 py-4 mb-5 rounded-[10px] box-shadow bg-gray-light"
          >
            <div class="flex gap-5 items-center">
              <img
                src="/assets/images/icons/icon-park-outline_check-one-orange.svg"
                alt="Icon"
              />
              <div class="flex flex-col flex-shrink-0 gap-[6px]">
                <label
                  for="vehicle"
                  class="text-xs font-bold leading-none text-orange-dark"
                >
                  VEHICLE
                </label>
                <select
                  id="vehicle"
                  class="appearance-none bg-transparent text-xs leading-none text-gray-dark"
                >
                  <option>SELECTION</option>
                  <option>SELECTION 1</option>
                  <option>SELECTION 2</option>
                  <option>SELECTION 3</option>
                </select>
              </div>
            </div>

            <div class="flex gap-5 items-center">
              <img
                src="/assets/images/icons/icon-park-outline_check-one-gray.svg"
                alt="Icon"
              />
              <div class="flex flex-col flex-shrink-0 gap-[6px]">
                <label for="extras" class="text-xs font-bold leading-none">
                  EXTRAS
                </label>
                <select
                  id="extras"
                  class="appearance-none bg-transparent text-xs leading-none text-gray-dark"
                >
                  <option>SELECTION</option>
                  <option>SELECTION 1</option>
                  <option>SELECTION 2</option>
                  <option>SELECTION 3</option>
                </select>
              </div>
            </div>

            <div class="flex gap-5 items-center">
              <img
                src="/assets/images/icons/icon-park-outline_check-one-gray.svg"
                alt="Icon"
              />
              <div class="flex flex-col flex-shrink-0 gap-[6px]">
                <label for="date" class="text-xs font-bold leading-none">
                  DRIVER
                </label>
                <input
                  id="date"
                  type="text"
                  placeholder="DETAILS"
                  class="appearance-none bg-transparent text-xs leading-none text-gray-dark"
                />
              </div>
            </div>
          </form> */}

          <div className="px-4 py-8 md:p-6 xl:p-10 rounded-[15px] box-shadow text-black-2">
            <p className="title">Vehicle</p>
            <p className="font-bold text-black">{selectedCar.name}</p>
            <p className="font-medium text-gray-dark">
              {selectedCar.description}
            </p>

            <div className="leading-relaxed mt-4">
              <p className="title">Pick-up Details</p>
              <p>
                From:{" "}
                <span className="font-medium text-gray-dark">
                  {booking_type === "airportpickup"
                    ? thisAirport.name
                    : hotelAddress}
                </span>
              </p>
              <p>
                To:{" "}
                <span className="font-medium text-gray-dark">
                  {booking_type === "airportpickup"
                    ? hotelAddress
                    : thisAirport.name}
                </span>
              </p>
              <p>
                Total:{" "}
                <span className="font-medium text-gray-dark">
                  {distance.text}
                </span>
              </p>
              <p>
                Date:{" "}
                <span className="font-medium text-gray-dark">
                  {checkin.getDate() +
                    ` ` +
                    monthNames[checkin.getMonth()] +
                    ` ` +
                    checkin.getFullYear()}
                </span>
              </p>
            </div>
            {/* <ul class="list-term pt-5 pb-6">
              <li>Rebooking and cancellation (subject to charges)</li>
              <li>Unlimited miles</li>
              <li>Third party insurance</li>
              <li>
                <a href="#" class="link">
                  More information ›
                </a>
              </li>
              <li>Loss Damage Waiver</li>
            </ul> */}

            {/* <p class="text-4xl font-bold max-sm:pb-5 sm:pr-4">USD 15</p> */}

            <hr class="my-8 border-[#D9D9D9]" />

            <div class="flex justify-between items-center">
              <span class="text-gray-dark">Vehicle Subtotal: </span>
              <span class="font-bold">
                {`THB ${new Intl.NumberFormat("en-US").format(
                  relevantSchema
                    ? relevantSchema.base_price
                    : "Loading Price..."
                )}`}
              </span>
            </div>

            <div class="flex justify-between items-center">
              <span class="text-gray-dark">tax: </span>
              <span class="font-bold">THB 0</span>
            </div>

            <div class="flex max-sm:flex-col justify-between sm:items-center pt-5">
              <span class="title">Your total price:</span>
              <span class="title">
                {`THB ${new Intl.NumberFormat("en-US").format(
                  relevantSchema
                    ? relevantSchema.base_price
                    : "Loading Price..."
                )}`}
              </span>
            </div>

            <div class="pt-12">
              <Link href="/checkout" class="btn-blue">
                <span>ACCEPT RATE AND PAY NOW</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarDetails;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  // console.log(session);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  
  const { car_class_id} = context.query;

  const apiPath = process.env.NEXT_PUBLIC_API_PATH;
  const res = await fetch(`${apiPath}/car-class/${car_class_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
    },
  });
  const carData = await res.json();

  const allSchema = await fetch(
    `${apiPath}/price-schema?page=1&limit=9999999&sortBy=ASC`
  ).then((res) => res.json());


  const allAirportData = await fetch(
    `${apiPath}/airports?page=1&limit=9999999&sortBy=ASC`
  ).then((res) => res.json());

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      carData,
      allSchema,
      allAirportData,
    },
  };
}
