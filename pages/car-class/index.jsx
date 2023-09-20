import LoginModal from "@/components/LoginModal";
import {
  DirectionsRenderer,
  GoogleMap,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

const CarClass = ({ carClassData, priceSchema }) => {
  const mapRef = useRef(null);
  const router = useRouter();
  // const { origin_place_id, destination_place_id, date, bookingtype } =
  //   router.query;

  const { airport_place_id, hotel_place_id, booking_type, date } = router.query;

  const { data: session } = useSession();
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const closeLoginDialog = () => {
    setOpenLoginDialog(false);
  };

  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState("");
  const [distanceValue, setDistanceValue] = useState(0);
  const [destinationLink, setDestinationLink] = useState("");

  useEffect(() => {
    const initMap = () => {
      let origin = "";
      let destination = "";
      if (booking_type === "airportpickup") {
        origin = airport_place_id;
        destination = hotel_place_id;
      }
      if (booking_type === "airportdropoff") {
        origin = hotel_place_id;
        destination = airport_place_id;
      }
      if (airport_place_id && hotel_place_id) {
        const map = new google.maps.Map(mapRef.current, {
          zoom: 15,
          center: { lat: 13.7566, lng: 100.49914 },
          options: {
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
          },
        });

        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);
        //If the booking type is airport pickup set the routes
        directionsService.route(
          {
            origin: { placeId: origin },
            destination: { placeId: destination },
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (response, status) => {
            if (status === "OK") {
              directionsRenderer.setDirections(response);
              const route = response.routes[0].legs[0];

              // console.log(route);

              // console.log(response);
              setDistance(route.distance.text);
              setDistanceValue(route.distance.value / 1000);
              setDuration(route.duration.text);
              // alert(
              //     `Origin: ${route.start_address}\nDestination: ${route.end_address}\nDistance: ${route.distance.text}\nDuration: ${route.duration.text}`
              // );
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
  }, []);

  //Function to get the corresponding price schema based on the terms
  function getBasePrice(carClassId) {
    const place_id = airport_place_id;

    // Step 1: Filter items based on place_id and car_class id
    const filteredItems = priceSchema.items.filter(
      (item) =>
        item.airport.place_id === place_id && item.car_class.id === carClassId
    );

    // Step 2: Find an item where distance is between from_range_km and to_range_km
    let basePriceItem = filteredItems.find(
      (item) =>
        distanceValue >= item.from_range_km && distanceValue <= item.to_range_km
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
    // console.log(basePriceItem);
    // Return the entire object
    return basePriceItem;
  }

  // const {isLoaded} = useJsApiLoader({
  //     googleMapsApiKey: "AIzaSyDv7zbUva4oy7ni_A7sKFYTpuE7yBhlz1E",
  // });

  // useEffect(() => {
  //     async function fetchData() {
  //         if (origin_place_id && destination_place_id) {
  //             const directionsService = new google.maps.DirectionsService();

  //             const results = await directionsService.route({
  //                 origin: {placeId: origin_place_id},
  //                 destination: {placeId: destination_place_id},
  //                 travelMode: google.maps.TravelMode.DRIVING,
  //             });

  //             setDirectionsResponse(results);
  //             setDistance(results.routes[0].legs[0].distance.text);
  //             setDuration(results.routes[0].legs[0].duration.text);
  //         }
  //     }

  //     fetchData();
  // }, [origin_place_id, destination_place_id]);

  // const center = { lat: 13.7566, lng: 100.49914 };

  return (
    <>
      <Head>
        <title>Quicco - Car Search</title>
      </Head>
      <div class="main-container pt-6 pb-8 mt-28">
        <ul class="breadcrumb-list">
          <li>
            <a
              href="javascript:void(0)"
              class="flex flex-row items-center gap-[0.625rem]"
            >
              <img
                src="/assets/images/icons/material-symbols_home-rounded.svg"
                alt=""
                class="w-6"
              />
              <span>Reservation</span>
            </a>
          </li>
          <li>Choose Cars</li>
        </ul>
      </div>
      <div class="main-container pb-20 lg:pb-32">
        <div class="sidebar">
          <p class="title pb-5">ROUTE MAP</p>

          <div class="w-full h-[16.625rem] pb-5">
            <div ref={mapRef} style={{ width: "100%", height: "100%" }}></div>
          </div>

          <div class="leading-relaxed">
            <p>
              Total Range: <span class="font-bold">{distance}</span>
            </p>
            <p>
              Total Duration: <span class="font-bold">{duration}</span>
            </p>
          </div>
        </div>

        <div class="main-content">
          {openLoginDialog && (
            <LoginModal
              destinationLink={destinationLink}
              closeModal={closeLoginDialog}
            />
          )}
          {/* // Work Here */}
          <div class="flex flex-col gap-8">
            {carClassData.items.map((item, index) => {
              //Get the relevant schema for car class, airport, and range
              const relevantSchema = getBasePrice(item.id);
              //if no relevant schema for this car class return
              if (relevantSchema === null) {
                return;
              }
              //otherwise print all car class
              return (
                <>
                  {/* Car Image */}
                  <div class="car-card" key={item.id}>
                    <div class="image-wrap">
                      <img
                        src={item.image}
                        alt="Car"
                        class="max-xl:max-w-full xl:w-full h-full object-contain"
                      />
                    </div>
                    {/* Car Details */}
                    <div class="detail-wrap">
                      {/* Car Name */}
                      <p class="title">{item.name}</p>
                      {/* Car Description */}
                      <p class="font-bold text-gray-dark">{item.description}</p>
                      {/* Car More Details */}
                      <ul class="facility-list">
                        {/* Car Max Guest */}
                        <li>
                          <img
                            src="/assets/images/icons/ic_round-people-alt.svg"
                            alt="Icon"
                            class="w-6"
                          />
                          <p class="text-sm font-bold">
                            {item.max_guest} People
                          </p>
                        </li>
                        {/* Car Max Suitcase */}
                        <li>
                          <img
                            src="/assets/images/icons/fa-solid_luggage-cart.svg"
                            alt="Icon"
                            class="w-6"
                          />
                          <p class="text-sm font-bold">
                            {item.max_suitcase} pcs
                          </p>
                        </li>
                      </ul>
                      {/* Book Now container */}
                      <div class="flex max-sm:flex-col justify-between items-center">
                        {/* Car price from schema */}
                        <p class="text-2xl font-bold max-sm:pb-5 sm:pr-4">
                          {`THB ${new Intl.NumberFormat("en-US").format(
                            relevantSchema.base_price
                          )}`}
                        </p>
                        {/* Book Button */}
                        <button
                          onClick={() => {
                            // Generate booklink to details after select car
                            const booklink = `/car-details?booking_type=${booking_type}&airport_id=${relevantSchema.airport.id}&hotel_place_id=${hotel_place_id}&car_class_id=${item.id}&date=${date}`;
                            if (session) {
                              window.location.href = booklink;
                              return;
                            }
                            setDestinationLink(booklink);
                            setOpenLoginDialog(true);
                          }}
                          class="btn-blue flex-shrink-0"
                        >
                          <span>BOOK NOW</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CarClass;

export async function getServerSideProps() {
  const apiPath = process.env.NEXT_PUBLIC_API_PATH;
  const carClassData = await fetch(
    `${apiPath}/car-class?page=1&limit=10&sortBy=ASC`
  ).then((res) => res.json());
  const priceSchema = await fetch(
    `${apiPath}/price-schema?page=1&limit=9999999&sortBy=ASC`
  ).then((res) => res.json());

  return {
    props: {
      carClassData,
      priceSchema,
    },
  };
}
