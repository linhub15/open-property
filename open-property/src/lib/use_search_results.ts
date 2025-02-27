import { useEffect, useState } from "preact/hooks";

import { and, Consumer, or } from "./data.edmonton.ca/soda_client.ts";
import type { PropertyInfo } from "./data.edmonton.ca/property_info.type.ts";

function useSearchResults(search: string | undefined, done: () => void) {
  const maxResults = 5;
  const [results, setResults] = useState<PropertyInfo[]>();

  const historical = new Consumer("https://data.edmonton.ca", {
    datasetId: "dkk9-cj3x",
  });

  useEffect(() => {
    if (!search) {
      setResults(undefined);
      return;
    }

    const searchValue = search?.toUpperCase();

    const hasSpaceQuery = async () => {
      const values = searchValue?.split(/\s/);
      if (!values) return;

      const result = await historical
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
      done();
    };

    const noSpaceQuery = async () => {
      const result = await historical
        .query()
        .where(
          `suite like '${searchValue}%'`,
          or(`house_number like '${searchValue}%'`),
          or(`street_name like '${searchValue}%'`),
        )
        .limit(maxResults)
        .getRows<PropertyInfo>();

      setResults(result);
      done();
    };

    if (!/\s/g.test(searchValue || "")) {
      noSpaceQuery();
    } else {
      hasSpaceQuery();
    }
  }, [search, historical, done]);

  return results;
}

export { useSearchResults };
