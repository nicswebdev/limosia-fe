import React from "react";
import PickupDetailsAirportPickup from "./PickupDetailsView/PickupDetailsAirportPickup";
import PickupDetailsAirportDropoff from "./PickupDetailsView/PickupDetailsAirportDropoff";
import { useRouter } from "next/router";
import { formatPrice } from "@/utils/formatPrice";

const CheckoutBookingDetails = (props) => {
  const { bookingDetails, hotelAddress, pickupDate } = props;

  const { range, schema } = bookingDetails;

  const router = useRouter();

  const { booking_type } = router.query;
  const pickupDetailsView = {
    airportpickup: PickupDetailsAirportPickup,
    airportdropoff: PickupDetailsAirportDropoff,
  };
  const CurrentPickupDetailsView = pickupDetailsView[booking_type];



  return (
    <>
      <p className="title pb-8">Booking Details</p>

      <CurrentPickupDetailsView
        airportName={schema.airport.name}
        distance={range.text}
        hotelName={hotelAddress}
        pickupDate={pickupDate}
      />

      <div className="leading-relaxed pb-8 mb-10 border-b border-b-white">
        <p className="title">Car Class</p>
        <p className="font-bold">
          {schema.car_class.name}
          <br />
          {schema.car_class.description}
        </p>
      </div>

      <ul className="[&>li]:flex [&>li]:justify-between [&>li]:items-center [&>li]:gap-2">
        <li>
          <span>Vehicle Subtotal: </span>
          <span>{formatPrice(schema.base_price)}</span>
        </li>
        <li>
          <span>Tax:</span>
          <span>USD 0</span>
        </li>
        <li className="title pt-3 max-sm:flex-col">
          <span>Your total price:</span>
          <span>{formatPrice(schema.base_price)}</span>
        </li>
      </ul>
    </>
  );
};

export default CheckoutBookingDetails;
