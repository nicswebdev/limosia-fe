import { useEffect, useState } from "react";

function useFindRange(airportPlaceId, hotelPlaceId) {
  const [range, setRange] = useState();
  const findDistance = async () => {
    // Count range between destinations
    if (airportPlaceId && hotelPlaceId) {
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
      directionsService.route(
        {
          origin: { placeId: airportPlaceId },
          destination: { placeId: hotelPlaceId },
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === "OK") {
            directionsRenderer.setDirections(response);
            const route = response.routes[0].legs[0];
            setRange({
              text: route.distance.text,
              value: route.distance.value / 1000,
              duration: route.duration.text,
            });
          } else {
            alert("Directions request failed due to " + status);
            // console.error("Directions request failed", response);
          }
        }
      );
    }
  };
  useEffect(() => {
    if (!airportPlaceId || !hotelPlaceId) {
      return;
    }
    // console.log("runs");
    window.findDistance = findDistance;
    if (window.google && window.google.maps) {
      findDistance();
    }
  }, [airportPlaceId, hotelPlaceId]);
  return range;
}

export default useFindRange;
