import type { PageProps } from "$fresh/server.ts";
import { TopNav } from "./(_components)/top_nav.tsx";

export default function Layout({ Component }: PageProps) {
  return (
    <>
      <div class="bg-gray-50 dark:bg-gray-900 min-h-screen h-full">
        <div class="p-3 border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700">
          <TopNav />
        </div>
        <main class="max-w-screen-lg mx-3 mt-6 lg:mx-auto">
          <Component />
        </main>
      </div>
    </>
  );
}
