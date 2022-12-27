# Design System

## Einrichtung

### Theme erstellen:

```
import { ConfigProps } from "./src";

const config: ConfigProps = {
  defaultTheme: "system",
  colors: {
    primary: "#00a8ff",
    // ...accent, success, warn, danger
  },
};

export default config;

```

### \_app.tsx mit ThemeProvider wrappen. Und Globale CSS Datei importieren.

```
import { Layout } from "@components/Layout";
import type { AppProps } from "next/app";

import { ThemeProvider } from "@neuvernetzung/design-system";
import "@neuvernetzung/design-system/globals.css";
import config from "configPath";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider config={config}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;

```

### Design-System Preset in Tailwind.config.js importieren.

```
const config = require("@neuvernetzung/design-system/tailwind.config.js");

const path = require("path");

module.exports = {
  presets: [config],
  content: [
    "./**/*.{mjs,js,jsx,ts,tsx}",
    path.join(require.resolve("@neuvernetzung/design-system/dist/index.mjs")),
  ],

  plugins: [],
};


```
