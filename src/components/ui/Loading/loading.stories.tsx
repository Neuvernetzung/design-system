
import { useEffect } from "react";

import {
  Loading as LoadingComponent,
  loading,
  Spinner as SpinnerComponent,
} from ".";

export default {
  title: "UI/Overlay/Loading",
  component: SpinnerComponent,
} ;

export const Spinner = {
  render: ({ ...args }) => <SpinnerComponent {...args} />,
};

export const Loading = {
  render: ({ ...args }) => {
    useEffect(() => loading(true), []);

    return <LoadingComponent {...args} />;
  },
};
