export const getRelevantSchema = (priceSchema, airportPlaceId, carClassId, distanceValue) => {
  const place_id = airportPlaceId;

  // Step 1: Filter items based on place_id and car_class id
  const filteredItems = priceSchema.items.filter(
    (item) =>
      item.airport.place_id == place_id && item.car_class.id == carClassId
  );

  // Step 2: Find an item where distance is between from_range_km and to_range_km
  let basePriceItem = filteredItems.find(
    (item) =>
      distanceValue >= item.from_range_km && distanceValue <= item.to_range_km
  );

  // Step 3: If no item found in step 2, find the item with the highest to_range_km
  if (!basePriceItem) {
    basePriceItem = filteredItems.reduce(
      (prev, current) => {
        return prev.to_range_km > current.to_range_km ? prev : current;
      },
      { to_range_km: -1 }
    ); // Initialize with -1 to handle empty filteredItems case
  }
  if (filteredItems.length === 0) {
    return null;
  }
  // console.log(basePriceItem);
  // Return the entire object
  return basePriceItem;
};
