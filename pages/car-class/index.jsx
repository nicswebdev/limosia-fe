import ChangeBookingDetailsWidget from "@/components/ChangeBookingDetailsWidget/ChangeBookingDetailsWidget";
import LoginModal from "@/components/LoginModal";
import MapComponent from "@/components/Map";
import useFindRange from "@/hooks/useFindRange";
import { getRelevantSchema } from "@/utils/getRelevantSchema";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

const CarClass = ({ carClassData, priceSchema, allAirportData }) => {
  const router = useRouter();
  const { hotel_place_id, booking_type, date, airport_id } = router.query;
  
  const thisAirport = allAirportData.items.find(
    (item) => item.id == airport_id
  );
  const airport_place_id = thisAirport.place_id;

  const { data: session } = useSession();
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const closeLoginDialog = () => {
    setOpenLoginDialog(false);
  };

  const [destinationLink, setDestinationLink] = useState("");
  const range = useFindRange(airport_place_id, hotel_place_id);

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

          <MapComponent
            booking_type={booking_type}
            airport_place_id={airport_place_id}
            hotel_place_id={hotel_place_id}
          />

          <div class="leading-relaxed">
            <p>
              Total Range: <span class="font-bold">{range?.text}</span>
            </p>
            <p>
              Total Duration: <span class="font-bold">{range?.duration}</span>
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
          <ChangeBookingDetailsWidget allAirportData={allAirportData} />
          <div class="flex flex-col gap-8">
            {carClassData.items.map((item, index) => {
              //Get the relevant schema for car class, airport, and range
              const relevantSchema = getRelevantSchema(
                priceSchema,
                airport_place_id,
                item.id,
                range?.value
              );
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
  const allAirportData = await fetch(
    `${apiPath}/airports?page=1&limit=9999999&sortBy=ASC`
  ).then((res) => res.json());

  return {
    props: {
      carClassData,
      priceSchema,
      allAirportData,
    },
  };
}
