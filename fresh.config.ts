import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";
import googleAnalyticsPlugin from "./plugins/google_analytics.ts";

export default defineConfig({
  plugins: [
    tailwind(),
    googleAnalyticsPlugin("G-LG7XQ7H5RG"),
  ],
});