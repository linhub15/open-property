import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

import AppTemplate from "../components/app_template.tsx";
import AssessmentChart from "../islands/assessment_chart.tsx";

import { Consumer } from "../src/soda_client.ts";
import { PropertyHistory } from "../src/property_history.model.ts";
import { PropertyInfo } from "../src/property_info.model.ts";
import { formatAddress } from "../src/format_address.ts";

type Property = {
  info: PropertyInfo | undefined;
  history: PropertyHistory[];
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

    const queryHistory = async (accountNumber: string) => {
      const consumer = new Consumer("https://data.edmonton.ca", {
        datasetId: "qi6a-xuwt",
      });

      const results = await consumer
        .query()
        .where(`account_number = '${accountNumber}'`)
        .limit(20)
        .getRows<PropertyHistory>();

      // todo(hubert): add .order() to the query instead of sorting after
      results.sort((a, b) => a.assessment_year - b.assessment_year);

      return results;
    };

    const property: Property = {
      info: await queryInfo(id),
      history: await queryHistory(id),
    };

    return ctx.render(property);
  },
};

export default function PropertyPage(
  { params, data }: PageProps<Property | undefined>,
) {
  const { id } = params;
  if (!data || !data.info || !data.history) {
    return <h1>Property {params} not found</h1>;
  }

  return (
    <>
      <Head>
        <title>Open Property | {formatAddress(data.info)}</title>
      </Head>

      <AppTemplate>
        <h1 class="mb-3 text-center dark:text-white">
          {formatAddress(data.info)}
        </h1>

        <div class="my-8 text-center">
          <small class="text-gray-800 dark:text-gray-500">
            {data.history.at(-1)?.assessment_year}
          </small>
          <p class="text-5xl text-center text-gray-700 dark:text-gray-400">
            ${data.history.at(-1)?.assessed_value}
          </p>
        </div>

        <AssessmentChart histories={data.history} />

        <div class="mt-12 text-center">
          <a
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2
              dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            href="/"
          >
            Search again
          </a>
        </div>
      </AppTemplate>
    </>
  );
}
