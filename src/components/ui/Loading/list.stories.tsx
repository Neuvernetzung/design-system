import { Meta, Story } from "@storybook/react/types-6-0";
import React, { useEffect } from "react";

import {
  Spinner as SpinnerComponent,
  Loading as LoadingComponent,
  loading,
} from ".";

export default {
  title: "UI/Overlay/Loading",
  component: SpinnerComponent,
} as Meta;

export const Spinner = ({ ...args }) => <SpinnerComponent />;

export const Loading = ({ ...args }) => {
  useEffect(() => loading(true), []);

  return <LoadingComponent />;
};
