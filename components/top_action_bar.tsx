import SearchIcon from "./icons/search_icon.tsx";

export default function TopActionBar() {
  return (
    <div class="max-w-screen-lg mx-auto">
      <a
        class="
          inline-flex items-center
          text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg px-2.5 py-2
          dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        href="/"
      >
        <span class="mr-1">
          <SearchIcon />
        </span>
        <span>
          New Search
        </span>
      </a>
    </div>
  );
}
