import { Head } from "$fresh/runtime.ts";
import AppTemplate from "../components/app_template.tsx";
import AddressSearch from "../islands/address_search.tsx";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Open Property | Edmonton</title>
      </Head>

      <AppTemplate>
        <AddressSearch />
      </AppTemplate>
    </>
  );
}
