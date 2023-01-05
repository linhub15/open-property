import DataIcon from "./icons/data_icon.tsx";
import GithubIcon from "./icons/github_icon.tsx";

export default function TopNav() {
  return (
    <nav class="p-3 border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700">
      <div class="max-w-screen-lg mx-auto flex flex-wrap items-center justify-between ">
        <h1 class="self-center text-xl whitespace-nowrap dark:text-white">
          <a href="/">Open Property</a>
        </h1>
        <div class="flex flex-row gap-3 items-center">
          <a
            class="dark:text-white p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            href="https://github.com/linhub15/open-property"
            aria-label="github repository link"
            target="_blank"
            title="Github repository"
          >
            <GithubIcon />
          </a>
          <a
            class="dark:text-white p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            href="https://data.edmonton.ca/City-Administration/Property-Assessment-Data-Historical-/qi6a-xuwt"
            aria-label="City of Edmonton Property Assessment Data"
            target="_blank"
            title="Open Edmonton Data Set"
          >
            <DataIcon />
          </a>
        </div>
      </div>
    </nav>
  );
}
