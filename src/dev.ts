import dev from "$fresh/dev.ts";
import config from "../src/fresh.config.ts";

await dev(import.meta.url, "./main.ts", config);
