import React from "react";
import PickupDetailsAirportPickup from "./PickupDetailsView/PickupDetailsAirportPickup";
import PickupDetailsAirportDropoff from "./PickupDetailsView/PickupDetailsAirportDropoff";
import { useRouter } from "next/router";
import { formatPrice } from "@/utils/formatPrice";

const CheckoutBookingDetails = (props) => {
  const { bookingDetails, hotelAddress, pickupDate } = props;

  const {
    range,
    airport_name,
    car_class_name,
    car_class_description,
    relevant_refundable_price,
    relevant_non_refundable_price,
  } = bookingDetails;
  const router = useRouter();

  const { booking_type, selected_price } = router.query;
  const pickupDetailsView = {
    airportpickup: PickupDetailsAirportPickup,
    airportdropoff: PickupDetailsAirportDropoff,
  };
  const CurrentPickupDetailsView = pickupDetailsView[booking_type];
  const PriceView = {
    refundable: () => {
      return (
        <ul className="[&>li]:flex [&>li]:justify-between [&>li]:items-center [&>li]:gap-2">
          <li>
            <span>Vehicle Subtotal: </span>
            <span>{`THB ${formatPrice(
              relevant_refundable_price
            )} (refundable)`}</span>
          </li>
          <li>
            <span>Tax:</span>
            <span>USD 0</span>
          </li>
          <li className="text-base font-semibold pt-3 max-sm:flex-col">
            <span>Your total price:</span>
            <span>{`THB ${formatPrice(
              relevant_refundable_price
            )} (refundable)`}</span>
          </li>
        </ul>
      );
    },
    nonRefundable: () => {
      return (
        <ul className="[&>li]:flex [&>li]:justify-between [&>li]:items-center [&>li]:gap-2">
          <li>
            <span>Vehicle Subtotal: </span>
            <span>{`THB ${formatPrice(
              relevant_non_refundable_price
            )} (non_refundable)`}</span>
          </li>
          <li>
            <span>Tax:</span>
            <span>USD 0</span>
          </li>
          <li className="text-base font-semibold pt-3 max-sm:flex-col">
            <span>Your total price:</span>
            <span>{`THB ${formatPrice(
              relevant_non_refundable_price
            )} (non refundable)`}</span>
          </li>
        </ul>
      );
    },
  };
  const CurrentPriceView = PriceView[selected_price];

  return (
    <>
      <p className="title pb-8">Booking Details</p>
      <CurrentPickupDetailsView
        airportName={airport_name}
        distance={range.text}
        hotelName={hotelAddress}
        pickupDate={pickupDate}
      />

      <div className="leading-relaxed pb-8 mb-10 border-b border-b-white">
        <p className="title">Car Class</p>
        <p className="font-bold">
          {car_class_name}
          <br />
          {car_class_description}
        </p>
      </div>
      <CurrentPriceView />
    </>
  );
};

export default CheckoutBookingDetails;
