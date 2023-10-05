import React, { useEffect, useState } from "react";

const useFindThreeCheapestSchema = () => {
  const [threeCheapestSchema, setThreeCheapestSchema] = useState([]);
  const [cheapestSchemaLoading, setCheapestSchemaLoading] = useState(true);
  useEffect(() => {
    const getThreeCheapestSchema = async () => {
      const apiPath = process.env.NEXT_PUBLIC_API_PATH;
      const res = await fetch(`${apiPath}/price-schema/three-cheapest-schema`);
      const resData = await res.json();
      setThreeCheapestSchema(resData.items);
      setCheapestSchemaLoading(false);
    };
    getThreeCheapestSchema();
  }, []);
  return { threeCheapestSchema, cheapestSchemaLoading };
};

export default useFindThreeCheapestSchema;
