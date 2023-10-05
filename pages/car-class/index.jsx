import ChangeBookingDetailsWidget from "@/components/ChangeBookingDetailsWidget/ChangeBookingDetailsWidget";
import LoadingPage from "@/components/LoadingPage";
import LoginModal from "@/components/LoginModal";
import MapComponent from "@/components/Map";
import useFindRange from "@/hooks/useFindRange";
import useFindRelevantSchemas from "@/hooks/useFindRelevantSchemas";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";

const CarClass = ({ allAirportData, thisAirport }) => {
  const router = useRouter();
  const { hotel_place_id, booking_type, date, airport_id, guest_number } =
    router.query;

  const { data: session } = useSession();
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const closeLoginDialog = () => {
    setOpenLoginDialog(false);
  };
  const [destinationLink, setDestinationLink] = useState("");

  const airport_place_id = thisAirport?.place_id;

  const range = useFindRange(airport_place_id, hotel_place_id);
  const { relevantSchemas, loadingSchemas, relevantSchemasError } =
    useFindRelevantSchemas(range, airport_id, date, guest_number);

  if (!loadingSchemas && relevantSchemasError) {
    router.push("/error");
  }

  return (
    <>
      <Head>
        <title>Quicco - Car Search</title>
      </Head>
      <div className="main-container pt-6 pb-8 mt-28">
        <ul className="breadcrumb-list">
          <li>
            <a className="flex flex-row items-center gap-[0.625rem]">
              <img
                src="/assets/images/icons/material-symbols_home-rounded.svg"
                alt=""
                className="w-6"
              />
              <span>Reservation</span>
            </a>
          </li>
          <li>Choose Cars</li>
        </ul>
      </div>
      <div className="main-container pb-20 lg:pb-32">
        <div className="sidebar">
          <p className="title pb-5">ROUTE MAP</p>
          <MapComponent
            booking_type={booking_type}
            airport_place_id={airport_place_id}
            hotel_place_id={hotel_place_id}
          />

          <div className="leading-relaxed">
            <p>
              Total Range: <span className="font-bold">{range?.text}</span>
            </p>
            <p>
              Total Duration: <span className="font-bold">{range?.duration}</span>
            </p>
          </div>
        </div>

        <div className="main-content">
          {openLoginDialog && (
            <LoginModal
              destinationLink={destinationLink}
              closeModal={closeLoginDialog}
            />
          )}
          {/* // Work Here */}
          <ChangeBookingDetailsWidget allAirportData={allAirportData} />
          {loadingSchemas ? (
            <LoadingPage />
          ) : (
            <div className="flex flex-col gap-8">
              {relevantSchemas?.items?.map((item) => {
                const {
                  id,
                  car_class_image,
                  car_class_name,
                  car_class_description,
                  max_guest,
                  max_suitcase,
                  relevant_refundable_price,
                  relevant_non_refundable_price,
                } = item;
                //If all base price is set to 0 or null
                if (
                  relevant_refundable_price <= 0 &&
                  relevant_non_refundable_price <= 0
                  // ||max_guest < guest_number
                ) {
                  return;
                }
                return (
                  <>
                    {/* Car Image */}
                    <div className="car-card" key={id}>
                      <div className="image-wrap bg-[url('/img/hero-pattern.svg')]">
                        <img
                          src={car_class_image}
                          alt="Car"
                          className="max-xl:max-w-full xl:w-full h-full object-fill"
                        />
                      </div>
                      {/* Car Details */}
                      <div className="detail-wrap">
                        {/* Car Name */}
                        <p className="title">{car_class_name}</p>
                        {/* Car Description */}
                        <p className="font-bold text-gray-dark">
                          {car_class_description}
                        </p>
                        {/* Car More Details */}
                        <ul className="facility-list">
                          {/* Car Max Guest */}
                          <li>
                            <img
                              src="/assets/images/icons/ic_round-people-alt.svg"
                              alt="Icon"
                              className="w-6"
                            />
                            <p className="text-sm font-bold">{max_guest} People</p>
                          </li>
                          {/* Car Max Suitcase */}
                          <li>
                            <img
                              src="/assets/images/icons/fa-solid_luggage-cart.svg"
                              alt="Icon"
                              className="w-6"
                            />
                            <p className="text-sm font-bold">{max_suitcase} pcs</p>
                          </li>
                        </ul>
                        {/* Relevant prices book */}
                        <div className="grid grid-cols-1 gap-8">
                          {/* Relevant Refundable Price Section */}
                          {relevant_refundable_price > 0 && (
                            <div className="flex max-sm:flex-col justify-between items-center">
                              {/* Refundable price from schema */}
                              <p className="text-lg md:text-base font-bold max-sm:pb-5 sm:pr-4">
                                {`THB ${new Intl.NumberFormat("en-US").format(
                                  relevant_refundable_price
                                )}`}{" "}
                                (refundable)
                              </p>
                              {/* Book Button */}
                              <button
                                onClick={() => {
                                  // Generate booklink to details after select car
                                  const booklink = `/car-details?booking_type=${booking_type}&airport_id=${airport_id}&hotel_place_id=${hotel_place_id}&car_class_id=${item.car_class_id}&date=${date}&guest_number=${guest_number}&selected_price=refundable`;
                                  if (session) {
                                    window.location.href = booklink;
                                    return;
                                  }
                                  setDestinationLink(booklink);
                                  setOpenLoginDialog(true);
                                }}
                                className="btn-blue text-lg md:text-sm py-2 px-6 flex-shrink-0"
                              >
                                <span>BOOK NOW</span>
                              </button>
                            </div>
                          )}
                          {/* Relevant non refundable price section */}
                          {relevant_non_refundable_price > 0 && (
                            <div className="flex max-sm:flex-col justify-between items-center">
                              {/* Car price from schema */}
                              <p className="text-lg md:text-base font-bold max-sm:pb-5 sm:pr-4">
                                {`THB ${new Intl.NumberFormat("en-US").format(
                                  relevant_non_refundable_price
                                )}`}{" "}
                                (non-refundable)
                              </p>
                              {/* Book Button */}
                              <button
                                onClick={() => {
                                  // Generate booklink to details after select car
                                  const booklink = `/car-details?booking_type=${booking_type}&airport_id=${airport_id}&hotel_place_id=${hotel_place_id}&car_class_id=${item.car_class_id}&date=${date}&guest_number=${guest_number}&selected_price=nonRefundable`;
                                  if (session) {
                                    window.location.href = booklink;
                                    return;
                                  }
                                  setDestinationLink(booklink);
                                  setOpenLoginDialog(true);
                                }}
                                className="btn-blue text-lg md:text-sm py-2 px-6 flex-shrink-0"
                              >
                                <span>BOOK NOW</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CarClass;

export async function getServerSideProps(context) {
  const { airport_id, booking_type } = context.query;
  const apiPath = process.env.NEXT_PUBLIC_API_PATH;
  const allAirportData = await fetch(
    `${apiPath}/airports?page=1&limit=9999999&sortBy=ASC`
  ).then((res) => res.json());

  const thisAirport = allAirportData.items.find(
    (item) => item.id == airport_id
  );
  if (
    !thisAirport ||
    (booking_type != "airportpickup" && booking_type != "airportdropoff")
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
      allAirportData,
      thisAirport,
    },
  };
}
