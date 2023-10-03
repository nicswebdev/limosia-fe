import { getPrebookTime } from "@/utils/getPrebookTime";
import React, { useState, useEffect } from "react";

const useFindRelevantSchemas = (range, airport_id, date) => {
  const [relevantSchemas, setRelevantSchemas] = useState([]);
  const [loadingSchemas, setLoadingSchemas] = useState([true]);
  useEffect(() => {
    if (!range) {
      return;
    }
    const fetchSchemasBasedOnAirportAndRange = async () => {
      setLoadingSchemas(true);
      //Prebook Time of This Order
      const prebookTime = getPrebookTime(date);
      // return
      const apiPath = process.env.NEXT_PUBLIC_API_PATH;
      const res = await fetch(
        `${apiPath}/price-schema/${airport_id}/${range?.value}/${prebookTime}`
      );
      if (!res.ok) {
        if (res.status === 422) {
          alert("Bad Field Error");
        }
        return;
      }
      const resData = await res.json();
      setRelevantSchemas(resData);
      setLoadingSchemas(false);
    };
    if ((range, airport_id, date)) {
      fetchSchemasBasedOnAirportAndRange();
    }
  }, [range, airport_id, date]);
  return {
    relevantSchemas,
    loadingSchemas,
  };
};

export default useFindRelevantSchemas;
