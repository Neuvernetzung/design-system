import { defineConfig } from "tsup";

export default defineConfig([
  {
    format: ["esm"],
    clean: true,
    splitting: true,
    entry: [
      "./src/**",
      "!./src/**/*.stories.ts?(x)",
      "!./src/**/*.test.ts?(x)",
    ],
    minify: true,
    dts: "./src/index.ts",
    treeshake: true,
    platform: "node",
    target: "node14",
    skipNodeModulesBundle: true,
  },
  {
    format: ["cjs"],
    entry: ["./tailwind.config.ts"],
    treeshake: true,
    platform: "node",
    target: "node14",
    skipNodeModulesBundle: true,
    outDir: "./",
  },
]);
