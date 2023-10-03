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

const CarDetails = ({ allAirportData }) => {
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

  //Find this airport from all airport data, all airport data is needed to change details
  const thisAirport = allAirportData.items.find(
    (item) => item.id == airport_id
  );
  const checkoutLink = `/checkout?booking_type=${booking_type}&airport_id=${airport_id}&hotel_place_id=${hotel_place_id}&car_class_id=${car_class_id}&date=${date}&guest_number=${guest_number}`;

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

  const range = useFindRange(thisAirport.place_id, hotel_place_id);
  const { relevantSchema, relevantSchemaLoading } = useFindSingleRelevantSchema(
    airport_id,
    car_class_id,
    range,
    date
  );
  // console.log(relevantSchema);

  const {
    image,
    name,
    description,
    relevant_refundable_price,
    relevant_non_refundable_price,
  } = relevantSchema;

  // console.log(relevantSchema)

  const PriceDisplay = {
    refundable: () => {
      return (
        <span class="title">
          {`THB ${formatPrice(relevant_refundable_price)}`} (refundable)
        </span>
      );
    },
    nonRefundable: () => {
      return (
        <span class="title">
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
      {relevantSchemaLoading ? (
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
                <img src={image} alt="Car" class="max-w-full" />
              </div>
            </div>

            <div class="main-content">
              {/* <ChangeBookingDetailsWidget allAirportData={allAirportData} /> */}

              <div className="px-4 py-8 md:p-6 xl:p-10 rounded-[15px] box-shadow text-black-2">
                <p className="title">Vehicle</p>
                <p className="font-bold text-black">{name}</p>
                <p className="font-medium text-gray-dark">{description}</p>

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
                      {range?.text}
                    </span>
                  </p>
                  <p>
                    Date:{" "}
                    <span className="font-medium text-gray-dark">{`${new Date(
                      date
                    ).getDate()} - ${
                      new Date(date).getMonth() + 1
                    } - ${new Date(date).getFullYear()}`}</span>
                  </p>
                </div>

                <hr class="my-8 border-[#D9D9D9]" />

                <div class="flex justify-between items-center">
                  <span class="text-gray-dark">Vehicle Subtotal: </span>
                  <CurrentSelectedPrice />
                </div>

                <div class="flex justify-between items-center">
                  <span class="text-gray-dark">tax: </span>
                  <span class="font-bold">THB 0</span>
                </div>

                <div class="flex max-sm:flex-col justify-between sm:items-center pt-5">
                  <span class="title">Your total price:</span>
                  <CurrentSelectedPrice />
                </div>
                <div class="pt-12">
                  <Link href={checkoutLink} class="btn-blue">
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

  const allAirportData = await fetch(
    `${apiPath}/airports?page=1&limit=9999999&sortBy=ASC`
  ).then((res) => res.json());

  return {
    props: {
      allAirportData,
    },
  };
}
