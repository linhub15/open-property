import type { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

import AssessmentChart from "../islands/assessment_chart.tsx";

import { Consumer } from "../lib/data.edmonton.ca/soda_client.ts";
import {
  type Property,
  PropertySchema,
} from "../lib/data.edmonton.ca/property.type.ts";
import type { PropertyInfo } from "../lib/data.edmonton.ca/property_info.type.ts";
import { formatAddress } from "../lib/format_address.ts";
import { TopActionBar } from "./(_components)/top_action_bar.tsx";
import * as v from "@valibot/valibot";

type Response = {
  info: PropertyInfo | undefined;
  history: Partial<Property>[];
};

export const handler: Handlers = {
  async GET(_, ctx) {
    const { id } = ctx.params;

    const queryInfo = async (accountNumber: string) => {
      const consumer = new Consumer("https://data.edmonton.ca", {
        datasetId: "dkk9-cj3x",
      });

      const results = await consumer.query()
        .where(`account_number = '${accountNumber}'`)
        .limit(10)
        .getRows<PropertyInfo>();

      return results.shift();
    };

    const queryCurrent = async (accountNumber: string) => {
      const consumer = new Consumer("https://data.edmonton.ca", {
        datasetId: "q7d6-ambg",
      });

      const results = await consumer
        .query()
        .where(`account_number = '${accountNumber}'`)
        .limit(1)
        .getRows<Property>();

      const current = v.parse(v.partial(PropertySchema), results.at(0));

      return current;
    };

    const queryHistory = async (accountNumber: string) => {
      const consumer = new Consumer("https://data.edmonton.ca", {
        datasetId: "qi6a-xuwt",
      });

      const results = await consumer
        .query()
        .where(`account_number = '${accountNumber}'`)
        .limit(20)
        .getRows<Property>();

      // todo(hubert): add .order() to the query instead of sorting after
      const mapped = results
        .toSorted((a, b) =>
          Number(a.assessment_year) - Number(b.assessment_year)
        )
        .map((p) => v.parse(v.partial(PropertySchema), p));

      return mapped;
    };

    const history = await queryHistory(id);
    const current = await queryCurrent(id);

    if (current) {
      const lastYear = history.at(-1)?.assessment_year;
      current.assessment_year = Number(lastYear) + 1;
      history.push(current);
    }

    const response: Response = {
      info: await queryInfo(id),
      history: history,
    };

    return ctx.render(response);
  },
};

export default function PropertyPage(
  { params, data }: PageProps<Response | undefined>,
) {
  if (!data || !data.info || !data.history) {
    return <h1>Property {params} not found</h1>;
  }

  return (
    <>
      <Head>
        <title>Open Property | {formatAddress(data.info)}</title>
      </Head>

      <TopActionBar />

      <div class="md:flex md:flex-row">
        <div class="flex flex-col justify-center md:w-1/3 my-8 mx-4 py-3 text-center rounded-lg shadow-lg dark:bg-gray-800">
          <h1 class="mb-3 dark:text-white">
            {formatAddress(data.info)}
          </h1>
          <p class="text-5xl text-gray-700 dark:text-gray-400">
            ${data.history.at(-1)?.assessed_value}
          </p>
          <small class="text-gray-800 dark:text-gray-500">
            {data.history.at(-1)?.assessment_year}
          </small>
        </div>

        <div class="md:w-2/3">
          <AssessmentChart histories={data.history} />
        </div>
      </div>
    </>
  );
}
