import { ComponentChildren } from "preact";
import TopNav from "./top_nav.tsx";

export default function AppTemplate(props: { children: ComponentChildren }) {
  return (
    <>
      <div class="bg-gray-50 dark:bg-gray-900 min-h-screen h-full">
        <TopNav />
        <main class="max-w-screen-lg mx-3 mt-6 lg:mx-auto">
          {props.children}
        </main>
      </div>
    </>
  );
}
