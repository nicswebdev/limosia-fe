import { getPrebookTime } from "@/utils/getPrebookTime";
import React, { useEffect, useState } from "react";

const useFindSingleRelevantSchema = (
  airport_id,
  car_class_id,
  range,
  date,
  guest
) => {
  const [relevantSchema, setRelevantSchema] = useState([]);
  const [relevantSchemaLoading, setRelevantSchemaLoading] = useState(true);
  const [relevantSchemaError, setRelevantSchemaError] = useState("");

  useEffect(() => {
    if (!range) {
      return;
    }
    const fetchSingleRelevantSchema = async () => {
      console.log('Fetching Data')
      setRelevantSchemaLoading(true);
      //Prebook Time of This Order
      const prebookTime = getPrebookTime(date);
      const apiPath = process.env.NEXT_PUBLIC_API_PATH;
      const res = await fetch(
        `${apiPath}/price-schema/single_relevant_schema/airport_id=${airport_id}/car_class_id=${car_class_id}/range=${range?.value}/prebook=${prebookTime}/guest=${guest}`
      );
      const resData = await res.json();
      if (!res.ok) {
        if (res.status === 422) {
          setRelevantSchemaError(resData.message);
          return
        }
        setRelevantSchemaLoading(false);
        return;
      }
      setRelevantSchema(resData.items);
      setRelevantSchemaLoading(false);
    };
    fetchSingleRelevantSchema();
  }, [range, date, car_class_id, airport_id]);
  return { relevantSchema, relevantSchemaLoading, relevantSchemaError };
};

export default useFindSingleRelevantSchema;
