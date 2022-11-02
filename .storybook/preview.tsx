import "../src/styles/globals.css";
import * as NextImage from "next/image";

import React, { useEffect, useState } from "react";
import { addDecorator, addParameters } from "@storybook/react";
import { IconButton } from "../src/components/ui/Button";
import { SunIcon } from "../src/components/icons";

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
    <div className="relative w-full h-full">
      <div className="absolute z-50 right-0">
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
