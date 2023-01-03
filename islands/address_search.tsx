import { useState } from "preact/hooks";
import SearchInput from "../components/search_input.tsx";
import SearchResultContainer from "../components/search_result_container.tsx";
import { useSearchResults } from "../src/use_search_results.ts";

export default function AddressSearch() {
  const [search, setSearch] = useState<string>();
  const results = useSearchResults(search);

  let searchDelay: number;

  const handleInput = (value: string) => {
    clearTimeout(searchDelay);
    searchDelay = setTimeout(
      () => setSearch(value),
      400
    )
  };

  return (
    <div class="bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <header>
        <SearchInput onInput={(e) => handleInput(e.currentTarget.value)} />
      </header>

      {results?.length > 0 &&
        (
          <div class="mt-4">
            <SearchResultContainer searchResults={results} />
          </div>
        )}

      {search && !results?.length &&
        <p class="dark:text-white">Can't find that address</p>}
    </div>
  );
}
