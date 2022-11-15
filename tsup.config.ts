import { defineConfig } from "tsup";

export default defineConfig({
  format: ["esm"],
  clean: true,
  splitting: false,
  entryPoints: ["./src/index.ts"],
  minify: true,
  dts: true,
  treeshake: true,
  platform: "node",
  target: "node14",
});
