# Neuvernetzung - Design System

[![neuvernetzung-logo](https://raw.githubusercontent.com/Neuvernetzung/design-system/master/public/Header.png)](https://neuvernetzung.de)

## Einrichtung

```
npm i @neuvernetzung/design-system && npm i -D tailwindcss postcss autoprefixer
```

### `\_app.tsx` mit ThemeProvider wrappen. Und Globale CSS Datei importieren.

```ts
import type { AppProps } from "next/app";

import { ThemeProvider } from "@neuvernetzung/design-system";
import "@neuvernetzung/design-system/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider config={config}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
```

### Design-System Preset in `tailwind.config.ts` importieren.

```ts
import designSystem from "@neuvernetzung/design-system/tailwind.config";
import path from "path";
import type { Config } from "tailwindcss";

const config: Config = {
  presets: [designSystem],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    `${path.dirname(
      require.resolve("@neuvernetzung/design-system/dist/index.mjs")
    )}/**/*.mjs`,
  ],
  theme: {
    fontFamily: {
      heading: "Oswald",
      body: "Inter",
    },
  },
  plugins: [],
};

export default config;
```

### `postcss.config.js` erstellen

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```
