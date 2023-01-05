import { useState } from "preact/hooks";
import SearchInput from "../components/search_input.tsx";
import SearchResultContainer from "../components/search_result_container.tsx";
import { useSearchResults } from "../src/use_search_results.ts";

export default function AddressSearch() {
  const [search, setSearch] = useState<string>();
  const [searchDelay, setSearchDelay] = useState<number>(NaN);
  const [loading, setLoading] = useState<boolean>(false);
  const results = useSearchResults(search, () => setLoading(false));

  const handleInput = (value: string) => {
    clearTimeout(searchDelay);
    setSearchDelay(NaN);

    if (!value) {
      return setSearch(undefined);
    }

    setLoading(true);
    setSearchDelay(setTimeout(() => setSearch(value), 500));
  };

  return (
    <div class="bg-white border border-gray-200 rounded-lg p-3 dark:bg-gray-800 dark:border-gray-700">
      <p class="dark:text-white my-2 ml-1">
        Enter an Edmonton address
      </p>

      <header>
        <SearchInput onInput={(e) => handleInput(e.currentTarget.value)} />
      </header>

      <div
        class={`overflow-y-hidden transition-[max-height] ${
          search && search?.length > 0 ? "max-h-96" : "max-h-0"
        }`}
      >
        <div
          role="status"
          class={`px-4 animate-pulse ${!loading && "hidden"}`}
        >
          <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-56 my-8">
          </div>
          <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-44 my-8">
          </div>
          <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48 my-8">
          </div>
          <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-36 my-8">
          </div>
          <span class="sr-only">Loading...</span>
        </div>

        {!loading && results && results?.length > 0 &&
          (
            <div class="mt-4" role="results">
              <SearchResultContainer searchResults={results} />
            </div>
          )}

        {/* Error States: Not found, todo(hubert): time out */}
        {!loading && results?.length === 0 &&
          (
            <p class="mt-4 px-4 dark:text-white">
              Can't find {search}, try a different address
            </p>
          )}
      </div>
    </div>
  );
}
