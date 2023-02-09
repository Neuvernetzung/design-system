import { defineConfig } from "tsup";

export default defineConfig({
  format: ["esm"],
  clean: true,
  splitting: true,
  entryPoints: ["./src/index.ts"],
  minify: true,
  dts: true,
  treeshake: true,
  platform: "node",
  target: "node14",
  skipNodeModulesBundle: true,
});
