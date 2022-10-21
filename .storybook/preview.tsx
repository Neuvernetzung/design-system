import "../lib/styles/globals.css";

import React, { useEffect, useState } from "react";
import { addDecorator, addParameters } from "@storybook/react";

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
    <>
      <div className="absolute z-50 bottom-5 right-5">
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          Dark Mode Toggle
        </button>
      </div>
      <div className="p-5 bg-white dark:bg-gray-900">
        <Story />
      </div>
    </>
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
