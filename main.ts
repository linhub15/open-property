/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";

import tailwind from "$fresh/plugins/tailwind.ts";
import googleAnalyticsPlugin from "./plugins/google_analytics.ts";

await start(manifest, {
  plugins: [
    tailwind(),
    googleAnalyticsPlugin("G-LG7XQ7H5RG"),
  ],
});
