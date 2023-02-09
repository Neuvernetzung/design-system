import { ConfigProps } from "./src";

const config: ConfigProps = {
  defaultTheme: "system",
  icons: "outline",
  notifyProps: { variant: "solid" },
  allowNotification: true,
  // allowConfirmation: true, // gibt in Storybook next-router Fehler aus
  // allowGlobalLoading: true, // gibt in Storybook next-router Fehler aus
};

export default config;
