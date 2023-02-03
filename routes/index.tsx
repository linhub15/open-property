import { Head } from "$fresh/runtime.ts";
import AppTemplate from "../components/page_layout.tsx";
import TopNav from "../components/top_nav.tsx";
import AddressSearch from "../islands/address_search.tsx";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Open Property | Edmonton</title>
      </Head>

      <AppTemplate header={<TopNav />}>
        <AddressSearch />
      </AppTemplate>
    </>
  );
}
