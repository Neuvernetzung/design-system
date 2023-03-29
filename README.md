# Design System

## Einrichtung

```
npm i @neuvernetzung/design-system && npm i -D tailwindcss postcss autoprefixer classnames swiper
```

### \_app.tsx mit ThemeProvider wrappen. Und Globale CSS Datei importieren.

```
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

### Design-System Preset in tailwind.config.js importieren.

```
const config = require("@neuvernetzung/design-system/tailwind.config.js");

const path = require("path");

module.exports = {
  presets: [config],
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
```

### postcss.config.js erstellen

```
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```
