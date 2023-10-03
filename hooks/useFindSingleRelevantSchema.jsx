import { getPrebookTime } from "@/utils/getPrebookTime";
import React, { useEffect, useState } from "react";

const useFindSingleRelevantSchema = (
  airport_id,
  car_class_id,
  range,
  date
) => {
  const [relevantSchema, setRelevantSchema] = useState([]);
  const [relevantSchemaLoading, setRelevantSchemaLoading] = useState(true);

  useEffect(() => {
    if (!range) {
      return;
    }
    const fetchSingleRelevantSchema = async () => {
      setRelevantSchemaLoading(true);
      //Prebook Time of This Order
      const prebookTime = getPrebookTime(date);
      // return
      const apiPath = process.env.NEXT_PUBLIC_API_PATH;
      const res = await fetch(
        `${apiPath}/price-schema/single/${airport_id}/${car_class_id}/${range?.value}/${prebookTime}`
      );
      if (!res.ok) {
        if (res.status === 422) {
          alert("Bad Field Error");
        }
        return;
      }
      const resData = await res.json();
      setRelevantSchema(resData);
      setRelevantSchemaLoading(false);
    };
    fetchSingleRelevantSchema()
  }, [range, date, car_class_id, airport_id]);
  return { relevantSchema, relevantSchemaLoading };
};

export default useFindSingleRelevantSchema;
