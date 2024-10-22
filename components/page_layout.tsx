import type { ComponentChildren } from "preact";

export default function PageLayout(
  props: { children: ComponentChildren; header: ComponentChildren },
) {
  return (
    <>
      <div class="bg-gray-50 dark:bg-gray-900 min-h-screen h-full">
        <div class="p-3 border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700">
          {props.header}
        </div>
        <main class="max-w-screen-lg mx-3 mt-6 lg:mx-auto">
          {props.children}
        </main>
      </div>
    </>
  );
}
