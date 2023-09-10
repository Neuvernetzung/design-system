import { ConfigProps } from "./src";

const config: ConfigProps = {
  defaultTheme: "system",
  icons: "outline",
  allowNotification: true,
  colors: {
    primary: "#00a8ff",
    white: "#f4f9fb",
    black: "#151819",
  },
  borderRadius: "md",
  // allowConfirmation: true, // gibt in Storybook next-router Fehler aus
  // allowGlobalLoading: true, // gibt in Storybook next-router Fehler aus
};

export default config;
