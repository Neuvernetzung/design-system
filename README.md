# Design System

## Einrichtung

### Theme erstellen:

```
import { ThemeProps, getBorderRadius } from "@theme";

const theme: ThemeProps = {
  //fonts: {
  //  heading: "Oswald, serif",
  //  body: "Inter, sans-serif",
  //},
  initialColorMode: "dark",
  useSystemColorMode: false,
  ...getBorderRadius("none"),
  colors: {
    primary: {
      50: "#e1f5ff",
      100: "#b3e5ff",
      200: "#81d5ff",
      300: "#4dc4ff",
      400: "#24b7ff",
      500: "#00a8ff",
      600: "#079cef",
      700: "#0c89db",
      800: "#0b77c7",
      900: "#0d57a4",
    },
    gray: {
      50: "#f9f9f9",
      100: "#f3f3f3",
      200: "#ebebeb",
      300: "#dcdcdc",
      400: "#b8b8b8",
      500: "#999999",
      600: "#707070",
      700: "#5d5d5d",
      800: "#3e3e3e",
      900: "#1d1d1d",
    },
    // secondary: {
    //   ...
    // },
    // tertiary: {
    //   ...
    // },
    // green: {
    //   ...
    // },
    // yellow: {
    //   ...
    // },
    // red: {
    //   ...
    // },
  },
};

export default theme;

```

Farben können hier generiert werden:

- https://material.io/inline-tools/color/
- https://maketintsandshades.com/
- https://themera.vercel.app/

Fonts können hier Lokal heruntergeladen werden:

- https://google-webfonts-helper.herokuapp.com/

anschließend generierte CSS Datei global importieren.

### \_app.tsx mit ThemeProvider wrappen. Und Globale CSS Datei importieren.

```
import { Layout } from "@components/Layout";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@theme";

import "design-system/theme/globals.css";
import theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;

```

### \_document.tsx Erstellen für Korrekte Farbwahl:

```
import { ColorModeScript } from "@theme";
import { Html, Head, Main, NextScript } from "next/document";
import theme from "../theme";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <ColorModeScript initialColorMode={theme.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

```
