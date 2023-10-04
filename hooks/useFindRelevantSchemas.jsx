import { getPrebookTime } from "@/utils/getPrebookTime";
import React, { useState, useEffect } from "react";

const useFindRelevantSchemas = (range, airport_id, date, guest) => {
  const [relevantSchemas, setRelevantSchemas] = useState([]);
  const [loadingSchemas, setLoadingSchemas] = useState([true]);
  const [relevantSchemasError, setRelevantSchemasError] = useState("");
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
        `${apiPath}/price-schema/all_relevant_schemas/airport_id=${airport_id}/range=${range?.value}/prebook=${prebookTime}/guest=${guest}`
      );
      if (!res.ok) {
        if (res.status === 422) {
          setRelevantSchemasError('Bad Field Error')
          setLoadingSchemas(false)
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
    relevantSchemasError
  };
};

export default useFindRelevantSchemas;
