import "../src/globals.css";
import * as NextImage from "next/image";

import React, { useEffect, useState } from "react";
import { addDecorator, addParameters } from "@storybook/react";
import { IconButton } from "../src/components/ui/Button";
import { SunIcon } from "@heroicons/react/24/outline";
import { ThemeProvider } from "../src";
import config from "../example.config";

const Theme = (Story) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (theme === "light") {
      document.querySelector("html")?.classList.remove("dark");
    } else {
      document.querySelector("html")?.classList.add("dark");
    }
  }, [theme]);

  return (
    <ThemeProvider config={config}>
      <div className="relative h-full w-full">
        <div className="absolute right-0 z-50">
          <IconButton
            variant="ghost"
            icon={SunIcon}
            ariaLabel="Darkmode"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          />
        </div>
        <div>
          <Story />
        </div>
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
};

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});
