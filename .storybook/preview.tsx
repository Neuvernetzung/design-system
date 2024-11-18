import "../globals.css";

import React from "react";
import { Preview } from "@storybook/react";
import { ThemeProvider } from "../src";
import { ThemeSwitch } from "../src/components/common/ThemeSwitch";
import config from "../themeConfig";

const Theme = ({ children }) => {
  return (
    <ThemeProvider config={config}>
      <div className="flex justify-end z-50">
        <ThemeSwitch />
      </div>
      {children}
    </ThemeProvider>
  );
};

const preview: Preview = {
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
  parameters: {
    // showPanel: true,
    sortStoriesByKind: true,
    panelPosition: "bottom",
  },
};

export default preview;
