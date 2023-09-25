import { getServerSession } from "next-auth";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import { useRouter } from "next/router";
import { useFindRelevantSchema } from "@/hooks/useFindRelevantSchema";
import LoadingPage from "@/components/LoadingPage";

const CarDetails = ({ carData, allSchema, allAirportData }) => {
  //Get query params
  const router = useRouter();
  const { date, car_class_id, airport_id, booking_type, hotel_place_id } =
    router.query;
  const selectedCar = carData;
  //Find this airport from all airport data, all airport data is needed to change details
  const thisAirport = allAirportData.items.find(
    (item) => item.id == airport_id
  );

  //State to store hotel address
  const [hotelAddress, setHotelAddress] = useState("");

  useEffect(() => {
    sessionStorage.removeItem("bookLink");
    const initMap = async () => {
      const geocoder = new google.maps.Geocoder();
      const hotelPlace = await geocoder.geocode({ placeId: hotel_place_id });
      setHotelAddress(hotelPlace.results[0].formatted_address);
    };
    window.initMap = initMap;
    if (window.google && window.google.maps) {
      initMap();
    }
  }, [hotel_place_id]);

  // const distance = useFindRange(thisAirport.place_id, hotel_place_id)
  const relevantSchema = useFindRelevantSchema(
    car_class_id,
    thisAirport.place_id,
    allSchema,
    hotel_place_id
  );

  return (
    <>
      <Head>
        <title>Quicco - Car Details</title>
      </Head>
      {!relevantSchema ? (
        <LoadingPage />
      ) : (
        <>
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
              {/* <ChangeBookingDetailsWidget allAirportData={allAirportData} /> */}

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
                      {relevantSchema?.range.text}
                    </span>
                  </p>
                  <p>
                    Date:{" "}
                    <span className="font-medium text-gray-dark">{date}</span>
                  </p>
                </div>

                <hr class="my-8 border-[#D9D9D9]" />

                <div class="flex justify-between items-center">
                  <span class="text-gray-dark">Vehicle Subtotal: </span>
                  <span class="font-bold">
                    {`THB ${new Intl.NumberFormat("en-US").format(
                      relevantSchema
                        ? relevantSchema.schema.base_price
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
                        ? relevantSchema.schema.base_price
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
      )}
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

  const { car_class_id } = context.query;

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
