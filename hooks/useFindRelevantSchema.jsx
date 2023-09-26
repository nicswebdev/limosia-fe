import { useEffect, useState } from "react";
import useFindRange from "./useFindRange";
import { getRelevantSchema } from "@/utils/getRelevantSchema";

export const useFindRelevantSchema = (
  carClass,
  airportPlaceId,
  priceSchema,
  hotelPlaceId,
  guest
) => {
  const [relevantSchema, setRelevantSchema] = useState(null);
  const range = useFindRange(airportPlaceId, hotelPlaceId);
  useEffect(() => {
    if (!range) {
      return;
    }
    // console.log('adjasjdsaj')
    // console.log(range)
    const schema = getRelevantSchema(
      priceSchema,
      airportPlaceId,
      carClass,
      range.value,
      guest
    );
    if (!schema) {
      window.location.href = "/error";
      return;
    }
    // console.log(schema)
    setRelevantSchema({
      schema,
      range,
    });
  }, [range]);
  // console.log(relevantSchema);

  return relevantSchema;
};
