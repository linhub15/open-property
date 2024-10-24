import { Head } from "$fresh/runtime.ts";
import { AddressSearch } from "../islands/address_search/address_search.tsx";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Open Property | Edmonton</title>
      </Head>

      <AddressSearch />
    </>
  );
}
