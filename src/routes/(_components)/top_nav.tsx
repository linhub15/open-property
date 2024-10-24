import DataIcon from "../../components/icons/data_icon.tsx";
import GithubIcon from "../../components/icons/github_icon.tsx";

export function TopNav() {
  return (
    <nav class="max-w-screen-lg mx-auto flex flex-wrap items-center justify-between ">
      <h1 class="self-center text-xl whitespace-nowrap dark:text-white">
        <a href="/">Open Property</a>
        <span class="text-sm px-4 font-medium">by Hubert Lin</span>
      </h1>
      <div class="flex flex-row gap-3 items-center">
        <a
          class="dark:text-white p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          href="https://github.com/linhub15/open-property"
          aria-label="github repository link"
          target="_blank"
          title="Github repository"
          rel="noreferrer"
        >
          <GithubIcon />
        </a>
        <a
          class="dark:text-white p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          href="https://data.edmonton.ca/City-Administration/Property-Assessment-Data-Historical-/qi6a-xuwt"
          aria-label="City of Edmonton Property Assessment Data"
          target="_blank"
          title="Open Edmonton Data Set"
          rel="noreferrer"
        >
          <DataIcon />
        </a>
      </div>
    </nav>
  );
}
