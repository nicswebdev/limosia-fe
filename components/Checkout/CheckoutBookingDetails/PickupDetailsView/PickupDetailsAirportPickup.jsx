import React from "react";

const PickupDetailsAirportPickup = (props) => {
  const { airportName, hotelName, distance, pickupDate } = props;
  return (
    <div className="leading-relaxed pb-8">
      <p className="title">Pick-up Details</p>
      <p>
        From: <span className="font-bold">{airportName}</span>
      </p>
      <p>
        To: <span className="font-bold">{hotelName} </span>
      </p>
      <p>
        Total: <span className="font-bold">{distance} </span>
      </p>
      <p>
        Date: <span className="font-bold">{pickupDate}</span>
      </p>
    </div>
  );
};

export default PickupDetailsAirportPickup;
