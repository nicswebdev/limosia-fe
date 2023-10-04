import React, { useEffect, useRef } from "react";

const MapComponent = (props) => {
  const mapRef = useRef(null);
  const { booking_type, airport_place_id, hotel_place_id } = props;
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
            } else {
              // alert("Directions request failed due to " + status);
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
  }, [airport_place_id, hotel_place_id]);
  return (
    <div class="w-full h-[16.625rem] pb-5">
      <div ref={mapRef} style={{ width: "100%", height: "100%" }}></div>
    </div>
  );
};

export default MapComponent;
