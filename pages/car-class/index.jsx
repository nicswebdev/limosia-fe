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
  const { origin_place_id, destination_place_id } = router.query;

  const { data: session } = useSession();
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const closeLoginDialog = () => {
    setOpenLoginDialog(false);
  };

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [distanceValue, setDistanceValue] = useState(0);

  useEffect(() => {
    const initMap = () => {
      if (origin_place_id && destination_place_id) {
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

        directionsService.route(
          {
            origin: { placeId: origin_place_id },
            destination: { placeId: destination_place_id },
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (response, status) => {
            if (status === "OK") {
              directionsRenderer.setDirections(response);

              const route = response.routes[0].legs[0];

              // console.log(route);

              // console.log(response);
              setDirectionsResponse(response);
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
  }, [origin_place_id, destination_place_id]);

  //Function to get shcema for certain cars
  const getSchemaForCar = (carId, schema) => {
    const schemaForCar = schema.items
      .filter((key) => {
        return key.car_class.id === carId;
      })
      .map((element) => element.base_price);
    return schemaForCar;
  };

  //Function to calculate price
  const calculatePrice = (carId, distance, schema) => {
    const schemaForThisCar = getSchemaForCar(carId, schema);
    const priceSchemaForCar = schemaForThisCar.filter((key) => {
      return distance > key.from_range_km && distance <= key.to_range_km;
    });

    if (priceSchemaForCar[0]) {
      return (priceSchemaForCar[0].base_price * distance).toFixed(2);
    }
    const highestPriceForCar = Math.max(...schemaForThisCar);
    return (highestPriceForCar * distance).toFixed(2);
  };

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

  const center = { lat: 13.7566, lng: 100.49914 };

  return (
    <>
      <Head>
        <title>Limosia - Car Search</title>
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
            {/* <img
                            src="/assets/images/maps.jpg"
                            alt="Maps"
                            class="w-full h-full object-cover"
                        /> */}
            {/* <GoogleMap
                            center={center}
                            zoom={15}
                            mapContainerStyle={{width: "100%", height: "100%"}}
                            options={{
                                zoomControl: false,
                                streetViewControl: false,
                                mapTypeControl: false,
                            }}
                        >
                            {directionsResponse && (
                                <DirectionsRenderer
                                    directions={directionsResponse}
                                />
                            )}
                        </GoogleMap> */}
            <div ref={mapRef} style={{ width: "100%", height: "100%" }}></div>
          </div>

          <div class="leading-relaxed">
            {/* <p>
                            From: <span class="font-bold">Airport AAA</span>
                        </p>
                        <p>
                            To: <span class="font-bold">Destination Name</span>
                        </p> */}
            <p>
              Total Range: <span class="font-bold">{distance}</span>
            </p>
            <p>
              Total Duration: <span class="font-bold">{duration}</span>
            </p>
          </div>
        </div>

        <div class="main-content">
          {openLoginDialog && <LoginModal closeModal={closeLoginDialog} />}
          {/* <form
                        action="#"
                        class="flex flex-col md:flex-row max-md:gap-4 justify-between md:items-center px-4 md:px-8 py-4 mb-5 rounded-[0.625rem] box-shadow bg-gray-light"
                    >
                        <div class="flex gap-5 items-center">
                            <img
                                src="/assets/images/icons/icon-park-outline_to-bottom.svg"
                                alt="Icon"
                                class="w-6"
                            />
                            <div class="flex flex-col flex-shrink-0 gap-[0.375rem]">
                                <label
                                    for="airport"
                                    class="text-xs font-bold leading-none"
                                >
                                    FROM AIRPORT
                                </label>
                                <select
                                    id="airport"
                                    class="appearance-none bg-transparent text-xs leading-none text-gray-dark"
                                >
                                    <option>airport name</option>
                                    <option>Airport 1</option>
                                    <option>Airport 2</option>
                                    <option>Airport 3</option>
                                </select>
                            </div>
                        </div>

                        <div class="flex gap-5 items-center">
                            <img
                                src="/assets/images/icons/icon-park-outline_to-bottom.svg"
                                alt="Icon"
                                class="w-6 rotate-180"
                            />
                            <div class="flex flex-col flex-shrink-0 gap-[0.375rem]">
                                <label
                                    for="destination"
                                    class="text-xs font-bold leading-none"
                                >
                                    DESTINATION
                                </label>
                                <select
                                    id="destination"
                                    class="appearance-none bg-transparent text-xs leading-none text-gray-dark"
                                >
                                    <option>destination name</option>
                                    <option>Destination 1</option>
                                    <option>Destination 2</option>
                                    <option>Destination 3</option>
                                </select>
                            </div>
                        </div>

                        <div class="flex gap-5 items-center">
                            <img
                                src="/assets/images/icons/uiw_date.svg"
                                alt="Icon"
                                class="w-6 px-[0.125rem]"
                            />
                            <div class="flex flex-col flex-shrink-0 gap-[0.375rem]">
                                <label
                                    for="date"
                                    class="text-xs font-bold leading-none"
                                >
                                    DATE
                                </label>
                                <input
                                    id="date"
                                    type="text"
                                    placeholder="23/05/23 | 15:30 - 09:00"
                                    class="appearance-none bg-transparent text-xs leading-none text-gray-dark"
                                />
                            </div>
                        </div>

                        <div>
                            <button class="text-xs font-bold leading-none text-orange-light">
                                CHANGE BOOKING DATE
                            </button>
                        </div>
                    </form> */}

          <div class="flex flex-col gap-8">
            {carClassData.items.map((item, index) => {
              if (
                Object.keys(getSchemaForCar(item.id, priceSchema)).length === 0
              ) {
                return;
              }
              return (
                <>
                  <div class="car-card" key={item.id}>
                    <div class="image-wrap">
                      <img
                        src={item.image}
                        alt="Car"
                        class="max-xl:max-w-full xl:w-full h-full object-contain"
                      />
                    </div>

                    <div class="detail-wrap">
                      <p class="title">{item.name}</p>
                      <p class="font-bold text-gray-dark">{item.description}</p>

                      <ul class="facility-list">
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
                        {/* <li>
                                                    <img
                                                        src="/assets/images/icons/ph_steering-wheel-fill.svg"
                                                        alt="Icon"
                                                        class="w-6"
                                                    />
                                                    <p class="text-sm font-bold">
                                                        AC
                                                    </p>
                                                </li> */}
                      </ul>

                      <div class="flex max-sm:flex-col justify-between items-center">
                        <p class="text-2xl font-bold max-sm:pb-5 sm:pr-4">
                          {`THB ${calculatePrice(
                            item.id,
                            distanceValue,
                            priceSchema
                          )}`}
                        </p>
                        <button
                          onClick={() => {
                            if (session) {
                              window.location.href = "/car-details";
                              return;
                            }
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
    `${apiPath}/price-schema?page=1&limit=10&sortBy=ASC`
  ).then((res) => res.json());

  return {
    props: {
      carClassData,
      priceSchema,
    },
  };
}
