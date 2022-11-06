# Design System

## Einrichtung

### Theme erstellen:

```
import { ConfigProps } from "./src";

const config: ConfigProps = {
  colors: {
    primary: {
      50: "#80d4ff",
      100: "#66cbff",
      200: "#4dc2ff",
      300: "#33b9ff",
      400: "#1ab1ff",
      500: "#00a8ff",
      600: "#0097e6",
      700: "#0086cc",
      800: "#0076b3",
      900: "#006599",
    },
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
module.exports = {
  presets: [require("@neuvernetzung/design-system/tailwind.config.js")],
  content: ["./**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

```
