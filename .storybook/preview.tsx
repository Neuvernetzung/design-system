import "../src/globals.css";
import * as NextImage from "next/image";

import React from "react";
import { addDecorator, addParameters } from "@storybook/react";
import { ThemeProvider } from "../src";
import { ThemeSwitch } from "../src/components/common/ThemeSwitch";
import config from "../example.config";
import { RouterContext } from "next/dist/shared/lib/router-context";

const Theme = (Story) => {
  return (
    <ThemeProvider config={config}>
      <div className="flex justify-end z-50">
        <ThemeSwitch />
      </div>
      <div>
        <Story />
      </div>
    </ThemeProvider>
  );
};

addParameters({
  options: {
    showPanel: true,
    sortStoriesByKind: true,
    panelPosition: "bottom",
  },
});

addDecorator(Theme);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
};

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});
