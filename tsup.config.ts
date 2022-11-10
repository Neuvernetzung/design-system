import { defineConfig } from "tsup";

export default defineConfig({
  format: ["cjs", "esm"],
  entryPoints: ["./src/**/*.ts", "./src/**/*.tsx", "!./src/**/*.stories.*"],
  minify: true,
  dts: true,
});
