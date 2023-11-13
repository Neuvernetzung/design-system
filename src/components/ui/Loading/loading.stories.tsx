import { Meta } from "@storybook/react";
import { useEffect } from "react";

import {
  Loading as LoadingComponent,
  loading,
  Spinner as SpinnerComponent,
} from ".";

export default {
  title: "UI/Overlay/Loading",
  component: SpinnerComponent,
} as Meta;

export const Spinner = ({ ...args }) => <SpinnerComponent {...args} />;

export const Loading = ({ ...args }) => {
  useEffect(() => loading(true), []);

  return <LoadingComponent {...args} />;
};
