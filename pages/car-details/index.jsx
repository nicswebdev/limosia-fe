import { getServerSession } from "next-auth";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import { useRouter } from "next/router";
import LoadingPage from "@/components/LoadingPage";
import useFindRange from "@/hooks/useFindRange";
import useFindSingleRelevantSchema from "@/hooks/useFindSingleRelevantSchema";
import { formatPrice } from "@/utils/formatPrice";

const CarDetails = ({ thisAirportData }) => {
  //Get query params
  const router = useRouter();
  const {
    date,
    car_class_id,
    airport_id,
    booking_type,
    hotel_place_id,
    guest_number,
    selected_price,
  } = router.query;

  const checkoutLink = `/checkout?booking_type=${booking_type}&airport_id=${airport_id}&hotel_place_id=${hotel_place_id}&car_class_id=${car_class_id}&date=${date}&guest_number=${guest_number}&selected_price=${selected_price}`;

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

  const range = useFindRange(thisAirportData.place_id, hotel_place_id);
  const { relevantSchema, relevantSchemaLoading, relevantSchemaError } =
    useFindSingleRelevantSchema(
      airport_id,
      car_class_id,
      range,
      date,
      guest_number
    );
  if (relevantSchemaLoading) {
    return <LoadingPage />;
  }
  //IF NO SCHEMA FOUND OR GET ERROR WHEN FETCHING REDIRECT TO ERROR
  if (!relevantSchema || relevantSchemaError) {
    router.push("/error");
    return;
  }
  const {
    car_class_image,
    car_class_name,
    car_class_description,
    relevant_refundable_price,
    relevant_non_refundable_price,
    airport_name,
  } = relevantSchema;
  // console.log(relevantSchema)
  const PriceDisplay = {
    refundable: () => {
      return (
        <span className="text-sm md:text-base md:text-xl font-semibold">
          {`THB ${formatPrice(relevant_refundable_price)}`} (refundable)
        </span>
      );
    },
    nonRefundable: () => {
      return (
        <span className="text-sm md:text-base md:text-xl font-semibold">
          {`THB ${formatPrice(relevant_non_refundable_price)}`} (non-refundable)
        </span>
      );
    },
  };
  const CurrentSelectedPrice = PriceDisplay[selected_price];

  return (
    <>
      <Head>
        <title>Quicco - Car Details</title>
      </Head>
      <>
        <div className="main-container pt-6 pb-8 mt-28">
          <ul className="breadcrumb-list">
            <li>
              <a className="flex flex-row items-center gap-[10px]">
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
        <div className="main-container pb-20 lg:pb-32">
          <div className="sidebar">
            {/* This is the car image */}
            <div className="flex justify-center items-center w-full rounded-[15px] bg-gray-light">
              <img src={car_class_image} alt="Car" className="object-fill" />
            </div>
          </div>

          <div className="main-content">
            {/* <ChangeBookingDetailsWidget allAirportData={allAirportData} /> */}
            <div className="px-4 py-8 md:p-6 xl:p-10 rounded-[15px] box-shadow text-black-2">
              <p className="title">Vehicle</p>
              <p className="font-bold text-black">{car_class_name}</p>
              <p className="font-medium text-gray-dark">
                {car_class_description}
              </p>

              <div className="leading-relaxed mt-4">
                <p className="title">Pick-up Details</p>
                <p>
                  From:{" "}
                  <span className="font-medium text-gray-dark">
                    {booking_type === "airportpickup"
                      ? airport_name
                      : hotelAddress}
                  </span>
                </p>
                <p>
                  To:{" "}
                  <span className="font-medium text-gray-dark">
                    {booking_type === "airportpickup"
                      ? hotelAddress
                      : airport_name}
                  </span>
                </p>
                <p>
                  Total:{" "}
                  <span className="font-medium text-gray-dark">
                    {range?.text}
                  </span>
                </p>
                <p>
                  Date:{" "}
                  <span className="font-medium text-gray-dark">{`${new Date(
                    date
                  ).getDate()} - ${new Date(date).getMonth() + 1} - ${new Date(
                    date
                  ).getFullYear()}`}</span>
                </p>
              </div>

              <hr className="my-8 border-[#D9D9D9]" />

              <div className="flex justify-between items-center">
                <span className="text-gray-dark">Vehicle Subtotal: </span>
                <CurrentSelectedPrice />
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-dark">tax: </span>
                <span className="font-bold">THB 0</span>
              </div>

              <div className="flex max-sm:flex-col justify-between sm:items-center pt-5">
                <span className="title">Your total price:</span>
                <CurrentSelectedPrice />
              </div>
              <div className="pt-12">
                <Link href={checkoutLink} className="btn-blue">
                  <span>ACCEPT RATE AND PAY NOW</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default CarDetails;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  console.log(session);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const apiPath = process.env.NEXT_PUBLIC_API_PATH;
  const { airport_id, booking_type, selected_price } = context.query;
  const fetchThisAirportData = async (airportId) => {
    const res = await fetch(`${apiPath}/airports/${airportId}`);
    const resData = await res.json();
    if (!res.ok) {
      return;
    }
    return resData;
  };
  const thisAirportData = await fetchThisAirportData(airport_id);
  if (
    !thisAirportData ||
    (booking_type != "airportpickup" && booking_type != "airportdropoff") ||
    (selected_price != "refundable" && selected_price != "nonRefundable")
  ) {
    return {
      redirect: {
        destination: "/error",
        permanent: false,
      },
    };
  }

  return {
    props: {
      thisAirportData,
    },
  };
}
