import { render, RenderOptions } from "@testing-library/react";
import React, { ReactElement, useRef } from "react";

import { createThemeStore, ThemeContext } from "./src/theme";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const store = useRef(createThemeStore({})).current;

  return (
    <ThemeContext.Provider value={store}>{children}</ThemeContext.Provider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
