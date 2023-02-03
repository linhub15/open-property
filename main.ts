/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";

import twindPlugin from "$fresh/plugins/twind.ts";
import googleAnalyticsPlugin from "./plugins/google_analytics.ts";
import twindConfig from "./twind.config.ts";

await start(manifest, {
  plugins: [
    twindPlugin(twindConfig),
    googleAnalyticsPlugin("G-LG7XQ7H5RG"),
  ],
});
