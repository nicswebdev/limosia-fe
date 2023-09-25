import React, { useEffect, useRef, useState } from "react";

const AutoCompleteHotelInput = (props) => {
  const { className, changeSearchHotel, value, onChange } = props;
  const autocompleteOriginRef = useRef("");

  useEffect(() => {
    const initAutoComplete = async () => {
      const autocompleteOrigin = new window.google.maps.places.Autocomplete(
        autocompleteOriginRef.current,
        {
          types: ["lodging"],
          fields: ["name", "place_id", "types"],
          componentRestrictions: { country: "th" },
        }
      );
      //Listen to search hotel
      autocompleteOrigin.addListener("place_changed", () => {
        const place = autocompleteOrigin.getPlace();
        // console.log(place);
        if (place && place.types.indexOf("lodging") === -1) {
          alert("Please select a hotel");
          autocompleteOriginRef.current.value = "";
        } else {
          console.log(place);
          changeSearchHotel(place?.name, place?.place_id);
        }
      });
    };
    window.initAutoComplete = initAutoComplete;
    if (window.google && window.google.maps) {
      initAutoComplete();
    }
  }, []);

  return (
    <input
      value={value}
      onChange={onChange}
      className={className}
      ref={autocompleteOriginRef}
    />
  );
};

export default AutoCompleteHotelInput;
