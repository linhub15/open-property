import { useEffect, useState } from "preact/hooks";

import { and, Consumer, or } from "./soda_client.ts";
import { PropertyInfo } from "./property_info.model.ts";

function useSearchResults(search: string | undefined) {
  const maxResults = 5;
  const [results, setResults] = useState<PropertyInfo[]>([]);

  const consumer = new Consumer("https://data.edmonton.ca", {
    datasetId: "dkk9-cj3x",
  });

  useEffect(() => {
    if (!search) {
      setResults([]);
      return;
    }

    search = search.toUpperCase();

    const hasSpaceQuery = async () => {
      const values = search?.split(/\s/);
      if (!values) return;

      const result = await consumer
        .query()
        .where(
          `suite='${values[0]}'`,
          and(`house_number like '${values[1]}%'`),
          and(`street_name like '${values.slice(2).join(" ")}%'`),
          or(
            `house_number='${values[0]}'`,
            and(`street_name like '${values.slice(1).join(" ")}%'`),
          ),
        )
        .limit(maxResults)
        .getRows<PropertyInfo>();

      setResults(result);
    };

    const noSpaceQuery = async () => {
      const result = await consumer
        .query()
        .where(
          `suite like '${search}%'`,
          or(`house_number like '${search}%'`),
          or(`street_name like '${search}%'`),
        )
        .limit(maxResults)
        .getRows<PropertyInfo>();

      setResults(result);
    };

    if (!/\s/g.test(search || "")) {
      noSpaceQuery();
    } else {
      hasSpaceQuery();
    }
  }, [search]);

  return results;
}

export { useSearchResults };
